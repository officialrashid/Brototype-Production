import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'superlead',
    brokers: ['demo-kafka:9092']
})