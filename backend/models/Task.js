import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: true,
            trim: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        deadline: {
            type: Date,
            default: Date.now(),
            require: true,
        },
        priority: {
            type: String,
            require: true,
            enum: ["Baja", "Media", "Alta"],
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
