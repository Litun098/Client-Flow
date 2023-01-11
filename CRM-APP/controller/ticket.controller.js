const User = require('../models/user.model');
const Ticket = require('../models/ticket.model')
const objectConverter = require('../utils/objectConverter');
const constants = require('../utils/constants');

exports.createTicket = async (req, res) => {
    const ticketObject = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.body.userId,
    }

    const engineer = await User.findOne({
        userTypes: constants.userTypes.engineer,
        userStatus: constants.userStatus.approved
    })

    ticketObject.assignee = engineer.userId;

    try {
        const ticket = await Ticket.create(ticketObject)
        console.log(ticket)
        if (ticket) {
            const user = await User.findOne({
                userId: req.body.userId
            })
            user.ticketCreated.push(ticket._id)
            await user.save()

            engineer.ticketAssigned.push(ticket._id)
            await engineer.save()

            res.status(201).send(objectConverter.ticketResponse(ticket))
        }
    } catch (err) {
        console.log("Some error happened while creating ticket", err.message)
        res.status(500).send({
            message: 'Some internal server error'
        })
    }
}


const canUpdate = (user, ticket) => {
    return user.userId == ticket.reporter ||
        user.userId == ticket.assignee ||
        user.userType == constants.userTypes.admin
}

exports.updateTicket = async (req, res) => {
    const ticket = await Ticket.findOne({ _id: req.params.id })
    console.log(ticket)
    const savedUser = await User.findOne({
        userId: req.body.userId
    })
    console.log(savedUser)

    if (canUpdate(savedUser, ticket)) {
        ticket.title = req.body.title != undefined
            ? req.body.title
            : ticket.title
        ticket.description = req.body.description != undefined
            ? req.body.description
            : ticket.description
        ticket.ticketPriority = req.body.ticketPriority != undefined
            ? req.body.ticketPriority
            : ticket.ticketPriority
        ticket.status = req.body.status != undefined
            ? req.body.status
            : ticket.status
        ticket.assignee = req.body.assignee != undefined
            ? req.body.assignee
            : ticket.assignee
        await ticket.save()
        res.status(200).send(objectConverter.ticketResponse(ticket))

    } else {
        console.log("Ticket update was attempted by someone without access to the ticket")
        res.status(401).send({
            message: "Ticket can be updated only by the customer who created it"
        })
    }
}

exports.getAllTickets = async (req, res) => {
    /**
     * Use cases:
     *  - ADMIN : should get the list of all the tickets
     *  - CUSTOMER : should get all the tickets created by him/her
     *  - ENGINEER : should get all the tickets assigned to him/her
     */

    const queryObject = {};

    if (req.query.status != undefined) {
        queryObject.status = req.query.status;
    }

    const savedUser = await User.findOne({ userId: req.body.userId })

    if (savedUser.user == constants.userTypes.admin) {
        // Do something
    } else if (savedUser.userTypes == constants.userTypes.customer) {
        queryObject.reporter = savedUser.userId
    } else {
        queryObject.assignee = savedUser.userId
    }

    const ticket = await Ticket.find(queryObject);
    res.status(200).send(objectConverter.ticketListResponse(ticket));
}

exports.getOneTicket = async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id
    })
    res.status(200).status(objectConverter.ticketResponse(ticket));
}