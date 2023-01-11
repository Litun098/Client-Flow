exports.userResponse = (users) => {
    let userResult = [];
    users.forEach(user => {
        userResult.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userTypes,
            userStatus: user.userStatus
        })
    });
    return userResult;
}

exports.ticketResponse = (ticket) => {
    return {
        ticket: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}

exports.ticketListResponse = (ticket) => {
    let ticketResult = [];
    ticket.forEach(ticket => {
        return ticketResult.push(exports.ticketResponse(ticket))
    })
    return ticketResult;
}