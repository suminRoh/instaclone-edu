import client from "../../client"

export default{
    Query:{
        seePhotoComments:(_,args)=>{
            const {id}=args;
            return client.comment.findMany({
                where:{
                    photoId:id
                },
                orderBy:{
                    createdAt:"asc"
                }
            })
        }
    }
}