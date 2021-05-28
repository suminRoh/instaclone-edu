import client from "../../client";
import { protectedResolver } from "../User.utils";
 
export default {
    Mutation: {
        followUser:protectedResolver(async(_,args,{loggedInUser})=>{
            const {username} = args;
            const check = await client.user.findUnique({
                where:{
                    username
                }
            });//follow할 유저가 존재하는지 확인하기위함
            if(!check){
                return{
                    ok:false,
                    error:"사용자가 존재하지 않습니다!"
                }
            }//follow할 유저가 없는 경우
            await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    following:{
                        connect:{
                            username
                        }
                    }
                }
            });
            /*
                follow를 신청하면 user의 following 정보가 Update 되야하는데
                Update될 data는 following
                following은 [User] 타입이기 때문에
                following:username 이렇게 X
                following 배열에 데이터를 추가할건데 어떻게 연결할거냐면, 
                배열안에 추가할 User의 username이 args에서 받아온 username이야
            */
            return{
                ok:true
            }
        })
    }
}