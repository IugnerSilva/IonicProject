import * as admin from 'firebase-admin'
import * as serviceAccount from '/path/to/serviceAccountKey.json'

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://banco-63cd8.firebaseio.com"
});