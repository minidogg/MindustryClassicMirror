// This script is used to get all the Mindustry assets
const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

const gameURL = "https://html-classic.itch.zone/html/1597847"

function ensureDirAndWriteFile(filePath, data) {
    const dir = path.dirname(filePath);
    
    // Create directories if they don't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write data to the file
    fs.writeFileSync(filePath, data);
}

app.use(async (req, res, next)=>{
    let fetched = await fetch(gameURL+req.path)
    let data = [".html", ".css", ".js"].includes(path.extname(req.path))?await fetched.text():Buffer.from(await (fetched).arrayBuffer())

    console.log(req.path)
    ensureDirAndWriteFile(path.join(path.resolve("./web"), req.path), data)

    // res.setHeaders(fetched.headers)
    res.send(data)
})

app.listen(8080, ()=>{
    console.log("Proxy started!")
})