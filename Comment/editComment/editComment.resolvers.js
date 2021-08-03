import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default{
    Mutation:{
        editComment:protectedResolver(async(_,args,{loggedInUser})=>{
            const {id,payload}=args;
            const comment=client.comment.findUnique({
                where:{id}
            });
            const userId=(await comment).userId;
            if(!comment){
                return{
                    ok:false,
                    error:"댓글이 없습니다"
                }
            }
            else if(userId!==loggedInUser.id){
                return{
                    ok:false,
                    error:"권한 없음"
                }
            }
            await client.comment.update({
                where:{id},
                data:{
                    payload                
                }
            });
            return{
                ok:true
            };
        })  
    }
   
}