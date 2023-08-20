const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

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

itemForm.addEventListener("submit", addItem);
