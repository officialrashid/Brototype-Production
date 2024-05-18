import kafkajs,{Partitioners} from 'kafkajs'
const kafkaClient=new kafkajs.Kafka({
    clientId:'jitsi-meet-service',
    brokers:['127.0.0.1:9092']
})

export {kafkaClient}


