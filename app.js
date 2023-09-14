import express from "express";
import { APP_PORT, DB_URL } from "./config";
import mongoose from "mongoose";
import path from 'path'
import ejs from 'ejs'
import routes from "./routes";

const app = express();

//DB connection...
mongoose.connect(`${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log(' DB connected ');
});

//template engine ejs
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.json())
app.use(routes)

app.listen(APP_PORT, () => console.log(`server runing on port ${APP_PORT}`));
