"use strict";
let index;
const blog = [
    {
        id: 0,
        title: "Nodejs",
        content: `Thực hiện clone lại giao diện trên (mang tính tương đối) (20 điểm) Dữ
             liệu lưu ở local, xây dựng tính năng thêm mới bài viết.Khi nhập dữ liệu c
             ho các ô input trong form thì sẽ thêm một bài viết mới(20 điểm) Xây dựng chức 
             năng hiển thị danh sách công việc ra`,
        comment: [
            {
                text: "i love you",
            },
        ],
    },
];
if (!JSON.parse(localStorage.getItem("Blogs"))) {
    localStorage.setItem("Blogs", JSON.stringify(blog));
}
function renderContent() {
    let localBlog = JSON.parse(localStorage.getItem("Blogs"));
    let containerBlog = document.querySelector(".contentComment");
    containerBlog.innerHTML = "";
    localBlog.forEach((item) => {
        containerBlog.innerHTML += `
    <div class="text">
        <h2>${item.title}</h2>
        <p>
          ${item.content}
        </p>
        <button class="myBtn" onclick='myBtnComment(${item.id})'>Bình luận</button>
        <span>${item.comment.length} bình luận</span>
        <div class='contentComments'>
        
        </div>
      </div>`;
        item.comment.forEach((element) => {
            let btnComment = document.querySelector(".contentComments");
            btnComment.innerHTML += `<p>${element.text}</p>`;
        });
    });
}
renderContent();
function myBtnComment(id) {
    let modal = document.querySelector(".modals");
    modal.style.display = "block";
    let containerModal = document.querySelector(".containerModal");
    containerModal.innerHTML = `<div class="contentModal">
          <input type="text" placeholder="Nhập bình luận" class='oninputComment'/>
          <button onclick='onComment(${id})'>Bình luận</button>
          <button onclick='onCloseModal()'>x</button>
        </div>`;
}
function onCloseModal() {
    let modal = document.querySelector(".modals");
    modal.style.display = "none";
}
function createContent() {
    let localBlog = JSON.parse(localStorage.getItem("Blogs"));
    let getInputTitle = document.querySelector("#inputHeader");
    let getInputContent = document.querySelector("#inputContent");
    if (getInputContent.value.length > 0 && getInputTitle.value.length > 0) {
        localBlog.push({
            id: localBlog[localBlog.length - 1].id + 1,
            title: getInputTitle.value,
            content: getInputContent.value,
            comment: [],
        });
        localStorage.setItem("Blogs", JSON.stringify(localBlog));
        renderContent();
    }
}
function onComment(id) {
    let localBlog = JSON.parse(localStorage.getItem("Blogs"));
    let inputComment = document === null || document === void 0 ? void 0 : document.querySelector(".oninputComment");
    let findIndexBlogs = localBlog === null || localBlog === void 0 ? void 0 : localBlog.findIndex((item) => {
        return item.id == id;
    });
    if (inputComment.value.length > 0) {
        localBlog[findIndexBlogs].comment.push({
            text: inputComment.value,
        });
        localStorage.setItem("Blogs", JSON.stringify(localBlog));
        renderContent();
    }
}
