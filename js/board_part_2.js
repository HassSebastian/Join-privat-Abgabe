// Testarea PopupCard ***********************************************************************************************

// basic function for the popup window

/**
 * this function remove the d-none class from the popup window. The result is that the Popup Window is shown.
 */
async function enablePopupWindow(taskIndex) {
	if (document.getElementById(`taskCard${taskIndex}`)) {
		document.getElementById('boardPopup').classList.remove('d-none');
		// await enableBoardPopup();
	} else {
		document.getElementById('boardPopup').classList.remove('d-none');
		setTimeout(() => {
			if (window.innerWidth > 563) {
				document.getElementById('boardAddTaskPopup').classList.add('boardAddTaskPopupOverlay');
			}
		}, 1);
	}
}

/**
 * this function add the d-none class to the popup window. The result is that the Popup Window not shown.
 */
async function disablePopupWindow() {
	if (document.getElementById('boardAddTaskPopup')) {
		document.getElementById('boardAddTaskPopup').classList.remove('boardAddTaskPopupOverlay');
		setTimeout(() => {
			document.getElementById('boardPopup').classList.add('d-none');
		}, 500);
	}
	if (selectedMenuBtnId == 4) {
	} else {
		setTimeout(await initBoard, 500);
		setTimeout(() => {
			document.getElementById('boardPopup').classList.add('d-none');
		}, 500);
		searchAfterPopup();
	}
}

/**
 * this function prevent the closure of the popup window when clicking on the Popup Task Card.
 */
function stopClose(event) {
	event.stopPropagation();
}

// basic function popup end

// render function for the detail view of the task card.

/**
 * If the length of the assignedList is greater than 0, then return true. Otherwise, return false.
 * @param assignedList - [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
 * @returns true if the assignedList length is greater than 0.
 */
function assignedToDataExists(assignedList) {
	return assignedList.length > 0;
}

/**
 * Render the subtask HTML for the given task index, then set the subtask status for the given task
 * index.
 * @param taskIndex - The index of the task in the task array.
 */
async function renderSubtask(taskIndex) {
	await renderSubtaskHtml(taskIndex);
	setSubTaskStatus(taskIndex);
}

/**
 * If the length of the array is greater than 0, then the array has at least one element.
 * @param subtaskArray - an array of subtasks
 * @returns true if the subtaskArray length is greater than 0.
 */
function subtaskExist(subtaskArray) {
	return subtaskArray.length > 0;
}

/**
 * If the subtaskStatus is true, then check the checkbox.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function setSubTaskStatus(taskIndex) {
	let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
	for (let i = 0; i < subtaskArray.length; i++) {
		if (subtaskStatusIsTrue(i, subtaskArray)) {
			document.getElementById(`subtask${i}`).checked = true;
		}
	}
}

/**
 * If the subtaskStatus property of the subtask object at the given index is true, return true,
 * otherwise return false.
 * @param subtaskIndex - The index of the subtask in the subtask array.
 * @param subtaskArray - The array of subtasks
 * @returns the value of the subtaskStatus property of the object at the index of subtaskIndex in the
 * array subtaskArray.
 */
function subtaskStatusIsTrue(subtaskIndex, subtaskArray) {
	return subtaskArray[subtaskIndex]['subtaskStatus'];
}

/**
 * It's a function that takes two parameters, one is the index of the subtask and the other is the
 * index of the task. It then gets the status of the checkbox and sets the status of the subtask in the
 * array to the status of the checkbox.
 * @param subTaskIndex - the index of the subtask in the subtask array
 * @param taskIndex - The index of the task in the array.
 */
async function checkboxSubtaskSelected(subTaskIndex, taskIndex) {
	let checkboxStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
	joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
	joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
	await saveTask();
}

/**
 * this function set the category background-color of the category.
 * @param {number} taskIndex -this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupCatColor(taskIndex) {
	let cardCatColorIndex = joinTaskArray[taskIndex]['catColor'];
	let cardCatColor = categoryBackgroundColors[cardCatColorIndex];
	document.getElementById('taskCardPopupCategory').style = `background-color: ${cardCatColor};`;
}

/**
 * This function sets the background color of the prio button and transfers the url of the image associated with the prio button.
 * @param {*} taskIndex --this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupPrioBackground(taskIndex) {
	let cardPrio = joinTaskArray[taskIndex]['prio'];
	cardPrio = cardPrio.toLowerCase();
	let cardPrioBackground = prioColorAndUrlArray[0][cardPrio][0];
	let cardPrioImgSrc = prioColorAndUrlArray[0][cardPrio][1];
	document.getElementById('prioContainer').style = `background-color: ${cardPrioBackground};`;
	document.getElementById('cardPrioImg').src = cardPrioImgSrc;
}

// Edit Taskcard popup

/**
 * It opens a modal window with a form to edit a task.
 * @param taskIndex - the index of the task in the array of tasks
 */
async function openEditTaskCard(taskIndex) {
	resetAssignToList();
	await renderEditTaskCardHtml(taskIndex);
	showDeleteButton(taskIndex);
	await renderLoggedUserInAssignDrobDownMenuIntoYou();
	await renderContactsInAssignDropDownMenu();
	renderEditTaskCardInputFields(taskIndex);
	await boardEditTaskCardAssignPreseselction(taskIndex);
}

/**
 * It takes the index of the task in the array and then renders the input fields with the values of the
 * task.
 * </code>
 * @param taskIndex - the index of the task in the array
 */
async function renderEditTaskCardInputFields(taskIndex) {
	let cardTitle = joinTaskArray[taskIndex]['title'];
	let cardDescription = joinTaskArray[taskIndex]['descripten'];
	let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
	let taskPrio = joinTaskArray[taskIndex]['prio'];
	boardEditedPrio = taskPrio;
	let prioArray = { Urgent: 0, Medium: 1, Low: 2 };
	let taskPrioNumber = prioArray[taskPrio];
	await addPrio(taskPrioNumber);
	document.getElementById('boardEditTitle').value = cardTitle;
	document.getElementById('boardEditDecription').value = cardDescription;
	document.getElementById('boardEditDueDate').value = cardDueDate;
}

/**
 * It takes an array of objects, and compares the email property of each object in the array to the
 * email property of each object in another array. If the email properties match, it adds the object
 * from the second array to a third array.
 *
 * I'm trying to figure out how to do this with a forEach loop. I've tried a few different things, but
 * I can't seem to get it to work.
 *
 * Here's what I've tried:
 * @param taskIndex - the index of the task in the joinTaskArray
 */
async function boardEditTaskCardAssignPreseselction(taskIndex) {
	let assignToArray = joinTaskArray[taskIndex]['assignedTo'];
	for (let i = 0; i < assignToArray.length; i++) {
		let refEmail = assignToArray[i]['email'];
		for (let index = 0; index < coworkersToAssignTo.length; index++) {
			let email = coworkersToAssignTo[index]['email'];
			if (refEmail == email) {
				addContactToTaskForceWithCheckBox(index);
			}
		}
	}
}

/**
 * It takes a taskIndex as an argument, and then sets the preselected priority of the task to the
 * priority of the task at the given taskIndex.
 * @param taskIndex - The index of the task in the array.
 */
function setPrioPreselection(taskIndex) {
	let preselectedPrio = joinTaskArray[taskIndex]['prio'];
	let boardPrioStatusJson = { Urgent: 0, Medium: 1, Low: 2 };
	addPrio(boardPrioStatusJson[preselectedPrio]);
	boardEditedPrio = preselectedPrio;
}

/**
 * This function resets the check property of each object in the coworkersToAssignTo array to false,
 * and then empties the assignToArray and taskForce arrays.
 */
function resetAssignToList() {
	for (let i = 0; i < coworkersToAssignTo.length; i++) {
		coworkersToAssignTo[i]['check'] = false;
		assignToArray = [];
		taskForce = [];
	}
}

/**
 * It takes the values from the input fields and saves them to the array.
 * </code>
 * @param taskIndex - the index of the task in the array
 */
async function getTaskChanges(taskIndex) {
	let boardEditedTitle = document.getElementById('boardEditTitle').value;
	let boardEditedDescripten = document.getElementById('boardEditDecription').value;
	let boardEditedDueDate = document.getElementById('boardEditDueDate').value;
	joinTaskArray[taskIndex]['assignedTo'] = taskForce;
	joinTaskArray[taskIndex]['title'] = boardEditedTitle;
	joinTaskArray[taskIndex]['descripten'] = boardEditedDescripten;
	joinTaskArray[taskIndex]['dueDate'] = boardEditedDueDate;
	joinTaskArray[taskIndex]['prio'] = boardEditedPrio;

	await saveTask();
	/* if (window.innerWidth > 1100) { */
	await renderBoard();
	await createWorkStatusArrays();
	await renderAllCards();
	/* 	} else {
		disablePopupWindow();
		await renderMobileBoardHtml();
		await createWorkStatusArrays();
		await renderAllCardsMobil();
	} */
}

/**
 * If the user clicks on a priority button, the function will check if the button is already selected.
 * If it is, it will deselect it. If it isn't, it will select it
 * @param index - the index of the status in the statusNames array
 */
function prioStatusChange(index) {
	let statusNames = ['Urgent', 'Medium', 'Low'];
	if (actualClickedPrioBtnIsSet(index, statusNames)) {
		boardEditedPrio = '';
	} else {
		boardEditedPrio = statusNames[index];
	}
}

/**
 * If the index of the clicked button is the same as the index of the edited priority, then return
 * true, else return false.
 * @param index - the index of the button in the array of buttons
 * @param statusNames - an array of strings, each string is a status name
 * @returns the value of the expression:
 * statusNames[index] == boardEditedPrio
 */
function actualClickedPrioBtnIsSet(index, statusNames) {
	return statusNames[index] == boardEditedPrio;
}

// render function for the detail view of the task card end.

// render function for the creation of a new task card.

/**
 * Show the add task popup window by enabling the popup window, rendering the add task popup, loading
 * the existing categories, rendering the category list, setting the new category input to inactive,
 * and rendering the contacts in the assign drop down menu.
 */
async function showAddTaskPopupWindow(workflow) {
	taskForce = [];
	coworkersToAssignTo[loggedInUserIndex].check = false;
	enablePopupWindow();
	await renderAddTaskPopup(workflow);
	await loadExitingCategories();
	renderCategoryList();
	newCatInputActive = false;
	renderLoggedUserInAssignDrobDownMenuIntoYou(); // Das habe ich für das You eingefügt!
	renderContactsInAssignDropDownMenu(); //for dropdown menu in assignTo
	setFutureDatesOnlyForInputDueDate();
	loadContributorsLetter();
	addSubtaskMain();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
	setPrioBtnforOtherPages();
}

function setPrioBtnforOtherPages() {
	if (addTaskOpened == false) {
		urgentBtn = document.getElementById('addTaskUrgent');
		mediumBtn = document.getElementById('addTaskMedium');
		lowBtn = document.getElementById('addTaskLow');
	}
}

/**
 * this function render the popup menu AddTask.
 */
async function renderAddTaskPopup(workflow) {
	document.getElementById('boardPopup').innerHTML = '';
	document.getElementById('boardPopup').innerHTML = renderAddTaskPopupHtml(workflow);
}

/**
 * If the workFlowStatus of the task is 3, then remove the class 'd-none' from the delete button.
 * @param taskIndex - the index of the task in the array
 */
function showDeleteButton(taskIndex) {
	if (joinTaskArray[taskIndex].workFlowStatus == 3) {
		document.getElementById('deleteButton').classList.remove('d-none');
	}
}

/**
 * The function deleteButton() takes the taskIndex as a parameter and removes the task from the
 * joinTaskArray at the taskIndex position. Then it saves the task and initializes the board.
 * @param taskIndex - The index of the task in the array.
 */
async function deleteButton(taskIndex) {
	joinTaskArray.splice(taskIndex, 1);
	await saveTask();
	await renderBoard();
	await createWorkStatusArrays();
	renderAllCards();
}
