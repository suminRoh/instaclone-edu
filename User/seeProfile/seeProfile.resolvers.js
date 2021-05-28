import client from "../../client";

export default{
    Query:{
        seeProfile: async(_,args)=>{
            const {username} = args;
            return await client.user.findUnique({
                where:{
                    username
                },
                //include --> 배열 데이터 보이기
               /*
                include:{
                    추가할 필드1: true,
                    추가할 필드2: true,
                    .
                    .
                    . 
                }
                이런식으로 작성
                */ 
            });
        }
    }
}