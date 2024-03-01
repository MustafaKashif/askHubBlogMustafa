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
  where,
  getFirestore,
  onSnapshot,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  getDoc,
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
let mainUserName;
let maindisplayPhoto;

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
let homePageButton = document.getElementById("homePage");

let getStarted = document.getElementById("startedButton");

let imageSrc =
  "https://icon-library.com/images/guest-account-icon/guest-account-icon-6.jpg";

//! Post Related Content
let publishButton = document.getElementById("submitButton");
let displayPost = document.getElementById("allPosts");

//! Uploading Data to the Firesore
const uploadingDataInFireStore = async () => {
  let postTitle = document.getElementById("titleOfPost").value;
  let postEmail = document.getElementById("email").value;
  let postPublish = document.getElementById("publishDate").value;
  let readingTime = document.getElementById("readingTime").value;
  let postCategory = document.getElementById("categoryOfBlog").value;
  let contentOfPost = document.getElementById("contentOfPost").value;
  let userName = document.getElementById("userName").value;

  //! Commenting related things
  // let commentValue = document.getElementById("OrderNotes").value;
  //! Converting Date into timestamp
  const idForDb = new Date().getTime();
  const payload = {
    Id: idForDb,
    nameOfUser: userName,
    title: postTitle,
    publishDate: postPublish,
    email: postEmail,
    readTime: readingTime,
    category: postCategory,
    content: contentOfPost,
    displayPhoto : maindisplayPhoto,
  };
  await setDoc(doc(db, "posts", `${idForDb}`), payload);
  alert("Post Added Successfully !");
  console.log(payload);
};
publishButton &&
  publishButton &&
  publishButton &&
  publishButton.addEventListener("click", uploadingDataInFireStore);

//! Getting data from the database

const fetchingDataFromFireStore = async () => {
  document.addEventListener("DOMContentLoaded", function () {
    let itemCollection = "";
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      console.log(posts);

      //! Getting and manipulating input search from the user

      let inputFromSearch = document.getElementById("searchInput");
      const searchFunction = () => {
        const inputValue = inputFromSearch.value.toLowerCase();
        console.log(inputFromSearch.value);
        posts.filter(async (collectionOfposts) => {
          if (inputValue.trim()) {
            if (collectionOfposts.title.toLowerCase().includes(inputValue)) {
              const docRef = doc(db, "posts", `${collectionOfposts.Id}`);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                displayPost.style.display = "block";
                displayPost.innerHTML = ` <a
              href="#"
              class="relative block overflow-hidden rounded-lg border border-black p-4 sm:p-6 lg:p-8 m-5 mb-1 shadow-xl"
            >
              <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              ></span>
      
              
              <div class="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 class="text-lg font-bold text-indigo-600 sm:text-xl">
                    ${docSnap.data().title}
                  </h3>
      
                  <p class="mt-1 text-xs font-medium text-white">${
                    docSnap.data().email
                  }</p>
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
                 <h3 class = "text-indigo-600"> ${
                   docSnap.data().nameOfUser
                 } <h3> | <span class = "text-base-200"> ${
                  collectionOfposts.email
                } </span>
                </p>
              </div>
      
              <dl class="mt-6 flex gap-4 sm:gap-6">
                <div class="flex flex-col-reverse">
                  <dt class="text-sm font-medium text-gray-400">Published</dt>
                  <dd class="text-xs text-base-200">${
                    docSnap.data().publishDate
                  }</dd>
                </div>
      
                <div class="flex flex-col-reverse">
                  <dt class="text-sm font-medium text-gray-400">Reading time</dt>
                  <dd class="text-xs text-base-200">${
                    docSnap.data().readTime
                  }</dd>
                </div>
              </dl>
              <br/>
              <button
              type="button"
              class="block w-full rounded-lg px-5 py-3 text-sm font-medium text-white btn btn-outline btn-success"
              id="fullPost"
              onclick = "seefullPost('${docSnap.data().Id}', '${
                  docSnap.data().title
                }', '${docSnap.data().nameOfUser}', '${
                  docSnap.data().email
                }', '${docSnap.data().readTime}', '${
                  docSnap.data().publishDate
                }', '${docSnap.data().content}')";
              >
              View Full Post
            </button>
            </a>`;
                console.log("Document data:", docSnap.data());
              } else {
                alert("No such Post !");
              }
            }
          } else {
            window.location.reload();
          }
        });
      };
      inputFromSearch &&
        inputFromSearch &&
        inputFromSearch.addEventListener("keyup", searchFunction);

      //! Mapping all the posts on the main Page
      itemCollection = posts.map(
        (collectionOfposts) =>
          ` <a
            href="#"
            class="relative block overflow-hidden rounded-lg border border-black p-4 sm:p-6 lg:p-8 m-5 mb-1 shadow-xl"
          >
            <span
              class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>
    
            
            <div class="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 class="text-lg font-bold text-indigo-600 sm:text-xl">
                  ${collectionOfposts.title}
                </h3>
    
                <p class="mt-1 text-xs font-medium text-sky-500">${collectionOfposts.email}</p>
              </div>
    
              <div class="hidden sm:block sm:shrink-0">
                <img
                  alt="Paul Clapton"
                  src="${collectionOfposts.displayPhoto}"
                  class="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
    
            <div class="mt-4">
              <p class="max-w-[40ch] text-sm text-black">
               <h3 class = "text-indigo-600"> ${collectionOfposts.nameOfUser} <h3> | <span class = "text-base-400"> ${collectionOfposts.email} </span>
              </p>
            </div>
    
            <dl class="mt-6 flex gap-4 sm:gap-6">
              <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-base-600">Published</dt>
                <dd class="text-xs text-base-200">${collectionOfposts.publishDate}</dd>
              </div>
    
              <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-base-600">Reading time</dt>
                <dd class="text-xs text-base-200">${collectionOfposts.readTime}</dd>
              </div>
            </dl>
            <br/>
            <button
            type="button"
            class="block w-full rounded-lg px-5 py-3 text-sm font-medium text-white btn btn-outline btn-success"
            id="fullPost"
            onclick = "seefullPost('${collectionOfposts.Id}', '${collectionOfposts.title}', '${collectionOfposts.nameOfUser}', '${collectionOfposts.email}', '${collectionOfposts.readTime}', '${collectionOfposts.publishDate}', '${collectionOfposts.content}', '${collectionOfposts.comments}')";
            >
            View Full Post
          </button>
          </a>`
      );
      displayPost.style.display = "block";
      displayPost.innerHTML = itemCollection;
      window.seefullPost = function (
        id,
        title,
        userName,
        userEmail,
        readingTime,
        publishDate,
        postContent
      ) {
        let blogsDisplay = document.getElementById("showingPosts");
        console.log("ye function to chal raha hai");
        if (blogsDisplay) {
          displayPost.style.display = "none";
          blogsDisplay.style.display = "block";
          console.log(
            "Brother mein to chal raha hun Allah jane display kyun nahi araha hai"
          );
          blogsDisplay.innerHTML = `
    <section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
            ${title}
          </h2>
    
          <p class="hidden text-gray-500 md:mt-4 md:block">
            Author's Name : <b>${userName}</b>
            <br/>
            Author's Email : <b>${userEmail}</b>
            <br/>
            Reading Time : <b>${readingTime}</b>
            <br/>
            publish Date : <b>${publishDate}</b>
            <br/>
            <br/>
            <span class = "text-indigo-600 m-3">Content of the Post</span>
            <br/>
            <br/>
            <b class = "text-base-600">${postContent}</b>
            <br/>
            <br/>
<div>
  <label for="OrderNotes" class="sr-only">Order notes</label>
  <div
    class="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-xl focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <textarea
      id= "OrderNotes"
      class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm bg-white p-4"
      rows="4"
      placeholder="Comment or Ask Anything you want to ?"
    ></textarea>

    <div class="flex items-center justify-end gap-2 bg-white p-3">
      <button
        type="button"
        class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
        onclick = "clearAll()"
        >
        Clear
      </button>

      <button
        type="button"
        class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        onclick = "AddComments('${id}')"
        >
        Add
      </button>
    </div>
  </div>
</div>
<h1 class = "mt-3 text-base-600"><b>Comments</b></h1>
<div id = "commentBox" class = "mt-2">

              
</div>
          </p>
    
          <div class="mt-4 md:mt-8">
            <a
              onclick = "backToHome()"
              class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Back To HomePage
            </a>
          </div>
        </div>
      </div>
    
      <img
        alt=""
        src = "https://i.pinimg.com/originals/3a/2d/18/3a2d1887c04c541022449a57c7a30793.gif"
        class="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
      />
    </section>`;

          window.AddComments = async function (id) {
            let collectionOfreplies = "";
            let commentValue = document.getElementById("OrderNotes").value;
            let commentsDiv = document.getElementById("commentBox");
            console.log(id);
            if (commentValue.trim()) {
              const idd = new Date().getTime();
              const payload = {
                Id: idd,
                BlogId: id,
                nameOfUser: mainUserName,
                comments: commentValue,
                imageDisplay : maindisplayPhoto,
              };
              await setDoc(doc(db, `${id}`, `${idd}`), payload);
              console.log("replies added successfully");
              console.log(payload);

              const q = query(collection(db, `${id}`));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const replies = [];
                querySnapshot.forEach((doc) => {
                  replies.push(doc.data());
                });
                console.log(replies);
                // alert("comment Added !");
                if (id == id) {
                  collectionOfreplies = replies
                    .map(
                      (comment) =>
                        `<div class="chat chat-start">
                        <div class="chat-image avatar">
                          <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="${comment.imageDisplay == null ? comment.imageDisplay = "https://cdn.pixabay.com/photo/2023/10/03/10/49/anonymous-8291223_1280.png" : comment.imageDisplay }" />
                          </div>
                        </div>
                        <div class="chat-header text-base-400">
                          ${comment.nameOfUser == null ? comment.nameOfUser = "Anonymous"  : comment.nameOfUser }
                          <time class="text-xs opacity-50">${new Date().toTimeString()}</time>
                        </div>
                        <div class="chat-bubble">${comment.comments}</div>
                        <div class="chat-footer opacity-50">
                          Delivered
                        </div>
                      </div>
                      `
                    )
                    .join(" ");
                  commentsDiv.innerHTML = collectionOfreplies;
                }
              });
            } else {
              alert("Enter a valid Note !");
            }
          };

          window.clearAll = function () {
            let commentValue = document.getElementById("OrderNotes");
            commentValue.value = " ";
          };

          window.backToHome = function () {
            blogsDisplay.style.display = "none";
            displayPost.style.display = "block";
            console.log("Han bhai han jaraha hun yaar");
          };
          console.log("Load bhi horaha hai");
        } else {
          console.log("HTML ki file se masla araha hai");
        }
      };
    });
  });
};
fetchingDataFromFireStore();

//! Crucial and the most important function for checking whether user is logged in or not
const init = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      mainUserName = user.displayName;
      maindisplayPhoto = user.photoURL;
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
      if (currentPageName !== "index.html") {
        window.location.href = "index.html";
      }
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
      if (currentPageName !== "index.html") {
        window.location.href = "index.html";
      }
      email.value = " ";
      password.value = " ";
      alert(`Signed In as ${user.email}`);
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
      email.value = " ";
      password.value = " ";
      alert("Account created for " + user.email);
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
    window.location.href = "writePost.html";
  });

homePageButton &&
  homePageButton &&
  homePageButton.addEventListener("click", () => {
    if (currentPageName === "writePost.html") {
      window.location.href = "index.html";
    }
  });
getStarted &&
  getStarted &&
  getStarted.addEventListener("click", () => {
    window.location.href = "login.html";
  });
