import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!);

// Fix private key newline issue (important)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});


export async function addUserToSheet(
  name: string,
  email: string,
  phone: string
) {
  const client = await auth.getClient();
console.log("client", process.env.SHEET_ID);
  const sheets = google.sheets({
    version: "v4",
    auth: client as any,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, phone]],
    },
  });
}
