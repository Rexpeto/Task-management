import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
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
        deadline: {
            type: Date,
            default: Date.now(),
        },
        clients: {
            type: String,
            trim: true,
            require: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
