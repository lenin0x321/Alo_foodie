const {logins,Users} = require('../models');
const { v4: uuid_v4 } = require('uuid');
const localStorage = require('local-storage');
const otp = require('../component/otp');
const { send_sms } = require('../component/send_sms');
const { expiry_otp} = require('../component/expireotp');
const jwt = require('jsonwebtoken');
var moment = require('moment');
exports.Signup = async(req,res)=>{
    try{
        const {phone_no} = req.body;
        if(!phone_no){
            return res.status(200).json({
                status:'Error',
                message:'Phone Number is required'
            })
        }
        const user_found = await Users.findOne({
            where: {phone:phone_no}
        })
        const user_otp = parseInt(otp);
        expiry_otp(user_otp,phone_no,60000); // set the expiry min in microsec
        if(user_found){
            send_sms('Welcome to Back Alo_foodie your OTP is' ,phone_no,otp); // old users otp
        }else{
            send_sms('Welcome Alo_foodie your OTP is' ,phone_no,otp); // new users otp
        }
        res.status(200).json({
            status: 'Sucess',
            Message: 'OTP send successfully'
        });
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Failed',
            Message: 'Error from server while send otp'
        })
    }
};

exports.login = async (req, res) => {
    try {
        const {otp, phone_no} = req.body
        let user_found = await Users.findOne({
            where: {phone:phone_no}
        })
        const itemStr = localStorage.get(phone_no)
        if (!itemStr) {
            return res.status(400).json({
                status: 'expired',
                message: 'OTP is expired'
            })
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.remove(phone_no)
            return res.status(400).json({
                status: 'expired',
                message: 'OTP is expired'
            })
        }
        const valid_otp = localStorage.get(phone_no);
        json_otp = JSON.parse(valid_otp);
        if(!user_found){
            if (parseInt(json_otp.otp) === parseInt(otp)){
                const userid = uuid_v4()
                var date = moment().format('MMMM Do YYYY, h:mm:ss a')
                await logins.create({
                    userid,
                    successfullogin:date
                });
                const user_date = await Users.create({
                    id:userid,
                    phone:phone_no
                });
                const token = jwt.sign({ _id: userid }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                // return user and token to client, exclude hashed password
                // send token in cookie
                res.cookie("token", token, {
                    httpOnly: true,
                    // secure: true, // only works on https
                });
                // send user as json response
                localStorage.remove(phone_no)
                res.status(200).json({
                    message:'OTP is currect',
                    data: user_date
                })
            }else{
                res.status(200).json({
                    message:'OTP is incurrect'
                })
            }
        }else{
            if (parseInt(json_otp.otp) === parseInt(req.body.otp)){
                const token = jwt.sign({ _id: user_found.id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                // return user and token to client, exclude hashed password
                // send token in cookie
                localStorage.remove(phone_no)
                res.cookie("token", token, {
                    httpOnly: true,
                    // secure: true, // only works on https
                });
                // send user as json response
                await logins.update({
                    invalidloginattempt: 0
                },{where:{userid:user_found.id}})
                res.status(200).json({
                    message:'OTP is currect',
                    data: user_found
                })
            }else{
                logins_data = await logins.findOne({where:{userid:user_found.id}});
                loginattempt = logins_data.invalidloginattempt + 1
                const failedlogin_datatime = moment().format('MMMM Do YYYY, h:mm:ss a')
                await logins.update({
                    invalidloginattempt: loginattempt,
                    failedlogin: failedlogin_datatime
                },{where:{userid:user_found.id}})
                res.status(200).json({
                    status:'Failed',
                    message:"Incorrect OTP"
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'Failed',
            Message: 'Error from server while send otp'
        })
    }
}


exports.user_data = async(req,res) =>{
    try{
        const userid = req.user._id;
        const {firstname,lastname,gender,dateofbirth} = req.body;
        console.log(firstname, lastname, gender, dateofbirth);
        const user_info = await Users.update({
            id: userid,
            firstname,
            lastname,
            gender,
            dateofbirth,
            
        },{where:{id:userid}}) 
        res.status(200).json(user_info);
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'Failed',
            Message: 'Error from server while adding user data'
        })
    }
}