"use strict";
let userArr;
//tạo biến đã đăng nhập
let currentUser;
const user_storage = "user_array";
const currentUser_storage = "currentuser";

const UserArrayFromStorage = getFromStorage(user_storage);

if (UserArrayFromStorage) {
  userArr = JSON.parse(UserArrayFromStorage);
} else {
  userArr = [];
}

const idUserName = document.getElementById("input-username");
const idPassword = document.getElementById("input-password");

const clearInput = function () {
  idUserName.value = "";
  idPassword.value = "";
};

const onSubmitLogin = () => {
  const loginData = {
    UserName: idUserName.value,
    Password: idPassword.value,
  };

  if (!loginData?.UserName) {
    alert("Please input for User Name");
    return;
  }

  if (!loginData?.Password) {
    alert("Please input for Password");
    return;
  } else if (loginData.Password < 8) {
    alert("Password must be more than 8 characters");
    return;
  }

  const i = userArr.findIndex((item) => item.UserName === loginData.UserName);
  const j = userArr.findIndex((item) => item.Password === loginData.Password);

  if (i === -1) {
    alert("The specified account does not exist. Please register!");
    return;
  }

  if (j === -1) {
    alert("Password is false!");
    return;
  }

  // nếu ko có vấn đề validate
  // thì đăng nhập và thêm data vào biến người dùng hiện tại
  currentUser = loginData;

  // Xóa bỏ dữ liệu đã nhập sau khi dữ liệu được lấy
  clearInput();

  //lưu currentuser vào LocalStorage
  saveToStorage(currentUser_storage, JSON.stringify(currentUser));
  window.location.href = "../index.html";
};

document.querySelector("#btn-submit").addEventListener("click", onSubmitLogin);
