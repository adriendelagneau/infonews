import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        picture: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.Author || mongoose.model("Author", authorSchema);