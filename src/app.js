import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use( cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "15kb"})); // it take data wghen you fill forms but data accepted from url are ....
app.use(express.urlencoded({extended: true, limit: "15kb"})); // extended use for giving nested ojeject object in object
app.use(express.static("public"));
app.use(cookieParser());

export { app };