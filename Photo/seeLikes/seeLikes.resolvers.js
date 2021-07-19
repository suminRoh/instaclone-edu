import client from "../../client";

export default{
    Query:{
        seeLikes:async(_,args)=>{
            const {id}=args;
            let likesobj=[];
            const likes=await client.like.findMany({
                where:{
                    photId:{
                        id
                    }
                },
                select:{
                    user:true
                }
            });
            return likes.map((like)=>like.user);
        }
    }
}