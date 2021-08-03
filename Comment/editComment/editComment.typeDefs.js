import {gql} from "apollo-server";

export default gql`
    type EditCommemtResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        editComment(id:Int!,payload:String!):EditCommemtResult!
    }
`;