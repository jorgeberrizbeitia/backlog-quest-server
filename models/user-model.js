const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    platforms: [ { type: String, enum: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Now', 'Plex', 'Other'] } ],
    consoles: [ { type: String, enum: ["Xbox", "Playstation", "Switch", "PC", "Other"] } ],
    media: [ { type: Schema.Types.ObjectId, ref: "Media" } ] // Will be implemented later
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
