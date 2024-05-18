import kafkajs from 'kafkajs';
import { consumeStudentEvents,consumeCoordinatorEvents } from '../..';
import { reviewController } from '../../routes/reviewRouter';
const kafkaClient = new kafkajs.Kafka({
  clientId: 'review-service',
  brokers: ['demo-kafka:9092'],
  
   // Adjust if Kafka runs on a different port or host
});

const consumer = kafkaClient.consumer({ groupId: 'review-service-group',allowAutoTopicCreation:false });
const consumerConnect =async ()=>{
    await consumer.connect()
    await consumer.subscribe({topic:'student-data',fromBeginning:true})
    await consumer.subscribe({topic:'coordinator-data',fromBeginning:true})
    await consumer.subscribe({topic:'review-booking-updation',fromBeginning:true})
    await consumer.subscribe({topic:'review-status-updation',fromBeginning:true})
    await consumer.subscribe({topic:'meeting-link',fromBeginning:true})
    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{
            try{
                switch(topic){
                    case 'student-data':
                    await consumeStudentEvents(message)
                    break;
                    case  'coordinator-data':
                    await consumeCoordinatorEvents(message)
                    break;
                    case 'review-booking-updation':
                    await reviewController.onUpdateReviewBooking(message)
                    case 'review-status-updation':
                    await reviewController.OnReviewStatusUpdation(message)    
                    case 'meeting-link':
                    await reviewController.OnReviewStatusUpdation(message)
                    default:

                    console.log(`Unhandled topic: ${topic}`)
                }


            }
            catch(error){

            }

        }

    })
}



export {consumerConnect,kafkaClient}

