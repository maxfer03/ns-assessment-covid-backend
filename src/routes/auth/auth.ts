import {Router} from "express";
import User from '../../models/user'

const auth: Router = Router()

auth.get('/', (req, res) => {
    return res.send('auth path')
})

auth.post('/login', (req, res) => {
    return res.json('log in')
})

auth.post('/signup', (req, res) => {
    return res.json('sign up')
})


export default auth