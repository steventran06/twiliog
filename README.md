# Getting Started with Twiliog React App


## Available Scripts

In the project directory, you can run:

### `npm install -g npm`

Clone the git repo or download it.

Navigate to the project folder.

Install the dependencies

### `npm install`

Start up the frontend with:

### `npm start`

## Setting Up Firebase 

Install firebase CLI

### `npm install -g firebase-tools`

**Firebase login**

```
firebase login
firebase projects:list

```


Can then deploy with the following from the Twiliog folder:

### `npm run functions:deploy`


Display firebase logs with:

### `firebase functions:log`


Install cors in the functions folder

```
cd functions
npm install cors

```

## Firebase Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /blogs/{blog}{
      allow read, write: if request.auth.uid != null
      }
      match /users/{userId}{
        allow create
        allow read: if request.auth.uid != null
        allow write: if request.auth.uid == userId
      }
  }
}

```

## Sendgrid 
https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs

```
cd functions
npm install --save @sendgrid/mail

```

Create a config.js file under function with

```
require("dotenv").config();

module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};

```

Create a .env file under functions with the SendGrid API key:

```
SENDGRID_API_KEY=SG.xyz
```

```
Install dotenv
cd functions
npm install dotenv
```

## Verify API
Update the Verify service in the functions
There are two functions that we’ll use. One sends the verification code to the user, and the other checks the verification code provided by the user. In these two functions, we need to update the verify service with the service ID of the service you created in the prerequisites. 

In Twiliog > functions > src > users > sendVerify.js, update the verify service ID  in the API call:
```client.verify.v2.services("VA…")```


In Twiliog > functions > src > users > checkCode.js, update the verify service ID in the API call:
```client.verify.v2.services("VA…")```


Update the Twilio config information
In Twiliog > functions > src > .env, update the environment variables with your Twilio credentials:

```
TWILIO_ACCOUNT_SID=AC…
TWILIO_AUTH_TOKEN=...
```

Update the Firebase config information
In Twiliog > src > config > fbConfig.js file. Update the firebaseConfig settings with your own project info:

```
const firebaseConfig = {
 apiKey: "...",
 authDomain: "...",
 projectId: "...",
 storageBucket: "...",
 messagingSenderId: "...",
 appId: "...",
 measurementId: "..."
};
```

Deploy the functions
Navigate back to your Twilio folder from the functions folder.
```cd ..```


To deploy the functions (one used to send the Verify OTP code, one used to check the code) to Firebase functions:
### `npm run functions:deploy`


This will take awhile but after they’re deployed, you’ll see the URL for the functions in the console. Note the URLs. We’ll need to update our frontend code with these.

In Twiliog > src > action > authActions.js,
In the verify action, update the checkCode URL with the one you received when you deployed the functions:
```
axios.post("https://us-central1-yourprojectname.cloudfunctions.net/default-checkCode", userInfo, axiosConfig)
```


In the signUp action, update the sendVerify URL with the one you received when you deployed the functions:
```
axios.post("https://us-central1-yourprojectname.cloudfunctions.net/default-sendVerify", newUser, axiosConfig)
```


If anything goes wrong, you can view the firebase logs with:
### `firebase functions:log`




