
require('dotenv').config()
var morgan = require('morgan')
import express from "express";
import routes from "./routes/routes";
import { authMiddleware, encodeSession } from "./utils/jwtUtils";
import { connectToMongoAtlas } from "./db";
import cors from 'cors';

const app = express()
const port: number = 3001

//configs
app.set('port', process.env.PORT || port)


//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use('/', routes)

app.get('/', (req, res) => {
    return res.send('COVID NS API')
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}.`)
})
connectToMongoAtlas(process.env.DB_CONN_STRING)