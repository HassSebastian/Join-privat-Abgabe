/**
 * this function determind all required fields are filled out.
 * @returns - returns true or false
 */
function requiredFieldAreNotValid() {
	return title == '' || dueDate == '' || category == '' || descripten == '' || noPrioritySelected();
}

/**
 * It returns the current date in the format YYYY-MM-DD.
 * @returns The current date in the format of YYYY-MM-DD.
 */
function currentDate() {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;
	let today = year + '-' + month + '-' + day;
	return today;
}

/**
 * The function setFutureDatesOnlyForInputDueDate()
 * sets the minimum date for the input element with
 * the id of dueDate to the current date.
 */
function setFutureDatesOnlyForInputDueDate() {
	document.getElementById('dueDate').min = currentDate();
}

/**
 * If the title is empty, make the titleReq element visible
 */
function checkTitle() {
	if (title == '') {
		document.getElementById('titleReq').style = 'opacity: 1;';
	}
}

/**
 * If the input date is older than the current date,
 * then display the error message
 */
function checkFutureDate() {
	let inputDate = new Date(dueDate);
	let currentDate = new Date();
	if (inputDate < currentDate) {
		document.getElementById('dateReq').style = 'opacity: 1';
	}
}

/**
 * If the dueDate variable is empty, then make the dateReq div visible.
 */
function checkDueDateExists() {
	if (dueDate == '') {
		document.getElementById('dateReq').style = 'opacity: 1;';
	}
}

/**
 * If the category variable is empty, then make the catReq element visible.
 */
function checkCategory() {
	if (category == '') {
		document.getElementById('catReq').style = 'opacity: 1;';
		document.getElementById('catReq').classList.remove('listD-none');
	}
}

/**
 * If the description is empty, make the description required message visible.
 */
function checkDiscription() {
	if (descripten == '') {
		document.getElementById('descReq').style = 'opacity: 1;';
	}
}

/**
 * If no priority is selected, make the prioReq element visible.
 */
function checkPriorityExists() {
	if (noPrioritySelected()) showRequiredTextPriority();
}

function noPrioritySelected() {
	const notSelected = !urgentBtn.classList.contains('urgent-color') && !mediumBtn.classList.contains('medium-color') && !lowBtn.classList.contains('low-color') && !addTaskUrgent.classList.contains('urgent-color') && !addTaskMedium.classList.contains('medium-color') && !addTaskLow.classList.contains('low-color');
	return notSelected;
}

function showRequiredTextPriority() {
	document.getElementById('prioReq').style = 'opacity: 1';
}

/**
 * this function enable or disable the indication 'this field is required'.
 */
function setRequiredTextWarnings() {
	checkTitle();
	checkFutureDate();
	checkDueDateExists();
	checkCategory();
	checkDiscription();
	checkPriorityExists();
}

/**
 * this function get all required fields values.
 */
function getReqiredFieldValues() {
	title = document.getElementById('addTaskTitle').value;
	title = title.trim();
	dueDate = document.getElementById('dueDate').value;
	dueDate = dueDate.trim();
	descripten = document.getElementById('addTaskDescripten').value;
	descripten = descripten.trim();
	if (newCatInputActive) {
		category = document.getElementById('selectedCatInput').value;
	} else {
		category = document.getElementById('selectedCatInput').innerHTML;
	}
	category = category.trim();
}

/**
 * this function disable all 'This field is required' indications.
 */
function resetRequiredWarnings() {
	document.getElementById('titleReq').style = 'opacity: 0;';
	document.getElementById('dateReq').style = 'opacity: 0;';
	document.getElementById('catReq').style = 'opacity: 0;';
	document.getElementById('descReq').style = 'opacity: 0;';
	document.getElementById('prioReq').style = 'opacity: 0 !important;';
}

/**
 * Clear form data and elements in an add task form.
 */
function clearFormularData() {
	resetRequiredWarnings();
	clearTaskTitleAndDescription();
	clearSelectedCategory();
	clearDueDate();
	clearSubtasks();
	clearValidationMessages();
	resetAssignToList();
	emptySubTaskArray();
	renderSubtasks();
	closeCatList();
	clearTaskForce();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
}

/**
 * Clears the task title and description input fields in the HTML form.
 */
function clearTaskTitleAndDescription() {
	document.getElementById('addTaskTitle').value = '';
	document.getElementById('addTaskDescripten').value = '';
}

/**
 * Clears the selected category and resets the category dropdown to its default state
 */
function clearSelectedCategory() {
	document.getElementById('selectedCat').innerHTML = /*html*/`
	  <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
	  <span id='sColor'></span>
	  <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
		<img src="./assets/img/new_cat_cancel.png">
		<img src="./assets/img/bnt_divider.png" class='btnDivider'>
		<img src="./assets/img/akar-icons_check.png">
	  </div>
	  <img src="./assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * Clears the due date field.
 */
function clearDueDate() {
	document.getElementById('dueDate').value = '';
}

/**
 * Clears the selected subtasks and resets the subtask section to its default state.
 */
function clearSubtasks() {
	resetSubtaskSelections();
	selectedSubtasks = [];
}

/**
 * Clears any validation error messages that may be displayed.
 */
function clearValidationMessages() {
	document.getElementById('titleReq').style.opacity = '0';
	document.getElementById('dateReq').style.opacity = '0';
	document.getElementById('catReq').style.opacity = '0';
	document.getElementById('catReq').classList.add('listD-none');
}

/**
*Creates a new task and saves it to the task list.
@param {string} workflow - The workflow status of the new task.
@returns {Promise<void>} - A Promise that resolves when the task data is successfully saved.
*/
async function createTaskData(workflow) {
	await loadTask();
	getDataFromFomular();
	await createAssignToListForSave();
	await minOneSubtask();
	fillTaskData(workflow);
	pushTaskData();
	saveTask();
	// showAddDiv();
	setTimeout(initBoard, 1200);
	resetAssignToList();
	clearFormularData();
}

/**
*Checks if at least one subtask has been selected. If not, adds a default subtask.
*@returns - {Promise<void>} - Promise object that resolves with no value.
*/
async function minOneSubtask() {
	if (selectedSubtasks.length == 0) {
		selectedSubtasks = [{ subtaskText: 'Maintask', subtaskStatus: true }];
	}
}

/**
* Gets the values of the task description and subtask fields from the form and assigns them to the corresponding variables.
*/
function getDataFromFomular() {
	descripten = document.getElementById('addTaskDescripten').value;
	subTask = document.getElementById('subTask').value;
}

/**
* Creates an array of selected coworkers to assign the task to from the list of available coworkers.
* Only coworkers with a checked checkbox are included in the array.
* The resulting array is assigned to the global variable assignToArray.
*/
async function createAssignToListForSave() {
	assignToArray = [];
	for (let i = 0; i < coworkersToAssignTo.length; i++) {
		let checkStatus = coworkersToAssignTo[i]['check'];
		if (checkStatus) {
			assignToArray.push(coworkersToAssignTo[i]);
		}
	}
}

/**
 * this fuction collect all data for the Taskcard in a JSON format.
 */
function fillTaskData(workflow) {
	setSubtaskStatusForBoardToFalse();
	taskData = {
		title: title,
		descripten: descripten,
		category: category,
		catColor: catColor,
		assignedTo: assignToArray,
		dueDate: dueDate,
		prio: prio,
		subTasks: selectedSubtasks,
		workFlowStatus: workflow,
		creator: allUsers[loggedInUserIndex]['name'],
	};
	catColor = '';
}

/**
 * Sets the subtask status for the board to false.
 */
function setSubtaskStatusForBoardToFalse() {
	for (let i = 0; i < selectedSubtasks.length; i++) {
		selectedSubtasks[i]['subtaskStatus'] = false;
	}
}

/**
 * this function push all Taskdata to the main Array.
 */
function pushTaskData() {
	joinTaskArray.push(taskData);
}

// deleteJoinTaskArrayFromServer() is not used in this code, it is only to remove the Array from Server!!!!!!!!!!!
async function deleteJoinTaskArrayFromServer() {
	// localStorage.removeItem('joinTaskArray');
	await backend.deleteItem('joinTaskArray');
}

/**
 * Updates the source of the "clear" image element in the add task form to display a blue "close" logo.
 */
function addTaskClearOn() {
	document.getElementById('addTaskClear').src = '././assets/img/close_logo_blue.png';
}

/**
 * Sets the image source of the "addTaskClear" element to "./assets/img/close_logo.png", which changes the appearance of the image.
 */
function addTaskClearOff() {
	document.getElementById('addTaskClear').src = './assets/img/close_logo.png';
}

/**
 * Adds priority to task based on selected button.
 * @param {Number} - prioIdIndex 
 */
async function addPrio(prioIdIndex) {
	let idList = ['addTaskUrgent', 'addTaskMedium', 'addTaskLow'];
	let selectedId = idList[+prioIdIndex];
	let cListLength = document.getElementById(selectedId).classList.length;
	let btnName = selectedId.replace('addTask', '');
	idList.splice(prioIdIndex, 1);
	if (btnNotSelected(cListLength)) {
		selectPrioBtn(selectedId, btnName);
		unselectOtherBtn(idList);
	} else {
		removeBtnSelection(btnName);
	}
}

/**
 * Checks if a button is currently not selected based on the number of its CSS classes.
 *
 * @param {number} cListLength - The number of CSS classes of the button.
 * @returns {boolean} - True if the button is not selected, false otherwise.
 */
function btnNotSelected(cListLength) {
	return cListLength == 1;
}

/**
 * Selects and styles the priority button when clicked.
 * @param {string} selectedId - The id of the selected priority button.
 * @param {string} btnName - The name of the selected priority button.
 */
function selectPrioBtn(selectedId, btnName) {
	document.getElementById(selectedId).classList.add(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.add('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}_white.png`;
	prio = btnName;
}

/**
 * Removes the selection from the priority button of the given name.
 * @param {string} btnName - The name of the priority button to deselect.
 */
function removeBtnSelection(btnName) {
	document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
}

/**
* Unselects other buttons and removes their styling if they are currently selected.
* @param {string[]} idList - An array of strings representing the IDs of the buttons to unselect.
*/
function unselectOtherBtn(idList) {
	for (let i = 0; i < idList.length; i++) {
		let selectedId = idList[i];
		let cListLength = document.getElementById(selectedId).classList.length;
		let btnName = selectedId.replace('addTask', '');
		if (btnIsSelected(cListLength)) {
			document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
			document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
			document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
		}
	}
}

/**
 * Checks if a button is currently selected.
 * @param {number} cListLength - The length of the class list of the button element.
 * @returns {boolean} - True if the button is currently selected, false otherwise.
 */
function btnIsSelected(cListLength) {
	return cListLength == 2;
}

/**
 * Hides the "cross" icon and shows the "subtask" icon when a user enters text in the subtask input field.
 */
function subTaskInputentered() {
	document.getElementById('subtaskCross').classList.add('d-none');
	document.getElementById('subTaskImgDiv').classList.remove('d-none');
}

