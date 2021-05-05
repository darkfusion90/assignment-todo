const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const { getDbFile } = require('./database')
const auth = require('./auth')

const server = jsonServer.create()

server.use(jsonServer.defaults())

server.use('/register/users', (req, res, next) => {
    if (req.method !== 'POST') {
        res.status(403).json({ message: `Method "${req.method}" not allowed` })
    } else {
        next()
    }
})

server.use('/register', jsonServer.router(getDbFile('users.json')))

const parseAccessToken = (req) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders) {
        return null
    }

    if (!authHeaders.startsWith("Bearer")) {
        return null
    }

    const authSplit = authHeaders.split(' ')
    if (authSplit.length < 2) {
        return null
    }

    const accessToken = authSplit[1]
    return accessToken
}

const urlencoded = bodyParser.urlencoded({ extended: true })
server.use('/api/todos', urlencoded, bodyParser.json(), async (req, res, next) => {
    console.log('inside middleware access token: ', req.headers.authorization)
    if (req.method !== 'POST') {
        return next()
    }

    const resBadAccessToken = () => res.status(400).json({ message: 'Bad access token' })

    const accessToken = parseAccessToken(req)
    if (accessToken === null) {
        return resBadAccessToken()
    }

    try {
        const userData = await auth.verifyAccessToken(accessToken)
        console.log('userdata: ', userData)
        req.body.author = userData.username
        next()
    } catch (err) {
        console.log('Error while verifying token: ', err)
        return resBadAccessToken()
    }
})

server.use('/api', jsonServer.router(getDbFile('todos.json')))

server.post('/login', urlencoded, bodyParser.json(), async (req, res) => {
    const resIncorrectCredentials = () => {
        res.status(401).json({ 'message': 'Invalid credentials' })
    }

    if (!req.body) {
        console.log('no body')
        return resIncorrectCredentials()
    }

    const { username, password } = req.body
    let isValidUser = false

    try {
        isValidUser = await auth.checkUserCredentials({ username, password })
    } catch (err) {
        console.log('Error validating credentials: ', err)
        return resIncorrectCredentials()
    }

    if (isValidUser) {
        const accessToken = auth.createAccessToken({ username, password })
        res.json({ accessToken })
    } else {
        console.log('invalid user')
        resIncorrectCredentials()
    }
})

server.get('/check-admin', urlencoded, bodyParser.json(), async (req, res) => {
    const resAdmin = (isAdmin) => res.json({ isAdmin })

    if (!req.body) {
        console.log('no body')
        return resAdmin(false)
    }

    const accessToken = parseAccessToken(req)
    if (accessToken === null) {
        console.log('no access token')
        return resAdmin(false)
    }

    try {
        const { username, password } = await auth.verifyAccessToken(accessToken)
        if (username === 'admin' && password === 'admin123') {
            resAdmin(true)
        } else {
            resAdmin(false)
        }
    } catch (err) {
        console.log('Error while verifying token: ', err)
        return resAdmin(false)
    }
})

server.listen(8000, () => console.log('Listening at port 8000'))