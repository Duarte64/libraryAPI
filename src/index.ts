import cors from "cors";
import routes from "./routes";
import express from "express";
import database from "./common/database/database.connector";

database.on("error", console.error.bind(console, "connection error:"));
database.once("open", () => {
    console.log("Connected to database 🚀");
});

const app = express();
app.use(cors());
routes(app);

app.listen(process.env.PORT ?? 0, () => {
    console.log(`Server started at port ${process.env.PORT} 🔥`);
});

 