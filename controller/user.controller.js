const User = require('../models/user.model');
const ObjectConverter = require("../utils/constants")

const fetchAll = async (res)=>{
    let users;
    try{
        users = await User.find()
    }catch(err){
        res.status(500).send({
            message:"Some internal error occured"
        })
    }
    return users
}

const fetchByName = async (userNameReq,res)=>{
    let users;

    try{
        users = await User.find({
            name:userNameReq
        })
    }catch(err){
        console.log("Error while the user for the user name",userNameReq);
        res.status(500).send({
            message:"Some internal error occured."
        })
    }
    return users
}

const fetchByTypeAndStatus = async (userTypeReq,userStatusReq,res)=>{
    let users;

    try{
        users = await User.find({
            userTypes:userTypeReq,
            userStatus:userStatusReq
        });
    }catch(err){
        console.log(`Error while fetching the user for user type [${userTypeReq}] and user status [${userStatusReq}]`);
        res.status(500).send({
            message:"Some internal error occured."
        })
    }
    return users;
}

const fetchByType = async (userTypeReq,res){
    let users;

    try{
        users = await User.find({
            userType:userTypeReq
        });
    }catch(err){
        console.log(`Error while fetching the user for user types [${userTypeReq}]`);
        res.status.send({
            message:"Some internal error occured."
        })
    }
    return users;
}