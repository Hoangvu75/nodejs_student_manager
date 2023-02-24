import express from "express";
import {
  getStudentList,
  addStudent,
  removeStudent,
  updateStudent,
  findStudentsByName,
} from "../controller/student";

const studentRoute = express.Router();

studentRoute.get("/student-list", getStudentList);
studentRoute.post("/add-student", addStudent);
studentRoute.delete("/remove-student/:student_id", removeStudent);
studentRoute.put("/update-student/:student_id", updateStudent);
studentRoute.get("/find", findStudentsByName);

export default studentRoute;
