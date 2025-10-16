
const express = require("express");
const authRoutes = require("./Auth/authRoutes");
const TaskManagementRoutes = require("./Task-Management/TaskManagementRoutes");

const { jsonResponseFormat } = require("../../middleware/jsonResponseFormat");
const router = express.Router();

// Router will use response formate
router.use(jsonResponseFormat);

// Member Dashboard Router ---------------------------- ------
router.use("/auth/", authRoutes);
/// task management routes
router.use("/task-management/", TaskManagementRoutes);

module.exports = router;