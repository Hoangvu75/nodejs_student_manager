import express from "express";
import mongoose from "mongoose";
import studentRoute from "./routes/student";
import swaggerUi from "swagger-ui-express";
import * as studentSwaggerDocument from "../student-swagger.json";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to server: ${PORT}`);
});

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://mindx:mindx@clustermindx.nnoes8c.mongodb.net/mindx_database",
  function (err: any) {
    if (err) {
      console.log("Connection error");
      throw err;
    } else {
      console.log("Connected to the database.");
    }
  }
);

// Set up routes
app.use('/student', studentRoute);

// Set up swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(studentSwaggerDocument));
