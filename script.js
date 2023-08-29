const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");
const filter = document.querySelector(".filter");
const submitButton = document.querySelector(".btn");
let isEditMode = false;

//On start functions
function renderItems() {
  let itemsFromLocalStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromLocalStorage.sort((a, b) => (a.priority > b.priority ? -1 : 1));
  itemsFromLocalStorage.forEach((item) => addItem(item.name, item.priority));
}

//Operations on local storage
function addItemToLocalStorage(item) {
  let itemsFromLocalStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

function removeItemFromLocalStorage(name) {
  const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items")).filter(
    (item) => item.name !== name
  );
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

function onSubmitItem(e) {
  e.preventDefault();
  input = itemInput.value;
  const priority = getValueFromRadioBtns();
  if (isEditMode) {
    if (!CheckIfOccupied(input) || itemList.querySelector(".item-edit").textContent == input) {
      const itemToEdit = itemList.querySelector(".item-edit");
      removeItemFromLocalStorage(itemToEdit.textContent);
      itemToEdit.remove();
    } else {
      alert("This item is already in list");
      itemInput.value = "";
      checkUI();
      return;
    }
  } else {
    if (CheckIfOccupied(input)) {
      alert("This item is already in list");
      itemInput.value = "";
      return;
    }
  }
  if (input != "") {
    addItemToLocalStorage({
      name: input,
      priority: priority,
    });
    addItem(input, priority);
    itemInput.value = "";
    checkUI();
  }
}
//Operations on items
function addItem(name, priority) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(name));
  li.appendChild(createIcon("fa-solid fa-" + priority));
  const btn = createBtn("remove-item btn-link text-red");
  btn.appendChild(createIcon("fa-solid fa-xmark"));
  li.appendChild(btn);
  itemList.appendChild(li);
}

function editItem(item) {
  isEditMode = true;
  itemList.querySelectorAll("li").forEach((item) => item.classList.remove("item-edit"));
  item.classList.add("item-edit");
  submitButton.innerHTML = '<i class="fa-solid fa-pen"></i>Edit';
  submitButton.classList.add("btn-edit-mode");
  itemInput.value = item.textContent;
}

function deleteItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this item?")) {
      removeItemFromLocalStorage(e.target.parentElement.parentElement.textContent);
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  } else {
    editItem(e.target);
  }
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    if (item.textContent.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
  isEditMode = false;
  submitButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  submitButton.classList.remove("btn-edit-mode");
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  renderItems();
  const radioBtns = document.getElementsByName("priority");
  for (btn of radioBtns) {
    if (btn.id == "prio-1") {
      btn.checked = true;
    } else {
      btn.checked = false;
    }
  }
}

//Helpers
function clearAll() {
  if (confirm("Are you sure you want to delete all items?")) {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
    }
    localStorage.removeItem("items");
    checkUI();
  }
}

function CheckIfOccupied(input) {
  const items = JSON.parse(localStorage.getItem("items"));
  if (!items) {
    return false;
  }
  for (var item of items) {
    if (item.name === input) {
      return true;
    }
  }
  return false;
}

function getValueFromRadioBtns() {
  const radioBtns = document.getElementsByName("priority");
  for (btn of radioBtns) {
    if (btn.checked) {
      return btn.value;
    }
  }
  return null;
}
//Create elements section
function createBtn(classes) {
  btn = document.createElement("button");
  btn.className = classes;
  return btn;
}

function createIcon(classes) {
  icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

itemForm.addEventListener("submit", onSubmitItem);
itemList.addEventListener("click", deleteItem);
clearButton.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);
renderItems();
checkUI();
