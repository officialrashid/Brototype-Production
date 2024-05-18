
import kafkajs,{Partitioners} from 'kafkajs'
import { kafkaClient } from './consumers/consumer'


const producer=kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation:false
  })
  const sendMessage= async (topic:string,message:{})=>{
    await producer.connect()
    await producer.send({
        topic,
        messages:[{value:JSON.stringify(message)}]
    })
  
  }



export {sendMessage}