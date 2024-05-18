import jwt from 'jsonwebtoken'


const generate = (privateKey: any, payload: any): string => {
    const now = new Date();
    const { id, name, email, avatar, appId, kid } = payload;
  
    const jwtToken = jwt.sign({
      aud: 'jitsi',
      context: {
        user: {
          id,
          name,
          avatar,
          email: email,
          moderator: 'true'
        },
        features: {
          livestreaming: 'true',
          recording: 'true',
          transcription: 'true',
          "outbound-call": 'true'
        }
      },
      iss: 'chat',
      room: '*',
      sub: appId,
      exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
      nbf: Math.round(new Date().getTime() / 1000) - 10
    }, privateKey, {header: { kid,alg:'RS256' }});
  
    return jwtToken;
  };

  export {generate}