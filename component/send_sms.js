const accountSid = process.env.accountSid; 
const authToken = process.env.authToken; 
const client = require('twilio')(accountSid, authToken); 
exports.send_sms = (message,phone_no,otp) =>{
    client.messages 
      .create({ 
          messagingServiceSid: 'MG45afd00a265d220da040e36f64607144',      
          body: `${message} ${otp}`,  
          to: phone_no 
        }) 
      .then(message => console.log(message.sid)) 
      .done();
}
