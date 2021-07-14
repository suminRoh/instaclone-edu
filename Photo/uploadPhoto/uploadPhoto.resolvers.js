import client from "../../client";
import {protectedResolver} from "../../User/User.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {file, caption} = args;
                //file은 추후 이미지 업로드로 바꿀 것 잠시 String Type인척
                let hashtagObj = [];
                if(caption){
                    const hastags = caption.match(/#[\w]+/g);
                    //match 함수를 이용
                    
                    hashtagObj = hastags.map(hashtag => ({
                        where:{hashtag},
                        create:{hashtag}
                    }));
                    //각각의 hashtag를 prisma의 Hashtag Model의 모양에 맞추어 저장하기위해 위와 같은 방식으로 Map을 통해 객체 생성
                }
                console.log(hashtagObj);
                return client.photo.create({
                    data:{
                        file,
                        caption,
                        user:{
                            connect:{
                                id:loggedInUser.id
                            }
                        },
                        ...(hashtagObj.length > 0 && {hashtags:{connectOrCreate:hashtagObj}})//hastag가 처음 만들어지는 거라면 생성 있는거라면 있는 곳에 연결
                    }
                });
            }
        )
    }
};