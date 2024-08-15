
import fs from 'fs'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

// Load environment variables from .env file
dotenv.config();

const firebaseConfig = {
  type: "service_account",
  project_id: `${process.env.FIREBASE_PROJECT_ID}`,
  private_key_id: `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
  private_key: `${process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')}`,  // Handle newlines in the private key
  client_email: `${process.env.FIREBASE_CLIENT_EMAIL}`,
  client_id: `${process.env.FIREBASE_CLIENT_ID}`,
  auth_uri: `${process.env.FIREBASE_AUTH_URI}`,
  token_uri: `${process.env.FIREBASE_TOKEN_URI}`,
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9qeji%40brototype-29983.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

export default firebaseConfig

