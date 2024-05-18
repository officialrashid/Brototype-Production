import { kafkaClient } from "./kafkaConfig";
import { privateKey } from "..";
import { generate } from "../token";
import uuid from 'uuid-random'
import { sendEvent } from "./kafkaProducer";
const consumer=kafkaClient.consumer({groupId:'jitsi-meet-service-group'})
const consumerConnect=async ()=>{
    await consumer.connect(),
    await consumer.subscribe({topic:'create-meet',fromBeginning:true})
    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{

            try{
                if(message.value){
                    const meetData=JSON.parse(message.value.toString());

                if(meetData.type=='create-meeting-link'){
                    const token= generate(privateKey, {id: uuid(),name: "my user name", email: "sachinksibytyy@gmail.com",avatar: "my avatar url",
                    appId: "vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e", 
                    kid: "vpaas-magic-cookie-40d1ade414824ac88ae740a12fcf994e/77d57c"})


                    console.log(token,'tokeennnnnnnnnnnnn');
                   let message={
                    value:token
                   }
                    const sendTokenData=sendEvent('meeting-link',message)
                }

                }
                

            }
            catch(error){

            }

        }
    })
}

export {consumerConnect}