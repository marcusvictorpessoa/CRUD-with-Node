import User from '../models/User'

class UserController {
    async store(req, res){

        const emailExits = await User.findOne({ where:{ email: req.body.email }})

        if (emailExits){
            return res.status(400).json({ error: 'E-mail já existe!'})
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({id, name, email, message: "Usuário cadastrado com sucesso!"})
    }
}

export default new UserController()