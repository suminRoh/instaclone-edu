import AWS from "aws-sdk";
import { UniqueDirectivesPerLocationRule } from "graphql";

AWS.config.update({
    credentials:{
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    }
});



export const uploadToS3=async(file,userId,folderName)=>{
    const {filename,createReadStream}=await file;
    const readstream=createReadStream();
    const objectName=`${folderName}-${userId}-${Date.now()}-${filename}`;
    const {Location}=await new AWS.S3.upload({
        Bucket:"instacloneedu",
        Key:objectName,
        ACL:"public-read",
        Body:readstream
    }).promise();
    return Location;
}