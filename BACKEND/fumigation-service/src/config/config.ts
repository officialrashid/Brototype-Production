import dotenv from "dotenv"
export default {
    port: process.env.FUMIGATION_SERVER_PORT || 3002,
    mongo: {
      uri: process.env.FUMIGATION_MONGO_URL || 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Fumigation?retryWrites=true&w=majority'
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 