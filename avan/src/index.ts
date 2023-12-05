interface ListWork {
  id: number;
  text: string;
  status: number;
}
const list_work: ListWork[] = [
  {
    id: 0,
    text: "Quét nhà",
    status: 1,
  },
];
if (!JSON.parse(localStorage.getItem("ListWork") as string)) {
  localStorage.setItem("ListWork", JSON.stringify(list_work));
}
function createListWork() {
  let localListWork = JSON.parse(localStorage.getItem("ListWork") as string);
  let getValue: HTMLInputElement = document.getElementById(
    "inputCreateListWork"
  ) as HTMLInputElement;
  if (getValue.value.length > 0) {
    console.log(getValue.value);

    localListWork.push({
      id: localListWork[localListWork.length - 1].id + 1,
      text: getValue.value,
      status: 1,
    });
    localStorage.setItem("ListWork", JSON.stringify(localListWork));
    renderListWork();
  } else {
    alert("Vui lòng lấp đầy ô nhập");
  }
  window.location.reload();
}
function renderListWork(): void {
  let localListWork = JSON.parse(localStorage.getItem("ListWork") as string);
  let containerTable: HTMLElement = document.querySelector(
    ".tableWork"
  ) as HTMLElement;
  containerTable.innerHTML = "";
  localListWork.forEach((item: ListWork) => {
    containerTable.innerHTML += `
        <div class="row-work">
            <div class="checkbox">
              <input type="checkbox" value='${
                item.id
              }' onclick='onDoneListWork(${item.id})' class='checkBox'/>
              <label ${
                item.status == 2
                  ? 'style="text-decoration: line-through;"'
                  : 'style="text-decoration: none;"'
              }>${item.text}</label>
            </div>
            <div class="status">
              <i class="fa-solid fa-pen" onclick='updateListWork(${
                item.id
              })'></i>
              <i class="fa-solid fa-trash"onclick='deleteListWork(${
                item.id
              })'></i>
            </div>
          </div>`;
  });
}
renderListWork();
function updateListWork(id: number): void {
  let localListWork: ListWork[] = JSON.parse(
    localStorage.getItem("ListWork") as string
  );
  let btnCloseUpdate: HTMLButtonElement = document.querySelector(
    ".containerPopup"
  ) as HTMLButtonElement;
  btnCloseUpdate.style.display = "block";
  let findIndexListWork: number = localListWork?.findIndex((item: ListWork) => {
    return item.id == id;
  });
  btnCloseUpdate.innerHTML = `
        <div class="popUp">
          <input type="text" placeholder="${localListWork[findIndexListWork].text}" class='inputPopUp' id="inputPopUp" />
          <button onclick='onUpdate(${findIndexListWork})'>update</button>
          <button onclick="closeUpdate()">cancel</button>
        </div>`;
}
function onUpdate(index: number) {
  let localListWork: ListWork[] = JSON.parse(
    localStorage.getItem("ListWork") as string
  );
  let inputUpdate: HTMLInputElement = document.getElementById(
    "inputPopUp"
  ) as HTMLInputElement;
  let btnCloseUpdate: HTMLButtonElement = document.querySelector(
    ".containerPopup"
  ) as HTMLButtonElement;
  if (inputUpdate.value.length > 0) {
    localListWork[index] = {
      ...localListWork[index],
      text: inputUpdate.value,
    };
    localStorage.setItem("ListWork", JSON.stringify(localListWork));
    renderListWork();
    btnCloseUpdate.style.display = "none";
  } else {
    alert("Vui lòng điền vào chỗ trống");
  }
}
function closeUpdate() {
  let btnCloseUpdate: HTMLButtonElement = document.querySelector(
    ".containerPopup"
  ) as HTMLButtonElement;
  btnCloseUpdate.style.display = "none";
}
function deleteListWork(id: number): void {
  let checkOk = confirm("Bạn chắc chắn muốn xóa nó");
  let localListWork: ListWork[] = JSON.parse(
    localStorage.getItem("ListWork") as string
  );
  let findIndexListWork: number = localListWork?.findIndex((item: ListWork) => {
    return item.id == id;
  });
  if (checkOk) {
    localListWork.splice(findIndexListWork, 1);
    localStorage.setItem("ListWork", JSON.stringify(localListWork));
    renderListWork();
  }
}
function onDoneListWork(id: number) {
  let localListWork: ListWork[] = JSON.parse(
    localStorage.getItem("ListWork") as string
  );
  let findIndexListWork: number = localListWork.findIndex((item: ListWork) => {
    return item.id == id;
  });
  if (localListWork[findIndexListWork].status == 1) {
    localListWork[findIndexListWork] = {
      ...localListWork[findIndexListWork],
      status: 2,
    };
  } else {
    localListWork[findIndexListWork] = {
      ...localListWork[findIndexListWork],
      status: 1,
    };
  }
  localStorage.setItem("ListWork", JSON.stringify(localListWork));
  renderListWork();
  renderNoneListWork();
}
function renderNoneListWork(): void {
  let container: HTMLElement = document.getElementById(
    "doneWorkListWork"
  ) as HTMLElement;
  let totalIndex = 0;
  let localListWork: ListWork[] = JSON.parse(
    localStorage.getItem("ListWork") as string
  );
  localListWork.forEach((item: ListWork) => {
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
