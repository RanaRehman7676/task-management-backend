const  mongoose  = require("mongoose");
const UserSchema = require("./users");
const TaskSchema = require("./tasks");


const DB = {
    User: mongoose.model('User', UserSchema),
    // task management
    Task: mongoose.model('Task', TaskSchema),

};

module.exports = DB;
