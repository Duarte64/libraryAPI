import cors from "cors";
import docs from './docs';
import routes from "./routes";
import express from "express";
import database from "./infra/database/database.connector";
import swaggerUi from 'swagger-ui-express';
import errorsHandler from "./middlewares/error/error.middleware";

database.on("error", console.error.bind(console, "connection error:"));
database.once("open", () => {
    console.log("Connected to database 🚀");
});

const app = express();
app.use(cors());
routes(app);
app.use(errorsHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server started at port ${process.env.PORT} 🔥`);
});

 