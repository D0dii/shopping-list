const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearButton = document.querySelector("#clear");
const filter = document.querySelector(".filter");

function renderItems() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    addItemFromLocalStorage(value);
  }
  checkUI();
}

function addItemFromLocalStorage(name) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(name));
  const btn = createBtn("remove-item btn-link text-red");
  btn.appendChild(createIcon("fa-solid fa-xmark"));
  li.appendChild(btn);
  itemList.appendChild(li);
}

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
    localStorage.setItem(input, input);
    itemInput.value = "";
    checkUI();
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
    if (confirm("Are you sure you want to delete this item?")) {
      localStorage.removeItem(
        e.target.parentElement.parentElement.textContent,
        e.target.parentElement.parentElement.textContent
      );
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  localStorage.clear();
  checkUI();
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
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem);
clearButton.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);
renderItems();
checkUI();
