import express from "express";
import routes from "./routes/routes";

const app = express()
const port: number = 3001

//configs
app.set('port', process.env.PORT || port)


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', routes)

app.get('/', (req, res) => {
    return res.send('COVID NS API')
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}.`)
})