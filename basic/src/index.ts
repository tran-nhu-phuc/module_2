interface Blog {
  id: number;
  title: string;
  content: string;
  comment: object[];
}
let index: number;
const blog: Blog[] = [
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
if (!JSON.parse(localStorage.getItem("Blogs") as string)) {
  localStorage.setItem("Blogs", JSON.stringify(blog));
}
function renderContent(): void {
  let localBlog: Blog[] = JSON.parse(localStorage.getItem("Blogs") as string);
  let containerBlog: HTMLElement = document.querySelector(
    ".contentComment"
  ) as HTMLElement;
  containerBlog.innerHTML = "";
  localBlog.forEach((item: Blog) => {
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
    item.comment.forEach((element: any) => {
      let btnComment: HTMLElement | undefined = document.querySelector(
        ".contentComments"
      ) as HTMLElement;
      btnComment.innerHTML += `<p>${element.text}</p>`;
    });
  });
}
renderContent();
function myBtnComment(id: number): void {
  let modal: HTMLElement = document.querySelector(".modals") as HTMLElement;
  modal.style.display = "block";
  let containerModal: HTMLElement = document.querySelector(
    ".containerModal"
  ) as HTMLElement;
  containerModal.innerHTML = `<div class="contentModal">
          <input type="text" placeholder="Nhập bình luận" class='oninputComment'/>
          <button onclick='onComment(${id})'>Bình luận</button>
          <button onclick='onCloseModal()'>x</button>
        </div>`;
}
function onCloseModal(): void {
  let modal: HTMLElement = document.querySelector(".modals") as HTMLElement;
  modal.style.display = "none";
}
function createContent(): void {
  let localBlog: Blog[] = JSON.parse(localStorage.getItem("Blogs") as string);
  let getInputTitle: HTMLInputElement = document.querySelector(
    "#inputHeader"
  ) as HTMLInputElement;
  let getInputContent: HTMLTextAreaElement = document.querySelector(
    "#inputContent"
  ) as HTMLTextAreaElement;
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
function onComment(id: number): void {
  let localBlog: Blog[] = JSON.parse(localStorage.getItem("Blogs") as string);
  let inputComment: HTMLInputElement = document?.querySelector(
    ".oninputComment"
  ) as HTMLInputElement;
  let findIndexBlogs: number = localBlog?.findIndex((item: Blog) => {
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
