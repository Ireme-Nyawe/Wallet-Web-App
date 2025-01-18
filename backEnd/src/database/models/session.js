import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "users",
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model("sessions", sessionSchema);

export default Session;
