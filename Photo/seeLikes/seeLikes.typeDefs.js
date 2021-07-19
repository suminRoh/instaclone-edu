import {gql} from "apollo-server";

export default gql`
    type Query{
        seeLikes(id:String!):[User]
    }
`