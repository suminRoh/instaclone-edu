import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default{
    Query:{
        seeRooms:protectedResolver((_,__,{loggedInUser})=>client.room.findMany({
            where:{
                users:{
                    some:{
                        id:loggedInUser.id
                    }
                }
            }
        }))
    }
}