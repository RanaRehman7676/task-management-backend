const { object, string, date, mixed } = require("yup");

// Create task schema
const createTaskSchema = object().shape({
    body: object().shape({
        title: string()
            .required('Title is required')
            .min(1, 'Title cannot be empty')
            .max(100, 'Title must be less than 100 characters'),
        description: string()
            .required('Description is required')
            .min(1, 'Description cannot be empty')
            .max(500, 'Description must be less than 500 characters'),
        due_date: date()
            .required('Due date is required'),
        status: string()
            .oneOf(['Pending', 'In Progress', 'Completed'], 'Status must be one of: Pending, In Progress, Completed')
            .optional()
    }),
});

// Update task schema
const updateTaskSchema = object().shape({
    body: object().shape({
        id: string()
            .required('Task ID is required')
            .matches(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format'),
        title: string()
            .min(1, 'Title cannot be empty')
            .max(100, 'Title must be less than 100 characters')
            .optional(),
        description: string()
            .min(1, 'Description cannot be empty')
            .max(500, 'Description must be less than 500 characters')
            .optional(),
        due_date: date()
            .optional(),
        status: string()
            .oneOf(['Pending', 'In Progress', 'Completed'], 'Status must be one of: Pending, In Progress, Completed')
            .optional()
    })
});

// Get task by ID schema
const getTaskSchema = object().shape({
    query: object().shape({
        task_id: string()
            .required('Task ID is required')
            .matches(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format')
    })
});

// Delete task schema
const deleteTaskSchema = object().shape({
    body: object().shape({
        id: string()
            .required('Task ID is required')
            .matches(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format')
    })
});

// Task listing schema
const taskListingSchema = object().shape({
    query: object().shape({
        page: string()
            .matches(/^\d+$/, 'Page must be a number')
            .optional(),
        status: string()
            .oneOf(['Pending', 'In Progress', 'Completed'], 'Status must be one of: Pending, In Progress, Completed')
            .optional(),
        limit: string()
            .matches(/^\d+$/, 'Limit must be a number')
            .optional()
    })
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    getTaskSchema,
    deleteTaskSchema,
    taskListingSchema
};
