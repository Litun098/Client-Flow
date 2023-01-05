const express = require('express');
const User = require('../models/user.model');
const ObjectConverter = require("../utils/objectConverter")
const constants = require("../utils/constants")

const fetchAll = async (res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        res.status(500).send({
            message: "Some internal error occured"
        })
    }
    return users
}

const fetchByName = async (userNameReq, res) => {
    let users;

    try {
        users = await User.find({
            name: userNameReq
        })
    } catch (err) {
        console.log("Error while the user for the user name", userNameReq);
        res.status(500).send({
            message: "Some internal error occured."
        })
    }
    return users
}

const fetchByTypeAndStatus = async (userTypeReq, userStatusReq, res) => {
    let users;

    try {
        users = await User.find({
            userTypes: userTypeReq,
            userStatus: userStatusReq
        });
    } catch (err) {
        console.log(`Error while fetching the user for user type [${userTypeReq}] and user status [${userStatusReq}]`);
        res.status(500).send({
            message: "Some internal error occured."
        })
    }
    return users;
}

const fetchByType = async (userTypeReq, res) => {
    let users;

    try {
        users = await User.find({
            userType: userTypeReq
        });
    } catch (err) {
        console.log(`Error while fetching the user for user types [${userTypeReq}]`);
        res.status.send({
            message: "Some internal error occured."
        })
    }
    return users;
}

const fetchByStatus = async (userStatusReq, req) => {
    let users;

    try {
        users = await User.find({
            userStatus: userStatusReq
        })
    } catch (err) {
        consolw.log(err);
        res.status(500).send({
            message: "Some internal error occured."
        })
    }
    return users;
}

exports.findById = async (req, res) => {
    const userIdReq = req.params.userId;
    let user;

    try {
        user = await User.findOne({
            userId: userIdReq
        })
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(200).send({
            message: `User with this id [${userIdReq}] is not present`
        })
    }
}


/**
 * Fetch the list of all users
*/

exports.findAll = async (req, res) => {
    let user;

    let userTypeReq = req.body.userTypes;
    let userStatusReq = req.body.userStatus;
    let userNameReq = req.query.name;

    if (userNameReq) {
        user = await fetchByName(userNameReq, res);
    } else if (userTypeReq && userStatusReq) {
        user = await fetchByTypeAndStatus(userStatusReq, userStatusReq, res);
    } else if (userTypeReq) {
        user = await fetchByType(userTypeReq, res);
    } else if (userStatusReq) {
        user = await fetchByStatus(userStatusReq, res);
    } else {
        user = await fetchAll(res)
    }
    res.status(200).send(ObjectConverter.userResponse(user))
}

exports.update = async (req, res) => {
    const userIdReq = req.params.userId;
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        }, {
            userStatus: req.body.userStatus
        }).exec()

        if (user) {
            res.status(200).send({
                message: `User record has been updated successfully.`
            })
        } else {
            res.status(200).send({
                message: "No user found with this Id"
            })
        }
    } catch (err) {
        console.log("Error while updating the record", err);
        res.status(500).send({
            message: "Some internal error occured."
        })
    }
}