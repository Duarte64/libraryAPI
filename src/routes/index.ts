import express from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./users.route"
import bookRoutes from "./books.routes"
import authorRoutes from "./authors.routes"
import bookingRoutes from "./booking.routes"
import publisherRoutes from "./publishers.routes"

const routes = (app: express.Express) => {
    app.use(express.json())
    app.use("/auth", authRoutes)
    app.use("/users", userRoutes)
    app.use("/books", bookRoutes)
    app.use("/authors", authorRoutes)
    app.use("/bookings", bookingRoutes)
    app.use("/publishers", publisherRoutes);
}

export default routes;