export default {
    port: process.env.TASK_SERVER_PORT || 7001,
    mongo: {
      uri: process.env.TASK_MONGO_URL
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 