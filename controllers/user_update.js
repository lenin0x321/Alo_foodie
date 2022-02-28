const {Users,useraddresses} = require('../models');
exports.update_users = async(req,res)=>{
    try{
        const {firstname, lastname,gender,dateofbirth} = req.body;
        if(!(firstname&&lastname&&gender&&dateofbirth)){
            return res.status(200).json({
                status:'Error',
                message: 'Fields does not be empty'
            })
        }
        if(firstname&&lastname&&gender&&dateofbirth){
            const updated_data = await Users.update({
                firstname,
                lastname,
                gender,
                dateofbirth
            },{
                where:{id:req.user._id},
                returning: true
            })
            return res.status(200).json({
                status: 'success',
                message: updated_data[1]
            })
        } 
    }catch(err){
        console.log(err)
        res.status(200).json({
            status: 'Error',
            message: 'Error in server while updating user account'
        })
    }
}


exports.address = async(req,res)=>{
    try{
        const {name,addressline1,addressline2,city,landmark,district,state,country,pincode,latitude,longitude} = req.body;
        console.log(name,addressline1,addressline2,city,landmark,district,state,country,pincode,latitude,longitude)
        address_data = await useraddresses.create({
            name,
            addressline1,
            addressline2,
            city,
            userid:req.user._id,
            landmark,
            district,
            state,country,
            pincode,
            latitude,
            longitude
        },
        {returning:true}
        )
        res.status(200).json({
            status:"Success",
            message: address_data
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            status:'Error',
            message: 'Error while updating user address'
        })
    }
}


exports.get_address = async(req,res) =>{
    try{
        address = await Users.findOne({
            where:{id:req.user._id},
            include: ['useraddresses']
        })
        res.status(200).json(address)
        
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: "Error",
            message: "Error while fetching address"
        })
    }
}