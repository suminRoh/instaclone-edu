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
        }})
    },
    Hashtag:{
        //여기에 computing
    }
}
//Photo Model에 저장되는 user는 userId를 참조한다. --> schema.prisma 참고
//Photo Model에 저장되는 hashtag들은 photo의 id를 이용한다.