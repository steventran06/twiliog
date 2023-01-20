import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const sgMail = require("@sendgrid/mail");
const config = require("../../config");
sgMail.setApiKey(config.SENDGRID_API_KEY);
export const sendEmail = functions.auth.user().onCreate((user) =>{
  return admin.firestore().collection("users").doc(user.uid).get().then((doc)=>{
    const userInfo =doc.data();
    const {email} = userInfo;
    console.log(email);
    const msg ={
      to: email,
      from: "yitpoojas@gmail.com",
      templateId: "d-2dc97740d02b42fda252048dd1547dab",
    };
    sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        });
  });
});
