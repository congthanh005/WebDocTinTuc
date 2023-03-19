"use strict";
//lấy thông tin từ setting
let perPage = 5;
let settingStorage;
let category = [];

const setting_storage = "setting";
const dataNews_storage = "dataNews_array";

const settingFromStorage = getFromStorage(setting_storage);

if (settingFromStorage) {
  settingStorage = JSON.parse(settingFromStorage);
  perPage = settingStorage.newsPerPage;
  category = settingStorage.newsCategory;
}

//lấy dữ liệu data
const getNews = async function (currentPage) {
  let res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a73412c970474b6fa8c01e19e254bafd&page=${currentPage}&pageSize=${perPage}`
  );
  let data = await res.json();
  console.log("data", data);
  if (data?.message) {
    alert(data.message);
    return;
  }
  const _dataNews = data?.articles || [];

  saveToStorage(dataNews_storage, JSON.stringify(_dataNews));

  // render danh sachs
  let html = "";
  _dataNews.forEach((item, index) => {
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
  });
  document.querySelector("#news-container").innerHTML = html;

  // render next/prev
  const backBtn = document.querySelector("#btn-prev");
  const nextBtn = document.querySelector("#btn-next");
  const numberPage = document.querySelector("#page-num");
  const totalPages = Math.ceil(data.totalResults / perPage);

  console.log("current page ", currentPage, totalPages);
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

  // chỉnh sửa khi ấn nút next
  nextBtn.onclick = function () {
    getNews(currentPage + 1);
  };

  //tạo nút previous next
  backBtn.onclick = function () {
    getNews(currentPage - 1);
  };
  return data;
};

getNews(1); // lan dau tien get  news tai trang 1
