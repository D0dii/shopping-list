const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");

function addItem(e) {
  e.preventDefault();
  input = itemInput.value;
  if (input != "") {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(input));
    const btn = createBtn("remove-item btn-link text-red");
    btn.appendChild(createIcon("fa-solid fa-xmark"));
    li.appendChild(btn);
    itemList.appendChild(li);
    itemInput.value = "";
  }
}

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

function deleteItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem);
clearButton.addEventListener("click", clearAll);
