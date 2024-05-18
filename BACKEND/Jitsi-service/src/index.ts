import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { consumerConnect } from "./external-libraries/kafkaConsumer";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true // Make sure to enable credentials
}
app.use(cors(corsOptions))

let token=''
const generate = (privateKey: any, payload: any): string => {
  const now = new Date();
  const { id, name, email, avatar, appId, kid } = payload;

  const jwtToken = jwt.sign({
    aud: 'jitsi',
    context: {
      user: {
        id,
        name,
        avatar,
        email: email,
        moderator: 'true'
      },
      features: {
        livestreaming: 'true',
        recording: 'true',
        transcription: 'true',
        "outbound-call": 'true'
      }
    },
    iss: 'chat',
    room: '*',
    sub: appId,
    exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
    nbf: Math.round(new Date().getTime() / 1000) - 10
  }, privateKey, {header: { kid,alg:'RS256' }});

  return jwtToken;
};


const privateKey = `${process.env.PRIVATE_KEY}`


 token = generate(privateKey,{ id: 124,name: "my user name", email: "sachinksibytyy@gmail.com",avatar: "my avatar url",
appId: `${process.env.APP_ID}`, 
kid: `${process.env.KID}`},
)

console.log(token);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

consumerConnect()
export {privateKey}