import express from "express";
import mongoose from "mongoose";
import studentRoute from "./routes/student";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger-doc.json";
import parentsRoute from "./routes/parent";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
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

// routes
app.use('/student', studentRoute);
app.use('/parent', parentsRoute);

// swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
