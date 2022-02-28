var otpGenerator = require('otp-generator');

const otp = otpGenerator.generate(6,  //length of otp
    { lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false }
    );
module.exports = otp;

