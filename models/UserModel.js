const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    platforms: [
      {
        type: String,
        required: true,
        enum: [
          "Netflix",
          "Amazon Prime",
          "Disney+",
          "HBO Now",
          "Plex",
          "Xbox",
          "Playstation",
          "Switch",
          "PC",
          "Mobile",
          "Kindle Unlimited",
          "Scribd",
          "Bookmate",
          "24symbols",
          "Playster",
          "Comixology",
          "Marvel Unlimited",
          "DC Universe",
          "Crunchyroll",
          "Shonen Jump",
          "Other",
        ],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
