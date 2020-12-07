const User = require('../models/user.model.js');
const HashingHandler = require("../utils/hashingHandler")
const UserRole = require("../models/userRoles.model")

// Create and Save a new Note

exports.create = async (req, res) => {

    try {
        // Validate request
        let userObj = req.body
        if (!userObj) {
            return res.status(400).send({
                message: "User Info can not be empty"
            });
        }

        let existedUser = await User.findOne({ email: userObj.email })

        if (existedUser) return res.status(400).send({ message: "User Already Existed!" })

        userObj.password = await HashingHandler.hashingValue(userObj.password)
        // Create a Note

        let roleObj = {}

        roleObj.role = userObj.role
        if (await checkFirstUser()) {
            roleObj.role = 'admin'

        }

        let firstUser = await checkFirstUser()

        if (firstUser === false && userObj.role === 'admin') {
            return res.status(500).send({
                message: "You are not authorized to registered as an Admin."
            });
        }


        // Save User in the database
        let userData = await User.create(userObj)


        // Save Role in the database
        await UserRole.create(roleObj)

        return res.send(userData);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error.message || "Some error occurred while regidtering User."
        });
    }

};

const checkFirstUser = async () => {
    let usersCount = await User.find()
    if (usersCount.length === 0) return true
    return false
}

