import User from '../models/User'
import * as Yup from 'yup'

class UserController {
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ erro: "Erro ao validar o campos."})
        }

        const emailExits = await User.findOne({ where:{ email: req.body.email }})

        if (emailExits){
            return res.status(400).json({ error: 'E-mail já existe!'})
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({id, name, email, message: "Usuário cadastrado com sucesso!"})
    }

    async update(req, res){

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) => 
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ erro: "Erro ao validar o campos."})
        }

        const { email, oldPassword } = req.body

        const user = await User.findByPk(req.userId)

        if(email !== user.email){
            const emailExits = await User.findOne({ where:{ email: req.body.email }})

            if (emailExits){
                return res.status(400).json({ error: 'email já existe!'})
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ erro: "Senha inválida!"})
        }

        const { id, name } = await user.update(req.body)

        return res.json({
            id,
            name,
            email
        })
    }
}

export default new UserController()