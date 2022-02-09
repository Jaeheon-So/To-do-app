// task 상태 밑줄 이동
// task 상태 이동
// + 버튼 enter 적용
// + 버튼 or enter 하면 input에서 지우기
// 버튼 아이콘 3개(체크, reset, delete)
// check버튼 클릭후 밑줄이 갈때 밑에 배경 회색으로 바꾸기
// style 꾸미기
// 뒷배경 바꾸기
let inputTask = document.getElementById("input-task");
let btnAdd = document.getElementById("btn-add");
let tabAll = document.getElementById("tab-all");
let tabDone = document.getElementById("tab-done");
let tabNotDone = document.getElementById("tab-not-done");

let taskList = [];

btnAdd.addEventListener("click", addTask);

function addTask() {
  let task = {
    inputValue: inputTask.value,
    id: randomId(),
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let result = ``;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete) {
      result += `<div class="task">
                    <div class="task-complete">${taskList[i].inputValue}</div>
                    <div>
                        <button onclick="taskComplete('${taskList[i].id}')">Check</button>
                        <button onclick="taskDelete('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
    } else {
      result += `<div class="task">
                    <div>${taskList[i].inputValue}</div>
                    <div>
                        <button onclick="taskComplete('${taskList[i].id}')">Check</button>
                        <button onclick="taskDelete('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = result;
}

function taskComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function taskDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
