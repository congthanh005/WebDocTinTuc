"use strict";
//lấy thông tin biến đã đăng nhập
let currentUser;
const currentUser_storage = "currentuser";

const currentUserFromStorage = getFromStorage(currentUser_storage);

if (!currentUserFromStorage) {
  // ẩn chữ Logout nếu chưa đăng nhập
  const mainContent = document.querySelector("#main-content");
  mainContent.style.display = "none";
} else {
  //lấy dữ liệu người dùng vừa đăng nhập
  currentUser = JSON.parse(currentUserFromStorage);
  console.log(currentUser);
  const loginModal = document.querySelector("#login-modal");
  //dùng innerHTML để thay thế toàn bộ nội dung thành welcome
  loginModal.innerHTML = `<p>Welcome ${currentUser?.UserName || ""} </p>`;
}

//thực hiện chức năng logout
const btn_Logout = document.querySelector("#btn-logout");
btn_Logout.addEventListener("click", function () {
  //xóa bỏ người dùng hiện tại
  currentUser = undefined;
  //lưu currentuser vào LocalStorage
  saveToStorage(currentUser_storage, "");

  btn_Logout.style.display = "none";
});
