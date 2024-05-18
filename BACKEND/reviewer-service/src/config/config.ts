export default {
    port: process.env.REVIEWER_SERVER_PORT || 5001,
    mongo: {
      uri: process.env.REVIEWER_MONGO_URL
    },
    jwtAccessSecretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 