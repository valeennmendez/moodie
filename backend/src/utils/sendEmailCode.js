import { sendEmailVerification } from "../services/brevo.js";

export const sendEmailCode = async (code, user) => {
  try {
    const resEmail = await sendEmailVerification(user.name, code, user.email);

    if (!resEmail) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error in sendEmailCode: ", error);
    return false;
  }
};
