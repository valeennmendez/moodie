import { sendEmailVerification } from "../services/brevo.js";

export const sendEmailCode = async (code, name, email) => {
  try {
    const resEmail = await sendEmailVerification(name, code, email);

    if (!resEmail) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error in sendEmailCode: ", error);
    return false;
  }
};
