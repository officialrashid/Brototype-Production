import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'superlead',
    brokers: ['localhost:9092']
})