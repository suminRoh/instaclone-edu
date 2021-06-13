import client from "../../client";

export default {
    Query:{
        searchUser: async(_,args)=> {
            const {keyword} = args;
            return client.user.findMany({
                where:{
                    username:{
                        startsWith:keyword.toLowerCase()
                    }
                }
            });// user 찾기 아이디로 검색 -> 입력한 keyword로 시작하는 user 찾기
            //공식 docu를 보고 입력한 keyword가 포함되는 아이디를 찾으려면 어떻게 해야되는지 알아보기
        }    
    }
}