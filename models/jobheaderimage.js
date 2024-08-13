const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const headerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    titie: {
        type: String,
    },
});

const JobPost = mongoose.model("JobPost", headerSchema);
module.exports = JobPost;