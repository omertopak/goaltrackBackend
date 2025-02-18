"use strict"

// Auth Controller:

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {
 
        const {email, password } = req.body

        if ( email && password) {

            const user = await User.findOne({ email:email  })
            console.log(passwordEncrypt(password));
            if (user && user.password == passwordEncrypt(password)) {

                    // JWT:
                    // const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '120m' })
                    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_KEY, { expiresIn: '120m' })

                    const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '1d' })

                    res.send({
                        error: false,
                        bearer: { accessToken, refreshToken },
                        // user,
                    })
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter email and password.')
        }
    },

    refresh: async (req, res) => {
    

        const refreshToken = req.body?.bearer?.refreshToken

        if (refreshToken) {

            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {
                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                                // JWT:
                                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })

                                res.send({
                                    error: false,
                                    bearer: { accessToken }
                                })

                            
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter refresh token')
        }
    },

    logout: async (req, res) => {
       
        let message  = 'Successfully logged out.'
        // const refreshToken = req.body?.bearer?.refreshToken

        // jwt.destroy(refreshToken)

        res.send({
            error: false,
            message,
            // result
        })
    },
}