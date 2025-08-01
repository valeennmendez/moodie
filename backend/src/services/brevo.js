import brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const KEY = process.env.BREVO_SECRET;
const EMAIL = process.env.PERSONAL_EMAIL;

export const sendEmailVerification = async (name, code, email) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, KEY);

    const sendSmptEmail = new brevo.SendSmtpEmail();
    let html = await fs.readFile("../email-template/template.html", "utf-8");
    html = html.replace("{{nombre}}", name).replace("{{code}}", code);
    sendSmptEmail.subject = "Moodie - Código de verificación";
    sendSmptEmail.to = [{ email: email, name: name }];
    sendSmptEmail.htmlContent = html;
    sendSmptEmail.sender = {
      name: "Moodie",
      email: EMAIL,
    };

    const result = await apiInstance.sendTransacEmail(sendSmptEmail);

    return result;
  } catch (error) {
    console.log("Error in sendEmailVerification: ", error);
  }
};

//TENGO QUE HACER UNA FUNCION PARA PODER UTILIZARLA AL REGISTRAR UN USUARIO.
