import express from "express";

const app = express()
const port: number = 3001



app.set('port', port)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})