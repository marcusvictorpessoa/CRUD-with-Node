import { Router } from 'express'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.get('/',  res => {
    return res.json({ message: 'Bem vindo à API de controle de clientes!'})
})

routes.post('/users', UserController.store)

export default routes