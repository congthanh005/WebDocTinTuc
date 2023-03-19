"use strict";
//lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key);
}
