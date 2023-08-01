import express from "express"
import userRoutes from "./users.route"
import bookRoutes from "./books.routes"
import authorRoutes from "./authors.routes"
import publisherRoutes from "./publishers.routes"

const routes = (app: express.Express) => {
    app.use(express.json())
    app.use("/users", userRoutes)
    app.use("/books", bookRoutes)
    app.use("/authors", authorRoutes)
    app.use("/publishers", publisherRoutes);
}

export default routes;