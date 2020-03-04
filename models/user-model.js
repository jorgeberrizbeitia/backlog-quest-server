const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    platforms: [ { type: String, enum: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Now', 'Plex', 'Other'] } ],
    media: [ { type: Schema.Types.ObjectId, ref: "Media" } ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
