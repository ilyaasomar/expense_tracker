import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import usersRoute from "./routes/users.js";
import transectionRoutes from "./routes/transections.js";
import generalRoutes from "./routes/general.js";
import accountRoutes from "./routes/account.js";
import connect_db from "./config/dbConnection.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/users", usersRoute);
app.use("/api/transactions", transectionRoutes);
app.use("/api/generals", generalRoutes);
app.use("/api/accounts", accountRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  connect_db();
  console.log(`server is running at http://localhost:${port}`);
});
