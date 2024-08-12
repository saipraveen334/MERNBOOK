import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";  // Uncomment this line

const app = express();

app.use(express.json());

app.use(cors());  // Uncomment this line

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send('MERN BOOK TUTORIAL');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(PORT, () => {
            console.log(`APP IS LISTENING ON PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
