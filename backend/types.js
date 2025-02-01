const zod = require("zod");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1).regex(/^[a-zA-Z]+$/),
    lastName: zod.string().min(1).regex(/^[a-zA-Z]+$/),
    password: zod.string().min(6),
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    username: zod.string().min(1).regex(/^[a-zA-Z]+$/).email(),
    firstName: zod.string().min(1).regex(/^[a-zA-Z]+$/),
    lastName: zod.string().min(1).regex(/^[a-zA-Z]+$/),
    password: zod.string().min(6),
})

module.exports = {
    signupBody: signupBody,
    signinBody: signinBody,
    updateBody: updateBody
}