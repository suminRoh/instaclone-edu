import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";
import {createWriteStream} from "fs";

export default {
    Mutation:{
        editProfile: protectedResolver(async (_, args,{loggedInUser}) => {
            const {
                firstName,
                lastName,
                username,
                email,
                bio,
                avatar,
                password:newPassword
            } = args;
            let avatarUrl = null;
            if(avatar){
                const {filename, createReadStream} = await avatar;
                const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(process.cwd()+"/uploads/"+newFileName);
                readStream.pipe(writeStream); 
                avatarUrl = `http://localhost:4000/static/${newFileName}`;
            }
            let hashedPassword = null;
            if(newPassword){
                hashedPassword = await bcrypt.hash(newPassword,10);
            }
            const updatedUser = await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    firstName,
                    lastName,
                    username,
                    email,
                    bio,
                    ...(hashedPassword && {password:hashedPassword}),
                    ...(avatarUrl && {avatar:avatarUrl}),
                }
            });
            if(updatedUser.id){
                return {
                    ok:true
                }
            }
            else {
                return {
                    ok:false,
                    error:"업데이트 실패!"
                }
            }
        })
    }
}