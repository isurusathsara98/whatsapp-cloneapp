import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCGOZHWODE1iwjy5pm6XPwhUOeA8bobqaA",
    authDomain: "whatapp-clone-8e8ec.firebaseapp.com",
    databaseURL: "https://whatapp-clone-8e8ec.firebaseio.com",
    projectId: "whatapp-clone-8e8ec",
    storageBucket: "whatapp-clone-8e8ec.appspot.com",
    messagingSenderId: "53862056649",
    appId: "1:53862056649:web:9cf08c494f64bf5e840318",
    measurementId: "G-VTF218RNY1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;