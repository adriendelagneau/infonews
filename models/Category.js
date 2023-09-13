import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
)

//If the Post collection does not exist create a new one.
export default mongoose.models.Category || mongoose.model("Category", categorySchema);