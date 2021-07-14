import {gql} from "apollo-server";

export default gql`
    type Photo{
        id: Int!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag{
        id:Int!
        hashtag: String!
        photos(username:String!,page:Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
`;