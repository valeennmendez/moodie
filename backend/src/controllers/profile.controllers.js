import UserPrefer from "../models/user.preferences.js";
import User from "../models/user.model.js";

export const addPreferencesController = async (req, res) => {
  const {
    favorites_movies,
    disliked_genres,
    favorites_directors,
    favorites_actors,
    favorites_themes,
    preferred_platform,
    content_restriction,
  } = req.body;

  try {
    const userid = req.user._id;
    console.log(userid);

    console.log("UserID: ", userid);

    if (!userid) return res.status(400).json({ error: "Userid is required." });

    const alreadyHave = await UserPrefer.findOne({ user_id: userid });

    console.log("AlreadyHAVE: ", alreadyHave);

    const updatePayload = {};
    if (favorites_movies) updatePayload.favorites_movies = favorites_movies;
    if (disliked_genres) updatePayload.disliked_genres = disliked_genres;
    if (favorites_directors)
      updatePayload.favorites_directors = favorites_directors;
    if (favorites_actors) updatePayload.favorites_actors = favorites_actors;
    if (favorites_themes) updatePayload.favorites_themes = favorites_themes;
    if (preferred_platform)
      updatePayload.preferred_platform = preferred_platform;
    if (typeof content_restriction === "boolean")
      updatePayload.content_restriction = content_restriction;

    if (alreadyHave) {
      console.log("Estoy dentro de alreadyhave");
      const updatePreferences = await UserPrefer.findOneAndUpdate(
        { user_id: userid },
        updatePayload,
        {
          new: true,
        }
      );
      if (!updatePreferences) {
        console.log(updatePreferences);
        return res.status(400).json({ error: "Preferences not updated" });
      }
      return res.status(200).json({ message: "Updated succesfully" });
    }

    const newPreferences = new UserPrefer({
      user_id: userid,
      ...updatePayload,
    });

    if (!newPreferences)
      return res
        .status(400)
        .json({ error: "Failed to create new preferences." });

    await newPreferences.save();

    return res.status(200).json({ message: "Added preferences" });
  } catch (error) {
    console.log("Error in addPreferencesController: ", error);
    return res.status(500).json({ error: "Error in addPreferencesController" });
  }
};

export const getPreferencesController = async (req, res) => {
  try {
    const userid = req.user._id;
    console.log("Userid: ", userid);

    if (!userid) return res.status(400).json({ error: "userid is required" });

    const userPreferences = await UserPrefer.findOne({
      user_id: userid,
    });

    console.log("userPreferences: ", userPreferences);
    if (!userPreferences)
      return res.status(400).json({ error: "The userPreferences don't exist" });

    return res.status(200).json({ message: userPreferences });
  } catch (error) {
    console.log("Error in getPreferencesController", error);
    return res.status(500).json({ error: "Error in getPreferencesController" });
  }
};
