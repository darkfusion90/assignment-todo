const jwt = require('jsonwebtoken')
const fs = require('fs')

const { getDbFile } = require('./database')

// should use .env for production
const SECRET_KEY = '12345abcd'

const getUsersDb = () => {
    const usersDbFile = getDbFile('users.json')

    return new Promise((resolve, reject) => {
        fs.readFile(usersDbFile, { encoding: 'utf-8' }, (err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(content))
            }
        })
    })
}

exports.createAccessToken = ({ username, password }) => jwt.sign({ username, password }, SECRET_KEY)

exports.verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decodedUserData) => {
            if (err || !decodedUserData) {
                reject(err)
            } else {
                resolve(decodedUserData)
            }
        })
    })
}

exports.checkUserCredentials = async ({ username, password }) => {
    const matchesCredentials = (user) => {
        console.log('check: ', user, ' against: ', { username, password })
        return user.username === username && user.password === password
    }

    const usersDb = await getUsersDb()
    for(let user of usersDb.users){
        if(matchesCredentials(user)){
            return true
        }
    }

    return false
}