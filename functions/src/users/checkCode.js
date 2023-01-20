import * as functions from "firebase-functions";
const config = require("../../config");
const cors = require("cors")({origin: true});
export const checkCode = functions.https.onRequest((request, response)=>{
  cors(request, response, () => {
    const accountSid = config.TWILIO_ACCOUNT_SID;
    const authToken = config.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    console.log(request.body.phNumber);
    console.log(request.body.passcode);
    client.verify.v2.services("VA47cf5adc94a7ab2153c2d46b743a0ce1")
        .verificationChecks
        .create({to: request.body.phNumber, code: request.body.passcode})
        .then((verificationCheck) => {
          console.log("****statement above***");
          console.log(verificationCheck.status);
          console.log("****statement below***");
          response.send(verificationCheck.status);
        })
        .catch((e) => {
          console.log(e);
          response.status(500).send(e);
        });
  });
});
