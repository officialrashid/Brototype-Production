import express, { Express, Request, Response,Application} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./config/dbConnection";
import courseRouter from './routes/courseRouter'
import { branchRouter } from "./routes/branchRouter";
import { enquiryRouter } from "./routes/enquiryRouter";
import { counsellorRouter } from "./routes/councellorRouter";
import { contentRouter } from "./routes/contentRouter";
import { companyRouter } from "./routes/companyRouter";
import cors from 'cors'
dotenv.config();


const app: Application = express();

const port:number|undefined|string = process.env.ADMIN_SERVER_PORT ;
const mongodbUri:string|undefined= process.env.ADMIN_MONGO_URL
app.use(bodyParser.json())
    
app.use(cors({
  origin: [
      'http://localhost:5173',
  ], // Update with your client's origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true, // Allow credentials (cookies, etc.)
}));
console.log(process.env.MONGODB_URI);

console.log(process.env.PORT,'rwrwrew' );


app.use('/admin-service',courseRouter)
app.use('/admin-service',branchRouter)
app.use('/admin-service',enquiryRouter)
app.use('/admin-service',counsellorRouter)  
app.use('/admin-service',contentRouter)
app.use('/admin-service',companyRouter)



connectDb(mongodbUri)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


