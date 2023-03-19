"use strict";

const btnAddTodo = document.querySelector("#btn-add");
const inputTask = document.querySelector("#input-task");
const todoList = document.querySelector("#todo-list");
//lấy thông tin biến đã đăng nhập
let currentUser;
let todoArr;
const currentUser_storage = "currentuser";

const currentUserFromStorage = getFromStorage(currentUser_storage);
if (!currentUserFromStorage) {
  alert("Please Log in to use Todo List!");
}

if (currentUserFromStorage) {
  currentUser = JSON.parse(currentUserFromStorage);
}

const task_storage = currentUser?.UserName + "_" + "task_array";

const taskArrayFromStorage = getFromStorage(task_storage);

if (taskArrayFromStorage) {
  todoArr = JSON.parse(taskArrayFromStorage);
} else {
  todoArr = [];
}

renderTableData(todoArr);

//clear input
const clearInputTask = function () {
  inputTask.value = "";
};

function renderTableData(_array) {
  if (!_array || !_array.length) {
    todoList.innerHTML = "";
    return;
  }
  // console.log("currentUser", currentUser);
  //tìm ra các task có nội dung giống với tên người dùng
  const taskCurrentUser = _array.filter(
    (item) => item.owner === currentUser?.UserName || ""
  );
  let html = "";
  const htmlIconDone =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="check size-check"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>';

  for (let i = 0; i < taskCurrentUser.length; i++) {
    const currentTask = taskCurrentUser[i];

    html += `
    <li class="check-task ${currentTask?.isDone ? "text-decoration" : ""}">
    <div onClick="onPressTodo('${currentTask.id}')">
      ${currentTask?.isDone ? htmlIconDone : ""}
      ${currentTask.task}
    </div>
    <span class="close" onClick="onDelete('${currentTask.id}')">×</span>
    </li>
    `;
  }
  todoList.innerHTML = html;
}

btnAddTodo.addEventListener("click", function () {
  if (!currentUser) {
    alert("Please login first");
    return;
  }

  const taskContent = {
    id: `${new Date().getTime()}`,
    task: inputTask.value,
    owner: `${currentUser?.UserName || ""}`,
    isDone: false,
  };
  if (!taskContent?.task) {
    alert("Please input the Todolist");
    return;
  }
  // thêm taskContent vào todoArr
  todoArr.push(taskContent);

  // Xóa bỏ dữ liệu đã nhập sau khi dữ liệu được lấy
  clearInputTask();
  renderTableData(todoArr);
  //sau khi thêm task mới thì lưu trở lại vào LocalStorage
  saveToStorage(task_storage, JSON.stringify(todoArr));
});

//đánh dấu task đó đã hoàn thành hay chưa hoàn thành
//khi ấn vào task

function onPressTodo(todoId) {
  const existIndex = (todoArr || []).findIndex((item) => item.id === todoId);

  if (existIndex > -1) {
    // check xem todo cos that su tồn tại
    todoArr[existIndex].isDone = !todoArr[existIndex].isDone;
    saveToStorage(task_storage, JSON.stringify(todoArr));
    renderTableData(todoArr);
  }
}

//xóa task
function onDelete(todoId) {
  // tim ra index can xoa

  const existIndex = todoArr.findIndex((item) => item.id === todoId);
  //confirm before deletePet
  if (existIndex > -1) {
    if (confirm("Are you sure?")) {
      todoArr.splice(existIndex, 1); // xóa tại vị trí currentIndex
      saveToStorage(task_storage, JSON.stringify(todoArr));
      renderTableData(todoArr);
    }
  }
}
