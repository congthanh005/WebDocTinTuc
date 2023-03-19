"use strict";
//tạo class user
class User {
  constructor(firstName, lastName, UserName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.UserName = UserName;
    this.passWord = passWord;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

class Settings {
  constructor(newsPerPage, newsCategory) {
    this.newsPerPage = newsPerPage;
    this.newsCategory = newsCategory;
  }
}

//đăng nhập để sử dụng todoList
// let currentUser;

// const currentUser_storage = "currentuser_array";

// const currentUserArrayFromStorage = getFromStorage(currentUser_storage);

// const currentUser = JSON.parse(currentUserArrayFromStorage);

// if (currentUser == []) {
// } else {
//   alert("Đăng nhập để sử dụng chức năng Todo List!");
//   console.log("ád");

//   currentUser = [];
// }
