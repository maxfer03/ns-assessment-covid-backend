import {Router} from "express";
import auth from "./auth/auth";
import { requestCovidStats } from "../utils/axios";
import { IcovidStats } from "../utils/interfaces";

const routes: Router = Router()


routes.use('/auth', auth)

routes.get('/statistics', async (req, res) => {
    const info: IcovidStats = await requestCovidStats()
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