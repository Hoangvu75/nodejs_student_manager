import Parent from "../models/parent";
import Student from "../models/student";

export const getParentList = async (req: any, res: any) => {
  try {
    async function getResults() {
      var parentList: any[] = [];
      for await (const doc of Parent.find()) {
        parentList.push(doc);
      }
      return parentList;
    }
    const parentList = await getResults();
    res.status(200).send({
      success: true,
      message: "Get parent list successfully",
      parent_list: parentList,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      errors,
    });
  }
};

export const addParent = async (req: any, res: any) => {
  const listChildren: any[] = [];
  const student_id = req.body.student_id;

  var executeAddParent = async () => {
    try {
      const newParents = new Parent({
        name: req.body.name,
        children: listChildren,
      });
      await newParents.save();
      return res.status(200).send({
        success: true,
        message: "Added new parent",
        added_parent: newParents,
      });
    } catch (errors) {
      return res.status(500).send({
        success: false,
        errors,
      });
    }
  };

  for (let i = 0; i < student_id.length; i++) {
    await Student.findById(student_id[i]).then((student: any) => {
      if (!student) {
        executeAddParent = () => {
          return res.status(404).send({
            success: false,
            message: `No student found with ID ${student_id[i]}`,
          });
        };
        i === student_id.length - 1
      } else if (student) {
        listChildren.push(student);
      }
    });

    if (i === student_id.length - 1) {
      executeAddParent();
    }
  }
};
