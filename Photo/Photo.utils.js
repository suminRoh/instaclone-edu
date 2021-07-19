export const processHashtags=(caption)=>{
    const hashtags=caption.match(/#[\w]+/g);
    return hashtags.map((hashtag)=>({
        where:{hashtag},
        create:{hashtag}
    }));
}
//각각의 hashtag를 prisma의 Hashtag Model의 모양에 맞추어 저장하기위해 위와 같은 방식으로 Map을 통해 객체 생성