let usernames = document.querySelector("#username");
let passwords = document.querySelector("#password");
let login_btn = document.querySelector("#sigin_in");

let getusername = localStorage.getItem("usernames");
let getpassword = localStorage.getItem("passwords");

login_btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (usernames.value === "" || passwords.value === "") {
    alert("please fill data");
  } else {
    if (
      getusername &&
      getusername.trim() === usernames.value.trim() &&
      getpassword &&
      getpassword.trim() === passwords.value.trim()
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("wrong pass or email");
    }
  }
});
