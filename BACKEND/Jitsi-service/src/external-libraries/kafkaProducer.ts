import { kafkaClient } from "./kafkaConfig";
import { Partitioners } from "kafkajs";

const producer=kafkaClient.producer({
    createPartitioner:Partitioners.LegacyPartitioner
})


const sendEvent=async (topic:string,message:{})=>{
    await producer.connect()
    await producer.send({
        topic,
        messages:[{value:JSON.stringify(message)}]
    })

}

export {sendEvent}