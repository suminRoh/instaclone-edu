import {gql} from "apollo-server";

export default gql`
    type editProfileResult {
        ok:String!
        error:String
    }
    type Mutation{
        editProfile(
            firstName:String
            lastName:String
            username:String
            email:String
            password:String
        ):editProfileResult!
    }
`;