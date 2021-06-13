import client from "../client"

export default {
    User: {
        totalFollowing: ({id}) => client.user.count({
            where:{
                followers:{
                    some:{
                        id
                    }
                }
            }
        }),
        totalFollowers: ({id}) => client.user.count({
            where:{
                following:{
                    some:{
                        id
                    }
                }
            }
        }),
        isMe: ({id},_,{loggedInUser})=>{
            if(!loggedInUser){
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({id},_,{loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
            const exist = await client.user.count({
                where:{
                    username:loggedInUser.username,
                    following:{
                        some:{
                            id
                        }
                    }
                }
            });
            return Boolean(exist);
        }
        
    }
}
// resolver parameter => (root,args,context,info)
/*
    root는 부모에서부터 받아오는 파라미터
    즉 User 데이터 중 지금 사용되고 있는 User의 데이터를 반환
    예를 들어 followUser를 A가 B한테 사용한다고 가정
    A가 followUser API를 사용하면 B라는 User의 데이터 값을 불러옴
    이때 불러온 B User 데이터가 root가 된다.
 */