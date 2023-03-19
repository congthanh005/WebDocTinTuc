"use strict";
let perPage;
let dataNewsArr = [];
let settingStorage;

const setting_storage = "setting";
const dataNews_storage = "dataNews_array";

const settingFromStorage = getFromStorage(setting_storage);
const dataNewsArrayFromStorage = getFromStorage(dataNews_storage);

if (settingFromStorage) {
  settingStorage = JSON.parse(settingFromStorage);
}

if (dataNewsArrayFromStorage) {
  dataNewsArr = JSON.parse(dataNewsArrayFromStorage);
}
perPage = settingStorage?.length ? settingStorage.newsPerPage : 5;

console.log("dataNews", dataNewsArr);
console.log("settingStorage", settingStorage);

//bắt đầu tạo danh sách News
let currentPage = 1;
let start = 0;
let end = perPage;

//tổng số trang
const totalPages = Math.ceil(dataNewsArr?.length / perPage);

const backBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const numberPage = document.querySelector("#page-num");

//tạo danh sách new
function renderNews(_aray) {
  let html = "";
  const content = (_aray || []).map((item, index) => {
    if (index >= start && index < end) {
      html += '<div class="card flex-row flex-wrap">';
      html += '<div class="card mb-3" style="">';
      html += '<div class="row no-gutters">';
      html += '<div class="col-md-4">';
      html +=
        "<img src=" +
        item.urlToImage +
        " " +
        'class="card-img" alt=' +
        item.title +
        ' " ' +
        ">";
      html += "</div>";
      html += '<div class="col-md-8">';
      html += '<div class="card-body">';
      html += '<h5 class="card-title">' + item.title + "</h5>";
      html += '<p class="card-text">' + item.description + "</p>";
      html += "<a href=" + item.url + 'class="btn btn-primary">View</a>';
      html += " </div>  </div> </div></div> </div> ";
      return html;
    }
  });
  document.querySelector("#news-container").innerHTML = html;
}
renderNews(dataNewsArr);

//nút number khi ấn next back
function changeNumber() {
  numberPage.innerHTML = `
   ${currentPage}
    `;
  if (currentPage >= totalPages) {
    nextBtn.classList.add("hide");
  } else {
    nextBtn.classList.remove("hide");
  }
  if (currentPage <= 1) {
    backBtn.classList.add("hide");
  } else {
    backBtn.classList.remove("hide");
  }
}

// chỉnh sửa khi ấn nút next
nextBtn.addEventListener("click", function () {
  currentPage++;
  if (currentPage >= totalPages) {
    currentPage = totalPages;
  }
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
  renderNews(dataNewsArr);
  changeNumber();
});

//tạo nút previous next
backBtn.addEventListener("click", function () {
  currentPage--;
  if (currentPage <= 1) {
    currentPage = 1;
  }
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
  renderNews(dataNewsArr);
  changeNumber();
});

//bắt đầu bắt sự kiện khi tìm kiếm
const inputQuery = document.querySelector("#input-query");
const searchBtn = document.querySelector("#btn-submit");

searchBtn.addEventListener("click", function () {
  const _dataSearch = {
    search: inputQuery.value,
  };
  if (!_dataSearch?.search) {
    alert("please input search");
    renderNews(dataNewsArr);
    return;
  }
  let dataSearch = [];
  console.log(" dataNewsArr ", dataNewsArr);
  for (let i = 0; i < dataNewsArr.length; i++) {
    const _new = dataNewsArr[i];

    const title = _new.title;
    const description = _new.description;

    if (
      title.includes(`${_dataSearch.search}`) ||
      description.includes(`${_dataSearch.search}`)
    ) {
      dataSearch.push(dataNewsArr[i]);
      console.log(dataSearch);
    }
  }
  renderNews(dataSearch);
});
