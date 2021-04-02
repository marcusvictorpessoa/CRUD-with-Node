import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import * as Yup from 'yup'
import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6)
  })

  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ erro: "Erro ao validar o campos."})
  }

  const authHeader = req.headers.authorization

  if (!authHeader){
    return res.status(401).json({ erro: 'token não fornecido!'})
  }

  const [, token] = authHeader.split(' ')

  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)  
    req.userId = decoded.id

    return next()

  } catch (err){
    
    return res.status(401).json({ erro: 'token invalido!'})
  
  }
}