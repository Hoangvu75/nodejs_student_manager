import Student from "../models/student";

export const getStudentList = async (req: any, res: any) => {
  try {
    async function getResults() {
      var studentList: any[] = [];
      for await (const doc of Student.find()) {
        studentList.push(doc);
      }
      return studentList;
    }
    const studentList = await getResults();
    res.status(200).send({
      success: true,
      message: "Get student list successfully",
      student_list: studentList,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      errors,
    });
  }
};

export const addStudent = async (req: any, res: any) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    return res.status(200).send({
      success: true,
      message: "Added a new student",
      added_student: newStudent,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      errors,
    });
  }
};

export const removeStudent = async (req: any, res: any) => {
  try {
    Student.findByIdAndRemove(req.params.student_id).then((student) => {
      if (!student) {
        return res.status(404).send({
          success: false,
          message: "Student not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Removed a student",
        removed_student: student,
      });
    });
  } catch (errors) {
    res.status(500).send({
      success: false,
      errors,
    });
  }
};

export const updateStudent = async (req: any, res: any) => {
  try {
    const studentId = req.params.student_id;
    const updatedStudent = req.body;
    const updatedStudentData = { ...updatedStudent };

    const student = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Updated student information",
      updated_student: student,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      errors,
    });
  }
};

export const findStudentsByName = async (req: any, res: any) => {
  try {
    const name = req.query.name;
    const students = await Student.find({ name: { $regex: `.*${name}`, $options: "i" } });
    
    if (!students || students.length === 0) {
      return res.status(404).send({
        success: false,
        message: `No students found with name ${name}`,
      });
    }
    
    return res.status(200).send({
      success: true,
      message: `Found ${students.length} students with name ${name}`,
      students: students,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      errors,
    });
  }
};