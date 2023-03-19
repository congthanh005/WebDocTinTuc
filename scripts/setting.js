"use strict";
// lưu setting vào storage
let settingStorage;
const setting_storage = "setting";

const submitBtn = document.querySelector("#btn-submit");
const inputPageSize = document.querySelector("#input-page-size");
const inputCategory = document.querySelector("#input-category");

//clear input
const clearInputSetting = function () {
  inputPageSize.value = "";
  inputCategory.value = "Genaral";
};
// ban đầu khởi tạo và kiểm tra dữ liệu trong storage
const dataSetting = getFromStorage(setting_storage);
console.log("dataSetting", dataSetting, typeof dataSetting);
if (dataSetting && dataSetting.length) {
  const _data = JSON.parse(dataSetting)[0];
  if (_data) {
    inputPageSize.value = _data.newsPerPage;
    inputCategory.value = _data.newsCategory;
  }
}
//bắt sự kiện ấn nút setting
submitBtn.addEventListener("click", function () {
  const dataSetting = {
    newsPerpage: inputPageSize.value,
    newsCategory: inputCategory.value,
  };

  const data = new Settings(dataSetting.newsPerpage, dataSetting.newsCategory);
  console.log("dataSettting", data);
  settingStorage = data;
  // console.log("settingArr", settingArr);
  saveToStorage(setting_storage, JSON.stringify(settingStorage));
});
