import { PutObjectCommand, S3Client ,ListObjectsV2Command,GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
  region:"ap-south-1",
  credentials: {
    accessKeyId: `${process.env.S3_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY}`,
  },
});
const BUCKET = process.env.S3_GROUP_CHAT_BUCKET_NAME || 'brototype-group-chat-profil'
if (!BUCKET) {
  throw new Error("BUCKET environment variable is not defined.");
}
interface ChatData {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  createrId: string;
  groupProfile?: string; // Make imageUrl optional
}


export const uploadToS3 = async ({ file, createrId }: ChatData): Promise<ChatData> => {
  const key = `${createrId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  });

  try {
    const response = await s3.send(command);

    const url: string = `https://s3.ap-south-1.amazonaws.com/${BUCKET}/${key}`;
    console.log(url, "url coming s3");

    return { file, createrId, groupProfile: url };
  } catch (err) {
    console.error(err,"pppppppppppppp");
    return { file, createrId, groupProfile: undefined }; 
  }
  
};



