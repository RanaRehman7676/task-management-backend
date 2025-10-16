const express = require("express");
const { validateToken } = require("../../../middleware/validateToken");
const { TaskManagementController } = require("../../../controller");
const validateRequest = require("../../../middleware/validateRequest");
const { 
  createTaskSchema, 
  updateTaskSchema, 
  getTaskSchema, 
  deleteTaskSchema, 
  taskListingSchema 
} = require("../../../validation/taskSchema");

const router = express.Router();

// ------------- Task Management Routes ---------------

// Create Task
router.post(
  "/task/add", 
  validateToken(), 
  validateRequest(createTaskSchema), 
  TaskManagementController.createTask
);

// Update Task
router.patch(
  "/task/update", 
  validateToken(), 
  validateRequest(updateTaskSchema), 
  TaskManagementController.updateTask
);

// Get Single Task
router.get(
  "/task/get", 
  validateToken(), 
  validateRequest(getTaskSchema), 
  TaskManagementController.getTask
);

// Tasks Listing with pagination
router.get(
  "/task/list", 
  validateToken(), 
  validateRequest(taskListingSchema), 
  TaskManagementController.taskListing
);

// All Tasks Listing without pagination
router.get(
  "/task/all", 
  validateToken(), 
  validateRequest(taskListingSchema), 
  TaskManagementController.allTaskListing
);

// Remove Task 
router.delete(
  "/task/remove", 
  validateToken(), 
  validateRequest(deleteTaskSchema), 
  TaskManagementController.removeTask
);

module.exports = router;
