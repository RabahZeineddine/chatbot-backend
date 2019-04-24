import { Router } from 'express'

const initRouter = () => {
    let router = Router()

    router.route('/auth/login')
        .post(login)


    router.route('/message')
        .post(message)

    return router
}


const login = async (req, res) => {
    // res.status(500).json({ error: true, detail: 'Internal server error test' })
    res.status(200).json({
        username: 'RabahZein',
        birthday: '31/05/1995',
        firstname: 'Rabah',
        lastname: 'Zeineddine'
    })
}

const message = async (req, res) => {
    // setTimeout(() => {
    const message = req.body
    message.user = 'application'
    res.status(200)
    res.send([message])
    // }, 5000)
}


export default initRouter()