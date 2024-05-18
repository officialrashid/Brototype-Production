
export default {
    port: process.env.CHAT_SERVER_PORT || 9001,
    mongo: {
      uri: process.env.CHAT_MONGO_URL
    },
    secretKey: process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 

