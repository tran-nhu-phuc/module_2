"use strict";
const list_work = [
    {
        id: 0,
        text: "Quét nhà",
        status: 1,
    },
];
if (!JSON.parse(localStorage.getItem("ListWork"))) {
    localStorage.setItem("ListWork", JSON.stringify(list_work));
}
function createListWork() {
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let getValue = document.getElementById("inputCreateListWork");
    if (getValue.value.length > 0) {
        console.log(getValue.value);
        localListWork.push({
            id: localListWork[localListWork.length - 1].id + 1,
            text: getValue.value,
            status: 1,
        });
        localStorage.setItem("ListWork", JSON.stringify(localListWork));
        renderListWork();
    }
    else {
        alert("Vui lòng lấp đầy ô nhập");
    }
    window.location.reload();
}
function renderListWork() {
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let containerTable = document.querySelector(".tableWork");
    containerTable.innerHTML = "";
    localListWork.forEach((item) => {
        containerTable.innerHTML += `
        <div class="row-work">
            <div class="checkbox">
              <input type="checkbox" value='${item.id}' onclick='onDoneListWork(${item.id})' class='checkBox'/>
              <label ${item.status == 2
            ? 'style="text-decoration: line-through;"'
            : 'style="text-decoration: none;"'}>${item.text}</label>
            </div>
            <div class="status">
              <i class="fa-solid fa-pen" onclick='updateListWork(${item.id})'></i>
              <i class="fa-solid fa-trash"onclick='deleteListWork(${item.id})'></i>
            </div>
          </div>`;
    });
}
renderListWork();
function updateListWork(id) {
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let btnCloseUpdate = document.querySelector(".containerPopup");
    btnCloseUpdate.style.display = "block";
    let findIndexListWork = localListWork === null || localListWork === void 0 ? void 0 : localListWork.findIndex((item) => {
        return item.id == id;
    });
    btnCloseUpdate.innerHTML = `
        <div class="popUp">
          <input type="text" placeholder="${localListWork[findIndexListWork].text}" class='inputPopUp' id="inputPopUp" />
          <button onclick='onUpdate(${findIndexListWork})'>update</button>
          <button onclick="closeUpdate()">cancel</button>
        </div>`;
}
function onUpdate(index) {
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let inputUpdate = document.getElementById("inputPopUp");
    let btnCloseUpdate = document.querySelector(".containerPopup");
    if (inputUpdate.value.length > 0) {
        localListWork[index] = Object.assign(Object.assign({}, localListWork[index]), { text: inputUpdate.value });
        localStorage.setItem("ListWork", JSON.stringify(localListWork));
        renderListWork();
        btnCloseUpdate.style.display = "none";
    }
    else {
        alert("Vui lòng điền vào chỗ trống");
    }
}
function closeUpdate() {
    let btnCloseUpdate = document.querySelector(".containerPopup");
    btnCloseUpdate.style.display = "none";
}
function deleteListWork(id) {
    let checkOk = confirm("Bạn chắc chắn muốn xóa nó");
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let findIndexListWork = localListWork === null || localListWork === void 0 ? void 0 : localListWork.findIndex((item) => {
        return item.id == id;
    });
    if (checkOk) {
        localListWork.splice(findIndexListWork, 1);
        localStorage.setItem("ListWork", JSON.stringify(localListWork));
        renderListWork();
    }
}
function onDoneListWork(id) {
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    let findIndexListWork = localListWork.findIndex((item) => {
        return item.id == id;
    });
    if (localListWork[findIndexListWork].status == 1) {
        localListWork[findIndexListWork] = Object.assign(Object.assign({}, localListWork[findIndexListWork]), { status: 2 });
    }
    else {
        localListWork[findIndexListWork] = Object.assign(Object.assign({}, localListWork[findIndexListWork]), { status: 1 });
    }
    localStorage.setItem("ListWork", JSON.stringify(localListWork));
    renderListWork();
    renderNoneListWork();
}
function renderNoneListWork() {
    let container = document.getElementById("doneWorkListWork");
    let totalIndex = 0;
    let localListWork = JSON.parse(localStorage.getItem("ListWork"));
    localListWork.forEach((item) => {
        if (item.status == 2) {
            totalIndex += 1;
        }
    });
    container.innerHTML = "";
    container.innerHTML += `<p>${totalIndex}/${localListWork.length} công việc hoàn thành</p>`;
    if (totalIndex == localListWork.length) {
        container.innerHTML = `<p>
<i class="fa-solid fa-check" style='color:green'></i> Tất cả công việc hoàn thành</p>`;
    }
    renderListWork();
}
renderNoneListWork();
