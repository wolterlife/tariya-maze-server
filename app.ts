import "reflect-metadata"
const {port} = require('./config')
const express = require('express');
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.listen(port, () => {console.log(`App listen on port ${port}!`)})

