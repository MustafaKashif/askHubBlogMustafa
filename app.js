import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

//! Firebase authentication

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

//! Firestore Database configuration

import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const db = getFirestore(app);

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
let writingPost = document.getElementById("writingPost");

let imageSrc =
  "https://icon-library.com/images/guest-account-icon/guest-account-icon-6.jpg";

//! Post Related Content
let publishButton = document.getElementById("submitButton");
let displayPost = document.getElementById("allPosts");
let viewFullPage = document.getElementById("viewFullPage");


//! Uploading Data to the Firesore
const uploadingDataInFireStore = async () => {
  let postTitle = document.getElementById("titleOfPost").value;
  let postEmail = document.getElementById("email").value;
  let postPublish = document.getElementById("publishDate").value;
  let readingTime = document.getElementById("readingTime").value;
  let postCategory = document.getElementById("categoryOfBlog").value;
  let contentOfPost = document.getElementById("contentOfPost").value;

  const idForDb = new Date().getTime();
  const payload = {
    Id: idForDb,
    title: postTitle,
    publishDate: postPublish,
    email: postEmail,
    readTime: readingTime,
    category: postCategory,
    content: contentOfPost,
  };
  await setDoc(doc(db, "posts", `${idForDb}`), payload);
  alert("Post Added Successfully !");
  console.log(payload);
};

publishButton &&
  publishButton &&
  publishButton.addEventListener("click", uploadingDataInFireStore);

//! Getting data from the database

const fetchingDataFromFireStore = async () => {
  let itemCollection = "";
  const q = query(collection(db, "posts"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    console.log(posts);
    itemCollection = posts
      .map(
        (collectionOfposts) =>
          ` <a
            href="#"
            class="relative block overflow-hidden rounded-lg border border-black p-4 sm:p-6 lg:p-8 m-5 shadow-xl"
          >
            <span
              class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>
    
            
            <div class="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 class="text-lg font-bold text-indigo-600 sm:text-xl">
                  ${collectionOfposts.title}
                </h3>
    
                <p class="mt-1 text-xs font-medium text-white">${collectionOfposts.email}</p>
              </div>
    
              <div class="hidden sm:block sm:shrink-0">
                <img
                  alt="Paul Clapton"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  class="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
    
            <div class="mt-4">
              <p class="max-w-[40ch] text-sm text-black">
                ${collectionOfposts.content}
              </p>
            </div>
    
            <dl class="mt-6 flex gap-4 sm:gap-6">
              <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-gray-400">Published</dt>
                <dd class="text-xs text-base-200">${collectionOfposts.publishDate}</dd>
              </div>
    
              <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-gray-400">Reading time</dt>
                <dd class="text-xs text-base-200">${collectionOfposts.readTime}</dd>
              </div>
            </dl>
            <br/>
            <button
            type="button"
            class="block w-full rounded-lg px-5 py-3 text-sm font-medium text-white btn btn-outline btn-success"
            id="fullPost"
            onclick = "seefullPost('${collectionOfposts.Id}, ${collectionOfposts.content}, ${collectionOfposts.title}, ${collectionOfposts.readTime}, ${collectionOfposts.publishDate}, ${collectionOfposts.email}')";
            >
            View Full Post
          </button>
          </a>`
      )
  
    window.seefullPost = (id, content, title, readtime, publishDate, email) => {
      if(currentPageName !== "fullPost.html"){
      // window.location.href = "fullPost.html"
      }
console.log(id)
  }
    // displayTodo.style.display = "block";
    displayPost.innerHTML = itemCollection;
  });
};

fetchingDataFromFireStore();
// const newUser = {
//    Email: email,
//    Password: password,
//    Name: nameOfUser,
//  };

//! Crucial and the most important function for checking whether user is logged in or not
const init = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // if (currentPageName !== "index.html") {
      //   window.location.href = "index.html";
      // }
      console.log(user);
      photoUrl = user.photoURL;
      imageDisplay.src = photoUrl;
      if (user.displayName === null) {
        // userName.innerHTML = nameOfUser.value
        userName.innerHTML = user.displayName;
        userEmail.innerText = user.email;
        if (photoUrl === null) {
          imageDisplay.src = imageSrc;
        }
      } else {
        userName.innerText = user.displayName;
        userEmail.innerText = user.email;
        writeButton.style.display = "inline-block";
        if (photoUrl === null) {
          imageDisplay.src = imageSrc;
        }
      }
    } else {
      if (
        currentPageName !== "index.html" &&
        currentPageName !== "login.html" &&
        currentPageName !== "signup.html" &&
        currentPageName !== "writePost.html" &&
        currentPageName !== ""
      ) {
        window.location.href = "login.html";
      }
      console.log("User Is not Logged In!");
      writeButton.style.display = "none";
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
writingPost &&
  writingPost &&
  writingPost.addEventListener("click", () => {
    window.location.replace("writePost.html");
  });
