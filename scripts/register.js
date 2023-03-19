"use strict";
//lấy dữ liệu người dùng
let userArr;
const user_storage = "user_array";

const UserArrayFromStorage = getFromStorage(user_storage);

if (UserArrayFromStorage) {
  userArr = JSON.parse(UserArrayFromStorage);
} else {
  userArr = [];
}
console.log("userArr", userArr);
const idFirstName = document.getElementById("input-firstname");
const idLastName = document.getElementById("input-lastname");
const idUserName = document.getElementById("input-username");
const idPassword = document.getElementById("input-password");
const idPasswordConfirm = document.getElementById("input-password-confirm");

//tạo clearinput
const clearInput = function () {
  idFirstName.value = "";
  idLastName.value = "";
  idUserName.value = "";
  idPassword.value = "";
  idPasswordConfirm.value = "";
};

//xử lý sự kiện ấn nút register
const onSubmitRegister = () => {
  const userData = {
    FirstName: idFirstName.value,
    LastName: idLastName.value,
    UserName: idUserName.value,
    Password: idPassword.value,
    PasswordConfirm: idPasswordConfirm.value,
  };
  if (!userData?.FirstName) {
    alert("Please input for First Name");
    return;
  }
  if (!userData?.LastName) {
    alert("Please input for Last Name");
    return;
  }
  if (!userData?.UserName) {
    alert("Please input for User Name");
    return;
  }
  // tìm các giá trị username bị trùng
  const existIndexUserName = userArr.findIndex(
    (item) => item.UserName === userData.UserName
  );
  if (existIndexUserName > -1) {
    alert("UserName must unique!");
    return;
  }
  if (!userData?.Password) {
    alert("Please input for Password");
    return;
  } else if (userData.Password.length < 8) {
    alert("Password must be more than 8 characters");
    return;
  }
  if (!userData?.PasswordConfirm) {
    alert("Please input for Confirm Password ");
    return;
  } else if (userData.PasswordConfirm !== userData.Password) {
    alert("Confirm Password must be same password");
    return;
  }

  // nếu ko có vấn đề validate
  // thêm data vào userArray
  userArr.push(userData);

  // Xóa bỏ dữ liệu đã nhập sau khi dữ liệu được lấy
  //clearInput được nhập bên storage.js
  clearInput();

  //sau khi thêm user mới thì lưu trở lại vào LocalStorage
  saveToStorage(user_storage, JSON.stringify(userArr));
  console.log("userArray = ", userArr);
  window.location.href = "../pages/login.html";

  function parseUser(userData) {
    const user = new User(
      userData.firstname,
      userData.lastname,
      userData.username,
      userData.password
    );
    console.log("user", user);
    return user;
  }
};

document
  .querySelector("#btn-submit")
  .addEventListener("click", onSubmitRegister);
