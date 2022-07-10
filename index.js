"use strict";

// declearing all the necessary varibales
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("btnAdd");

// array in which all task will  be stored
const data = [];

// when task making will be finished it will run
const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// when delete icon in cliekd it will run
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

// when edit btn is cliekd , it will run
const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
};

//creat the task here
const createPost = () => {
  tasks.innerHTML = "";

  data.map((key, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${key.text}</span>
          <span class="small text-secondary">${key.date}</span>
          <p>${key.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

// it stores the data
const acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createPost();
};

const formValidation = () => {
  if (textInput.value == "" || textarea.value == "") {
    console.log("Task Title is empty or textarea is empty");
    msg.innerHTML = `<h5>Task Fields are empty</h5>`;
  } else {
    console.log("form is valid");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("btnAdd cliecked");
  formValidation();
});
