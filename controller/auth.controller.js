const User  = require('../models/user.model');
const {userType, constants} = require('../utils/constants');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.signup = async (req,res)=>{
    let userStatus;

    if(req.body.userType == userType.engineer || req.body.user == userType.admin){
        userType = constants.userStatus.pending 
    }else{
        userStatus = constants.userStatus.approved
    }
    console.log(req);
    const userObj = {
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,10),
        userStatus:userStatus
    }

    try{
        const usetCreated = await User.create(userObj);
        const postResponse = {
            name:usetCreated.name,
            userId:usetCreated.userId,
            email:usetCreated.email,
            userType:usetCreated.userType,
            userStatus:usetCreated.userStatus,
            createdAt:usetCreated.createdAt,
            updatedAt:userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    }catch(err){
        console.log("Something went wrong.",err);
        res.status(500).send({
            message:"Something went wrong."
        })
    }
}

exports.signin = async(req,res)=>{
    const user = await User.findOne({userId:req.body.userId});
    console.log("Signing requires for",user);

    if (!user) {
        res.status(400).send({
            message: "Failed! Userid doesn't exist!"
        })
        return
    }

    if (user.userStatus != constants.userStatus.approved) {
        res.status(403).send({
            message: `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    )

    if (!passwordIsValid) {
        res.status(401).send({
            message: "Invalid Password!"
        })
        return
    }

    let token = jwt.sign({userId:user.userId},config.secret,{expiresIn:86400});
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userTypes: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })
}