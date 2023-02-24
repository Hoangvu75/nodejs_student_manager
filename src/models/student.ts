import { Schema, model } from "mongoose";

const genderValidator = /^(male|female)$/i;
const birthdayValidator = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
const phoneValidator = /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/;

const Student = new Schema({
  name: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    validate(value: any) {
      if (!value.match(genderValidator)) {
        throw new Error("Gender can be 'male' or 'female' only.");
      }
    },
  },
  birthday: {
    type: String,
    required: true,
    validate(value: any) {
      if (!value.match(birthdayValidator)) {
        throw new Error("Please enter a valid date as dd/mm/yyyy.");
      }
    },
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    validate(value: any) {
      if (!value.match(phoneValidator)) {
        throw new Error("Please enter a valid phone number.");
      }
    },
  },
});

export default model("student", Student);
