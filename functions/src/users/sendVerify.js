import * as functions from "firebase-functions";
const config = require("../../config");
const cors = require("cors")({origin: true});
export const sendVerify = functions.https.onRequest((request, response)=>{
  cors(request, response, () => {
    const phNumber = request.body.phNumber;
    const accountSid = config.TWILIO_ACCOUNT_SID;
    const authToken = config.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2.services("VA47cf5adc94a7ab2153c2d46b743a0ce1")
        .verifications
        .create({to: phNumber, channel: "sms"})
        .then((verification) => {
          console.log(verification.sid);
          response.send(verification.sid);
        })
        .catch((e) => {
          console.log(e);
          response.status(500).send(e);
        });
  });
});
