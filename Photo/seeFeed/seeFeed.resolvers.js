import client from "../../client";
import {protectedResolver} from "../../User/User.utils";

export default{
    Query:{
        seeFeed: protectedResolver((_,__,{loggedInUser})=>{
            client.photo.findMany({
                where:{
                    OR:[
                        {
                            user:{
                                followers:{
                                    some:{
                                        id:loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId:loggedInUser.id
                        }
                    ]
                },
                orderBy:{
                    createdAt:"desc"
                }
            });
        })
    }
}