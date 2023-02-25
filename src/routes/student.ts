import express from "express";
import {
  getStudentList,
  addStudent,
  removeStudent,
  updateStudent,
  findStudentsByName,
  findStudentById
} from "../controller/student";

const studentRoute = express.Router();

studentRoute.get("/student-list", getStudentList);
studentRoute.post("/add-student", addStudent);
studentRoute.delete("/remove-student/:student_id", removeStudent);
studentRoute.put("/update-student/:student_id", updateStudent);
studentRoute.get("/find-by-name", findStudentsByName);
studentRoute.get("/find-by-id/:student_id", findStudentById);

export default studentRoute;
