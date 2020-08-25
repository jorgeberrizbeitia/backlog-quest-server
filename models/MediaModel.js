const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Movie", "Series", "Game", "Book", "Comics"],
    },
    categories: [String],
    platform: {
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
    image: { type: String },
    ranking: { type: String },
    description: { type: String },
    releaseDate: { type: Date },
    dateAdded: { type: Date },
    dateStarted: { type: Date },
    dateFinished: { type: Date },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
