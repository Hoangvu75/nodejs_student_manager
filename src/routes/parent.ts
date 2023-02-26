import express from "express";
import {
    getParentList,
    addParent,
} from "../controller/parent";

const parentsRoute = express.Router();

parentsRoute.get("/parent-list", getParentList);
parentsRoute.post("/add-parent", addParent);

export default parentsRoute;

