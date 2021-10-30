//DOM Access
var addInput = document.getElementById("textbox");
var needButton = document.getElementById("need-btn");

//Creates object which will list shopping items (both need and own)
//By default stores item to arrays which can be altered
var grocNeedList = [{ item: "Salmon", completed: false }];

//Returns textbox input length - prevents empty inputs
function addItemLength() {
  return document.getElementById("textbox").value.length;
}

//displays grocery lists
function displayGroc() {
  displayNeedList();
}

//Invokes above function
displayGroc();

function displayNeedList() {
  //Targets need-list ID
  //Prevents any modifications from causing double list
  var needListUl = document.getElementById("need-list");
  needListUl.innerHTML = "";

  //Loop runs through each item for display
  for (var i = 0; i < grocNeedList.length; i++) {
    grocNeedList[i].item;
    var listItem = document.createElement("li");
    listItem.innerText = grocNeedList[i].item;
    needListUl.appendChild(listItem);
    listItem.id = i;
    listItem.classList.add("list-item");

    //Loop runs creating checkbox for each item
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = i;
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", toggle);
    var ticked = document.getElementsByClassName("checkbox");
    needListUl.appendChild(checkbox);

    //Checks checkbox so that ticked/unticked boxes remain the same when new item is added
    if (grocNeedList[i].completed === true) {
      ticked[i].checked = true;
    } else {
      ticked[i].checked = false;
    }

    //loop runs creating remove button for each item
    var removeButton = document.createElement("button");
    removeButton.addEventListener("click", removeNeedItem);
    removeButton.id = i;
    removeButton.classList.add("fa", "fa-trash-alt", "fa-2x");
    needListUl.appendChild(removeButton);
  }
}

//Checkbox are ticked/untciked based on boolean property in object
function toggle(event) {
  var ticked = document.getElementsByClassName("checkbox");
  var position = event.currentTarget.id;
  if (ticked[position].checked === true) {
    grocNeedList[position].completed = true;
  } else if (ticked[position].checked === false) {
    grocNeedList[position].completed = false;
  }
}

//Adds new item to list
function addNeedItem() {
  if (addItemLength() > 0) {
    var newItem = addInput.value;
    grocNeedList.push({ item: newItem, completed: false }); //Adds value to console
    addInput.value = ""; //Resets property to empty so another item can be added
    displayGroc();
  }
}

//Removes item
function removeNeedItem(event) {
  var position = event.currentTarget.id; //Returns the element whose event listeners triggered the event.
  grocNeedList.splice(position, 1); //Only removes one item
  displayGroc();
}

// On keypress enter
function addKey(event) {
  if (addItemLength() > 0 && event.keyCode == 13) {
    addNeedItem();
  }
}

//Event Listeners
needButton.addEventListener("click", addNeedItem);
addInput.addEventListener("keypress", addKey);
