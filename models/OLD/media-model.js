const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['Film', 'Series', "Game", "Book"]},
    done: { type: Boolean },
    platform: { type: String, required: true, enum: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Now', 'Plex', 'Other', "Xbox", "Playstation", "Switch", "PC", "Other"] },
    image: { type: String },
    ranking: { type: String },
    description: { type: String },
    releaseDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
