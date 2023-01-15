const { mockRequest, mockResponse } = require('../interceptor')
const { signup, signin } = require('../../controller/auth.controller');
const User = require('../../models/user.model');
const db = require('../db');
var bcrypt = require('bcrypt');

// afterEach(async () => await db.clearDatabase());
// afterAll(async () => await db.closeDatabase());


const testPayload = {
    userTypes: "CUSTOMER",
    password: "12345678",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    userStatus: "PENDING",
    ticketCreated: [],
    ticketAssigned: []
}

describe('Testing Signup and Signin...', () => {
    beforeEach(() => {
        req = mockRequest,
            res = mockResponse
    });

    const signupSpy = jest.spyOn(User, 'create').mockImplementation((testPayLoad) => Promise.resolve(testPayLoad));

    it('Testing Signup', async () => {
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await signup(req, res)
        expect(signupSpy).toHaveBeenCalled()
        // expect(User.create).toHaveBeenCalledWith({
        //     email:"test@relevel.com",
        //     name:"Test",
        //     userId:1,
        //     userStatus:"APPROVED",
        //     userTypes:"CUSTOMER",
        // });
        expect(res.status).toHaveBeenCalledWith(201);
    })


})

describe('Testing Signin...', () => {
    it('should fail due to password mismatch', async () => {
        testPayload.userStatus = "APPROVED"
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(
            Promise.resolve(testPayload)
        )
        const bcryptSpy = jest.spyOn(bcrypt, 'compareSync')
            .mockReturnValue(false)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)

        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith({
            message: "Invalid Password!"
        })

    })

    it('should not allow users who are not approved', async () => {
        testPayload.userStatus = 'PENDING'
        const userSpy = jest.spyOn(User, 'findOne')
            .mockReturnValue(Promise.resolve(testPayload))
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.send).toHaveBeenCalledWith({
            message: "Can't allow login as user is in status : [PENDING]"
        })
    })

    it(`should fail if the user doesn't exist`, async () => {
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(null)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload;
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({
            message: "Failed! Userid doesn't exist!"
        })
    })

    it(`should pass`, async () => {
        testPayload.userStatus = "APPROVED"
        const userSpy = jest.spyOn(User, "findOne")
            .mockReturnValue(Promise.resolve(testPayload))
        const bcryptSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).not.toHaveBeenCalledWith({
            email: testPayload.email,
            name: testPayload.name,
            userId: testPayload.userId,
            userTypes: testPayload.userTypes,
            userStatus: testPayload.userStatus
        })
    })
})
