export default {
    port: process.env.AUTH_SERVER_PORT || 6002,
    mongo: {
      uri: process.env.AUTH_MONGO_URL || 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Authentication?retryWrites=true&w=majority'
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 