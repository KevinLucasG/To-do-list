let tasks = [];
const addBtn = document.getElementById("add-btn");
const delBtn = document.querySelectorAll("del-btn");
const altBtn = document.querySelectorAll(".alt-btn");
const saveBtn = document.getElementById("save-btn");
const delBtnAll = document.getElementById("del-btn");
let container = document.getElementById("container");
const conteudo = document.querySelectorAll(".content");
console.log(tasks);
const lendsFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
let notice = document.createElement("h2");

let colorIndex = 0;
let colors = ["green", "yellow", "red"];

console.log(lendsFromLocalStorage);

function render(tasks) {
  list = "";
  for (let i = 0; i < tasks.length; i++) {
    list += `
    <div class="box">
      <h2> ${tasks[i].title} </h2>
      <button class="edit alt-btn">Edit</button>
      <button class="remove del-btn">Delete</button>
      <p> ${tasks[i].content} </p>
      <button class="priority" style="background-color:${tasks[i].color}"></button>
    </div>
    `;
  }
  container.innerHTML = list;
}

if (lendsFromLocalStorage) {
  tasks = lendsFromLocalStorage;
  render(tasks);
}

if (container.childElementCount === 0) {
  container.appendChild(notice);
  notice.textContent = "Enter a note to get started";
}

saveBtn.addEventListener("click", function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

addBtn.addEventListener("click", function () {
  //-------------------------------------------------------------
  const title = prompt("Type your new title:");
  const content = prompt("Type your new text:");

  if (title && content) {
    const newDiv = document.createElement("div");
    newDiv.className = "box";

    let hDiv = document.createElement("h2");
    hDiv.textContent = title;

    const editBtn = document.createElement("button");
    editBtn.className = "edit alt-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (event) => edit(event));

    const dellBtn = document.createElement("button");
    dellBtn.className = "remove del-btn";
    dellBtn.textContent = "Delete";
    dellBtn.addEventListener("dblclick", () => removeBlock(indice));

    let contentDiv = document.createElement("p");
    contentDiv.textContent = `${tasks.content}`;
    contentDiv.className = "text";
    contentDiv.textContent = content;

    let priority = document.createElement("button");
    priority.className = "priority";
    priority.style.backgroundColor = colors[colorIndex];
    console.log(priority);
    priority.addEventListener("click", () => changePriority(priority));

    tasks.push({ title: title, content: content, color: colors[0] });

    console.log(tasks);

    //-------------------------------------------------------------
    container.appendChild(newDiv);
    newDiv.appendChild(hDiv);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(dellBtn);
    newDiv.appendChild(contentDiv);
    newDiv.appendChild(priority);
    notice.textContent = "";
  }
});

//-----------------------------------------------------------------------------------------
function removeBlock(indice) {
  if (confirm("Are you sure?")) {
    const divParaExcluir = document.querySelector(".box");
    tasks.splice(indice, 1);

    localStorage.clear();
    console.log(tasks);
    if (divParaExcluir) {
      // Get the parent of the div so you can remove it
      const container = document.getElementById("container");

      // Remove the div from the HTML
      container.removeChild(divParaExcluir);
    }
  }
  console.log(container);
  if (container.childElementCount === 0) {
    container.appendChild(notice);
    notice.textContent = "Enter a note to get started";
  }
}

saveBtn.addEventListener("click", function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render(tasks);
  console.log(tasks);
  console.log(localStorage);
});

function edit(event) {
  let target = event.target;
  let contentBlock = target.parentElement.querySelector(".text");
  let newBlock = target.parentElement.querySelector("h2");

  const newTitle = prompt("Type your new title:");
  const newText = prompt("Type your new text:");

  newBlock.textContent = newTitle;
  contentBlock.textContent = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(localStorage);
}

delBtnAll.addEventListener("click", function () {
  tasks.splice(0, tasks.length);
  localStorage.clear();
  const divAll = document.querySelectorAll(".box");
  divAll.forEach((div) => {
    const container = document.getElementById("container");
    container.removeChild(div);
  });
  notice.textContent = "Enter a note again";
});

function changePriority(button) {
  button.style.backgroundColor = colors[colorIndex];
  tasks.push({ color: colors[colorIndex] });
  colorIndex = (colorIndex + 1) % colors.length;
}
