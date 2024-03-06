// Load the todo list from local storage if available
window.onload = function() {
  var savedList = localStorage.getItem('todoList');
  if(savedList) {
    document.getElementById("myUL").innerHTML = savedList;
    addCloseListeners();
    addCheckListeners();
  }
};

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Function to add event listeners to close buttons
function addCloseListeners() {
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      saveTodoList();
    };
  }
}

// Function to add event listeners to list items for checking
function addCheckListeners() {
  var listItems = document.getElementsByTagName("LI");
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveTodoList();
      }
    });
  }
}

// Click on a close button to hide the current list item
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    var div = event.target.parentElement;
    div.style.display = "none";
    saveTodoList();
  }
});

// Function to save the todo list to local storage
function saveTodoList() {
  var todoList = document.getElementById("myUL").innerHTML;
  localStorage.setItem('todoList', todoList);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var dueDateValue = document.getElementById("dueDateInput").value; // Get the due date input value
  var t = document.createTextNode(inputValue + " - Due: " + dueDateValue); // Concatenate task title and due date
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  document.getElementById("dueDateInput").value = ""; // Clear the input field after adding the task

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  addCloseListeners();
  addCheckListeners();
  saveTodoList();
}