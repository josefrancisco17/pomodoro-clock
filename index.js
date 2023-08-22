import express from "express"

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

app.use( express.static( __dirname + '/frontend' ));

app.get('/',(req,res)=> {
    res.sendFile( path.join( __dirname, 'frontend', 'index.html' ));
})

app.post('/',(req,res)=> {
    res.sendFile(__dirname + "/main.js")
})

app.listen(3000, ()=> {
    console.log("[INFO] The server is up and running")
})