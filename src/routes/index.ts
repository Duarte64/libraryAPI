import express from "express"
import bookRoutes from "./books.routes"

const routes = (app: express.Express) => {
    app.use(
        express.json(),
        bookRoutes
    )
}

export default routes;