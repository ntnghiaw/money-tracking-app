const User = require('../models/user');

exports.get = async (req, res, next) => {
    const { userId } = req.params;
    return User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
               response: {
                    error: "User not found"
               }
            })
        }
        return res.status(200).json({
            response: {
                user
            }
        })
    }).catch(err => {
        console.log(err)
    })
}



exports.update = async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    console.log(newUser)
    return User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
               response: {
                    error: "User not found"
               }
            })
        }
        return res.status(200).json({
            response: {
                newUser
            }
        })
    }).catch(err => {
        console.log(err)
    })
}