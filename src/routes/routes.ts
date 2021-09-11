import {Router} from "express";
import auth from "./auth/auth";
import { requestCovidInfo } from "../utils/axios";

const routes: Router = Router()


routes.use('/auth', auth)

routes.get('/statistics', async (req, res) => {
    const info: any = await requestCovidInfo('statistics')
    return res.json(info)
    //return res.json('stats')
})

routes.post('/statistics', (req, res) => {
    return res.json('stats posted')
})

routes.get('/sync', (req, res) => {
    return res.json('sync')
})




export default routes