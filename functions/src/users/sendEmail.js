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
      templateId: "d-23d9069634bd45c5999a2c909c0cd77f",
      dynamicTemplateData: {
        name: firstName,
      },
    };

    if (user.type === "recruiter") {
      msg.templateId = "d-06e7b7cfae3c4d838f558c24e5023058";
    }
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
      .onCreate((notification, event) => {
        // ID of newly created document
        const userId = event.params.userId;
        // Retrieve value from notification data
        const {body, title, link} = notification.data();

        const buttonHash = {
          ["Candidate has Applied on Website"]: "View their profile!",
          ["New Candidate Interest"]: "View their profile!",
          ["Mutual Interest Received"]: "Reach out to this candidate!",
          ["Interest Rejected"]: "Manage your job queue",
          ["Recruiter Has Withdrawn Their Interest"]: "Manage your job queue",
          ["A Company Has Expressed Interest in You"]: "Manage your job queue",
        };

        return admin
            .firestore().collection("users").doc(userId).get().then((user)=>{
              const {email, firstName} = user.data();
              const msg ={
                to: email,
                from: "steven@joineven.io",
                templateId: "d-bb636e69a03841b8bf0858fcd4b1cc53",
                dynamicTemplateData: {
                  name: firstName,
                  subject: title,
                  body,
                  preheader: body,
                  link,
                  button: buttonHash[title],
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
