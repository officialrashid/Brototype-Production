export default {
    port: process.env.STUDENT_SERVER_PORT || 4000,
    mongo: {
      uri: process.env.STUDENT_MONGO_URL
    },
    jwtAccessSecretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 