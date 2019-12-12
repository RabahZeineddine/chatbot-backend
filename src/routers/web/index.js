import { Router } from 'express'
import MessagesController from '../../controllers/MessagesController'

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
    const params = req.body
    let messageController = new MessagesController()
    try {
        let response = await messageController.send(params)
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}


export default initRouter()