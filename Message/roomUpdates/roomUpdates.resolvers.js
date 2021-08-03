import { withFilter } from "apollo-server";
import client from "../../client";
import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";

export default{
    Subscription:{
        roomUpdates:{
            //subscription 규칙 ->subscription function 사용
            subscribe:async(root,args,context,info)=>{
                const {id}=args;
                const room=await client.room.findUnique({
                    where:{
                        id
                    },
                    select:{
                        id:true
                    }
                });
                if(!room){
                    throw new Error("방이 없습니다.");
                }
                return withFilter(
                    ()=>pubsub.asyncIterator(NEW_MESSAGE),
                    ({roomUpdates},{id})=>{
                        return roomUpdates.roomId===id;
                    }
                )(root,args,context,info);    
            
            }
        }
    }
}
//asyncIterator:listen하는 함수