const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const sgMail = require("@sendgrid/mail");

const {
  apikey,
  authdomain,
  projectid,
  storagebucket,
  messagingsenderid,
  appid,
  measurementid,
} = functions.config().fbconfig;
const firebaseConfig = {
  apiKey: apikey,
  authDomain: authdomain,
  projectId: projectid,
  storageBucket: storagebucket,
  messagingSenderId: messagingsenderid,
  appId: appid,
  measurementId: measurementid,
};

admin.initializeApp(firebaseConfig);
sgMail.setApiKey(functions.config().sendgrid.key);

export const sendEmail = functions.auth.user().onCreate((user) =>{
  return admin.firestore().collection("users").doc(user.uid).get().then((doc)=>{
    const userInfo = doc.data();
    const {email, firstName} = userInfo;
    logger.log(email);
    const msg ={
      to: email,
      from: "steven@joineven.io",
      templateId: "d-d13743cc0992434d837facc26ce01ce2",
      dynamicTemplateData: {
        name: firstName,
      },
    };
    sgMail
        .send(msg)
        .then((response) => {
          logger.log(response[0].statusCode);
          logger.log(response[0].headers);
        })
        .catch((error) => {
          logger.error(error);
        });
  });
});

export const sendNotificationEmail =
  functions.firestore
      .document("users/{userId}/notifications/{notificationId}")
      .onCreate((event) => {
        // If we set `/users/marie/incoming_messages/134` to {body: "Hello"}
        // event.params.userId == "marie";
        // event.params.notificationId == "134";
        // ... and ...
        // event.data.after.data() == {body: "Hello"}
        const userId = event.params.userId;
        return admin
            .firestore().collection("users").doc(userId).get().then((doc)=>{
              const userInfo = doc.data();
              const {email, firstName} = userInfo;
              logger.log(email);
              const msg ={
                to: email,
                from: "steven@joineven.io",
                templateId: "d-d13743cc0992434d837facc26ce01ce2",
                dynamicTemplateData: {
                  name: `${firstName} notification email test`,
                },
              };
              sgMail
                  .send(msg)
                  .then((response) => {
                    logger.log(response[0].statusCode);
                    logger.log(response[0].headers);
                  })
                  .catch((error) => {
                    logger.error(error);
                  });
            });
      });
