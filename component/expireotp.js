const localStorage = require('local-storage');
exports.expiry_otp = (otp,phone_no,expiry_min) =>{
    const now = new Date()
        const item = {
            otp: otp,
            expiry: now.getTime() + parseInt(expiry_min),//set the otp expiry time 
        }
        localStorage.set(phone_no, JSON.stringify(item))
}
