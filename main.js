// style 꾸미기
// 뒷배경 바꾸기
let inputTask = document.getElementById("input-task");
let btnAdd = document.getElementById("btn-add");
let tabs = document.querySelectorAll(".task-status div");
let tabAll = document.getElementById("tab-all");
let tabDone = document.getElementById("tab-done");
let tabNotDone = document.getElementById("tab-not-done");
let underline = document.getElementById("underline");

let taskList = [];
let notDoneList = [];
let doneList = [];
let mode = "";

btnAdd.addEventListener("click", addTask);

inputTask.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    addTask(e);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

tabAll.addEventListener("click", allRender);
tabNotDone.addEventListener("click", notDoneRender);
tabDone.addEventListener("click", doneRender);

function addTask() {
  if (inputTask.value == "") {
    alert("내용을 입력하주세요.");
    return;
  }
  let task = {
    inputValue: inputTask.value,
    id: randomId(),
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  allRender();
  inputTask.value = "";
}

function render(list) {
  console.log(list);
  let result = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `<div class="task task-done">
                    <div class="task-complete">${list[i].inputValue}</div>
                    <div class="btn-box">
                        <button onclick="taskComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                        <button onclick="taskDelete('${list[i].id}')"><i class="fa fa-trash"></i></button>
                    </div>
                </div>`;
    } else {
      result += `<div class="task">
                    <div>${list[i].inputValue}</div>
                    <div class="btn-box">
                        <button onclick="taskComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                        <button onclick="taskDelete('${list[i].id}')"><i class="fa fa-trash"></i></button>
                    </div>
                </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = result;
}

function allRender() {
  console.log("all");
  mode = "all";
  render(taskList);
}

function notDoneRender() {
  console.log("not done");
  mode = "not done";
  notDoneList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (!taskList[i].isComplete) {
      notDoneList.push(taskList[i]);
    }
  }
  render(notDoneList);
}

function doneRender() {
  console.log("done");
  mode = "done";
  doneList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete) {
      doneList.push(taskList[i]);
    }
  }
  render(doneList);
}

function taskComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  if (mode == "done") {
    doneRender();
  } else if (mode == "not done") {
    notDoneRender();
  } else {
    allRender();
  }
}

function taskDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList.splice(i, 1);
      break;
    }
  }
  if (mode == "done") {
    doneRender();
  } else if (mode == "not done") {
    notDoneRender();
  } else {
    allRender();
  }
}

function filter(e) {
  if (e) {
    underline.style.width = e.target.offsetWidth + "px";
    underline.style.left = e.target.offsetLeft + "px";
    underline.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
