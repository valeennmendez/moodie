import brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEY = process.env.BREVO_SECRET;
const EMAIL = process.env.PERSONAL_EMAIL;
const templatePath = path.resolve(
  __dirname,
  "..",
  "email-template",
  "template.html"
);

export const sendEmailVerification = async (name, code, email) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, KEY);

    const sendSmptEmail = new brevo.SendSmtpEmail();
    let html = await fs.readFile(templatePath, "utf-8");
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
