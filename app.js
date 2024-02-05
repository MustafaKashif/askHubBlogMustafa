import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZERS7HfyxL2uLNIE-pWsHEgKPGQCl8bU",
  authDomain: "askhubblogmustafa.firebaseapp.com",
  projectId: "askhubblogmustafa",
  storageBucket: "askhubblogmustafa.appspot.com",
  messagingSenderId: "542998773984",
  appId: "1:542998773984:web:ea276d579ecc29ebaed085",
  measurementId: "G-MEQPQTKRQG",
};

//! Database configuration essentials
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

//! To get the current path of the page in string format
const currentPageName = window.location.pathname.split("/").pop();

//! Just declared a variable for use in authStateChanged Function
let photoUrl;

//! For the displaying of image in Navbar
let imageDisplay = document.getElementById("imageDisplay");
// let nameOfUser = document.getElementById("nameOfUser").value;

//! For the email and passowrd required for login and signup
let email = document.getElementById("emailOfUser");
let password = document.getElementById("passwordOfUser");

//! SignUp Button
let signupButton = document.getElementById("signupButton");

//! Navbar login and logout Buttons
let loginButton = document.getElementById("loginButton");
let logoutButton = document.getElementById("logOutButton");

//! login Page email and google login buttons
let googleLogin = document.getElementById("loginWithGoogle");
let emailLogin = document.getElementById("loginButtonEmail");

//! For the displaying of userName and email on the HomePage
let userName = document.getElementById("userName");
let userEmail = document.getElementById("emailUser");

//! For moving between Login and signUp Pages
let signUpPage = document.getElementById("signupPage");
let loginPage = document.getElementById("loginPage");

//! Write Button of Home Page
let writeButton = document.getElementById("writeButton");

let imageSrc = "https://icon-library.com/images/guest-account-icon/guest-account-icon-6.jpg";

// const newUser = {
//    Email: email,
//    Password: password,
//    Name: nameOfUser,
//  };

//! Crucial and the most important function for checking whether user is logged in or not
const init = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (currentPageName !== "index.html") {
        window.location.href = "index.html";
      }
      console.log(user);
      photoUrl = user.photoURL;
      imageDisplay.src = photoUrl;
      if (user.displayName === null) {
        // userName.innerHTML = nameOfUser.value
        userName.innerHTML = user.displayName;
        userEmail.innerText = user.email;
        if(photoUrl === null){
          imageDisplay.src = imageSrc;
        }
      } else {
        userName.innerText = user.displayName;
        userEmail.innerText = user.email;
        writeButton.style.display = "inline-block";
        if(photoUrl === null){
          imageDisplay.src = imageSrc;
        }
      }
    } else {
      if (
        currentPageName !== "index.html" &&
        currentPageName !== "login.html" &&
        currentPageName !== "signup.html" &&
        currentPageName !== ""
      ) {
        window.location.href = "login.html";
      }
      console.log("User Is not Logged In!");
      writeButton.style.display = 'none'; 
    }
  });
};

init();

//! Login using google function
const signUpWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};


//! Login using email and password
const loginWithEmailAndPassword = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

//! Signup with email and password
const signUpwithEmail = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  if (auth().user !== null) {
    auth()
      .user.updateProfile({
        displayName: document.getElementById("nameOfUser").value,
      })
      .then(
        function () {
          console.log("Updated");
        },
        function (error) {
          console.log("Error happened");
        }
      );
  }
};


//! Logging out from the profiile
const logOutFromProfile = () => {
  signOut(auth)
    .then(() => {
      console.log("User is logged Out Successfully !");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};



// const moveTosignUpPage = () => {
//   if (currentPageName !== "signup.html") {
//     window.location.href = "signup.html";
//   }
// };


loginButton &&
  loginButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
logoutButton &&
  logoutButton &&
  logoutButton.addEventListener("click", logOutFromProfile);
googleLogin &&
  googleLogin &&
  googleLogin.addEventListener("click", signUpWithGoogle);
signupButton &&
  signupButton &&
  signupButton.addEventListener("click", signUpwithEmail);
signUpPage &&
  signUpPage &&
  signUpPage.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
loginPage &&
  loginPage &&
  loginPage.addEventListener("click", () => {
    window.location.href = "login.html";
  });
emailLogin &&
  emailLogin &&
  emailLogin.addEventListener("click", loginWithEmailAndPassword);
