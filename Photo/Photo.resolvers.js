import client from "../client"

export default {
    Photo: {
        user: ({userId}) => {
            return client.user.findUnique({where:{id:userId}})
        },
        hashtags:({id}) => client.hashtag.findMany({where:{
            photos:{
                some:{
                    id
                }
            }
        }}),
        likes:({id})=>client.like.count({where:{photoId:id}}),
        comments:({id})=>client.comment.count({where:{photoId:id}}),
        isMine:({userId},_,{loggedInUser})=>{
            if(!loggedInUser){
                return false;
            }
            return userId==loggedInUser.id;
        }
    },
    Hashtag:{
        totalPhotos:({hashtag})=>client.photo.count({
            where:{
               hashtags:{
                   some:{
                       hashtag
                   }
               }
            }
        }),

        photos:({id},{page},{loggedInUser})=>{
            if(!loggedInUser){
                return false;
            }
            return client.hashtag.findUnique({
                where:{
                    id
                }
            }).photos({
                take:5,
                skip:(page-1)*5
            });
        }
    }
}
