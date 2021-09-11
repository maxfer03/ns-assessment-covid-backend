import {Router} from "express";
import auth from "./auth/auth";

const routes: Router = Router()


routes.use('/auth', auth)

routes.get('/statistics', (req, res) => {
    return res.json('stats')
})

routes.post('/statistics', (req, res) => {
    return res.json('stats posted')
})

routes.get('/sync', (req, res) => {
    return res.json('sync')
})




export default routes