export default {
    port: process.env.SUPERLEAD_SERVER_PORT || 8001,
    mongo: {
      uri: process.env.SUPERLEAD_MONGO_URL
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 