const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {readdirSync} = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
const {sequelize} = require('./models')
const port = process.env.port || 8000

readdirSync('./routes').map((r)=>{app.use('/api',require(`./routes/${r}`))});

app.listen(port,async()=>{
    console.log(`Server is runing on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log(`DB is connected successfully`)
})


