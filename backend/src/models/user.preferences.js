import mongoose from "mongoose";

const userPreferencesModel = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    favorites_movies: {
      type: [String],
    },
    disliked_genres: {
      type: [String],
    },
    favorites_directors: {
      type: [String],
    },
    favorites_actors: {
      type: [String],
    },
    favorites_themes: {
      type: [String],
    },
    preferred_platform: {
      type: String,
    },
    content_restriction: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const UserPrefer = mongoose.model("UserPrefer", userPreferencesModel);

export default UserPrefer;
