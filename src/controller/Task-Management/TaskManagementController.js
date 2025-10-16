const { default: mongoose } = require("mongoose");
const DB = require("../../dbConfig/schema/schema");

const TaskManagementController = {

  // Create Task
  async createTask(req, res) {
    try {
      const { user } = req;
      const { title, description, due_date, status = 'Pending' } = req.body;

      if (!user?._id) {
        return res.errorResponse(true, "User ID is Required in task creation");
      }

      const taskObj = { 
        title, 
        description, 
        due_date: new Date(due_date), 
        status,
        user_id: user._id 
      };

      const task = await DB.Task.create(taskObj);
      if (!task) return res.errorResponse(true, "Task not Created", 400);

      return res.successResponse(false, task, "Task Created Successfully");
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },

  // Update Task
  async updateTask(req, res) {
    try {
      const { user } = req;
      const { id, _id, title, description, due_date, status } = req.body;
      const task_id = id || _id;

      if (!user?._id) return res.errorResponse(true, "User ID is Required in Update Task");
      if (!task_id) return res.errorResponse(true, "Task ID is required", 400);

      // Check if task exists and belongs to user
      const existingTask = await DB.Task.findOne({ _id: task_id, user_id: user._id });
      if (!existingTask) return res.errorResponse(true, "Task not found or access denied", 404);

      const updateObj = {};
      if (title !== undefined) updateObj.title = title;
      if (description !== undefined) updateObj.description = description;
      if (due_date !== undefined) updateObj.due_date = new Date(due_date);
      if (status !== undefined) updateObj.status = status;

      const task = await DB.Task.findByIdAndUpdate(
        task_id, 
        updateObj,
        { new: true, runValidators: true }
      );

      if (!task) return res.errorResponse(true, "Task not Updated", 400);

      return res.successResponse(false, task, "Task Updated Successfully");
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },

  // Remove Task
  async removeTask(req, res) {
    try {
      const { user } = req;
      const { id: task_id } = req.body;

      if (!user?._id) return res.errorResponse(true, "User ID is Required");
      if (!task_id) return res.errorResponse(true, "Task ID is required", 400);

      // Check if task exists and belongs to user
      const existingTask = await DB.Task.findOne({ _id: task_id, user_id: user._id });
      if (!existingTask) return res.errorResponse(true, "Task not found or access denied", 404);

      const result = await DB.Task.findByIdAndDelete(task_id);
      if (!result) return res.errorResponse(true, "Task not Found", 400);

      return res.successResponse(false, null, "Task Deleted Successfully");
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },

  // Get Single Task
  async getTask(req, res) {
    try {
      const { user } = req;
      const { task_id } = req.query;

      if (!user?._id) return res.errorResponse(true, "User ID is Required");
      if (!task_id) return res.errorResponse(true, "Task ID is required", 400);

      const task = await DB.Task.findOne({ _id: task_id, user_id: user._id });
      if (!task) return res.errorResponse(true, "Task not found or access denied", 404);

      return res.successResponse(false, task, "Task Retrieved Successfully");
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },

  // Tasks Listing with pagination and filtering
  async taskListing(req, res) {
    try {
      const { user } = req;
      let { page = 1, limit = 10, status } = req.query;

      if (!user?._id) return res.errorResponse(true, "User ID is Required");

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      const offset = (page - 1) * limit;

      const filter = {
        user_id: user._id,
      };

      // Add status filter if provided
      if (status) {
        filter.status = status;
      }

      const results = await DB.Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean();

      const totalItems = await DB.Task.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / limit);
      const hasNextPage = page < totalPages;

      return res.successResponse(
        false,
        {
          items: results,
          pagination: {
            totalItems,
            currentPage: page,
            limit,
            hasNextPage,
            totalPages,
            showing: results.length,
          },
        },
        "Tasks Listing"
      );
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },

  async allTaskListing(req, res) {
    try {
      const { user } = req;
      const { status } = req.query;

      if (!user?._id) {
        return res.errorResponse(true, "User ID is Required");
      }

      const filter = {
        user_id: user._id,
      };

      // Add status filter if provided
      if (status) {
        filter.status = status;
      }

      const results = await DB.Task.find(filter)
        .sort({ createdAt: -1 })
        .lean();
      const organizedTasks = {
        pending: results.filter(task => task.status === 'Pending'),
        inProgress: results.filter(task => task.status === 'In Progress'),
        completed: results.filter(task => task.status === 'Completed'),
        cancelled: results.filter(task => task.status === 'Cancelled'),
      };

      return res.successResponse(
        false,
        organizedTasks,
        "All Tasks Listing Organized by Status"
      );
    } catch (error) {
      return res.errorResponse(true, error.message);
    }
  },
};

module.exports = TaskManagementController;