// signup form selects
var usernameSignup = document.querySelector("#newUser-name");
var emailSignup = document.querySelector("#newUser-email");
var newPassword = document.querySelector("#newUser-Password");
var signUpButton = document.querySelector("#signup-button");
var signUpSuccess = document.querySelector("#signup-success");
var greetings = document.querySelector("#greetings");
var logOutBtn = document.querySelector("#logOut");
var usernameSignUpRegex = /^[\w ]{3,}$/;
var emailSignupRegex =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
// -----------------------------------------------------------

// signin form selects
var signinEmail = document.querySelector("#signin-Email");
var signinPassword = document.querySelector("#signIn-Password");
var loginButton = document.querySelector("#login-button");
var img = document.querySelector("#signInPic");
var loggedInUser;
var username = signinEmail?.value;
// ------------------------------------------------------------

var usersContainer = JSON.parse(localStorage.getItem("users")) || [];


/* attach click event to sign up button*/
signUpButton?.addEventListener("click", signUp);

/* this function creates user Object ,push user object to the array , stores the data in local storage */
function signUp() {
  function findEmail(user){
    return user.email === emailSignup.value
  }

  var userExists = usersContainer.find(
    findEmail
  );
  if (!usernameSignup.value || !emailSignup.value || !newPassword.value) {
    alert("Please fill in all fields.");
  } else if (!usernameSignUpRegex.test(usernameSignup.value)) {
    alert("Please enter a valid username.");
  } else if (!emailSignupRegex.test(emailSignup.value)) {
    alert("Please enter a valid email.");
  } else if(userExists){
    alert("email already exist");
  } else {
    var user = {
      username: usernameSignup.value,
      email: emailSignup.value,
      password: newPassword.value,
    };
    usersContainer.push(user);

    localStorage.setItem("users", JSON.stringify(usersContainer));
    clear();
    showDiv();
  }
}

/* attach click event to login button*/
loginButton?.addEventListener("click", overRide);

/* this function redirect to home Page if the email and password are correct*/
function overRide() {
  for (var i = 0; i < usersContainer.length; i++) {
    
    if (
      signinEmail.value === usersContainer[i].email &&
      signinPassword.value === usersContainer[i].password
    ) {
      location.href = "homePage.html";
      break;
    } else {
      alert("username or password is incorrect");
      break;
    }
  }
//  greetings.innerHTML = "hello" + " " + signinEmail.value;
 loggedInUser = usersContainer[i].username;
console.log(loggedInUser);
  
}

function clear() {
  usernameSignup.value = "";
  emailSignup.value = "";
  newPassword.value = "";
}

signinEmail?.addEventListener("focus", function () {
  img.setAttribute("src", "images/username-input.gif");
});

signinPassword?.addEventListener("focus", function () {
  img.setAttribute("src", "images/password-input.gif");
});

function showDiv() {
  signUpSuccess.classList.replace("d-none", "d-block"); // Set the display property to "flex" = "flex";
}

function logOut() {
  location.href = "index.html";
}

logOutBtn?.addEventListener("click", logOut);

