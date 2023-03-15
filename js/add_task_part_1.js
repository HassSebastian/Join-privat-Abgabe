'use strict';
let transferArray = [];
let catListStatus = false;
let assignListStatus = false;
let newCatInputActive = false;
let addTaskCategoryList = [];
let joinTaskArray = [];
let taskData = {};
let title = '';
let descripten = '';
let category = '';
let catColor = '';
let assigndTo = '';
let taskForce = [];
let assignToArray = [];
let dueDate = '';
let prio = '';
let subTask = '';
let subTaskArray = [];
let selectedSubtasks = [];
let badgesIndex;
let guestId;
let coworkersToAssignTo = [];
let urgentBtn;
let mediumBtn;
let lowBtn;
let addTaskOpened = false;

/**
 * Initializes the add task functionality, rendering the add task interface and initializing subfunctions.
 */
async function initAddTask() {
	transferArray = [];
	sliderMenuShown = false;
	await renderAddTask();
	initSubfunctionAddTask();
}

/**
 * Initializes the subfunctions for the add task interface, including rendering the category list, subtasks, 
 * assignee dropdown menu, due date input, contributors letter, priority button IDs, and other elements.
 */
function initSubfunctionAddTask(){
	renderCategoryList();
	newCatInputActive = false;
	renderSubtasks();
	selectedMenuButton(3);
	renderLoggedUserInAssignDrobDownMenuIntoYou();
	renderContactsInAssignDropDownMenu();
	setFutureDatesOnlyForInputDueDate();
	loadContributorsLetter();
	taskForce = [];
	addSubtaskMain();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
	setIndexOfGuest();
	setPrioBtnIdElements();
}

/**
 * Sets the global priority button ID elements and opens the add task interface.
 */
function setPrioBtnIdElements() {
	urgentBtn = document.getElementById('addTaskUrgent');
	mediumBtn = document.getElementById('addTaskMedium');
	lowBtn = document.getElementById('addTaskLow');
	addTaskOpened = true;
}

/**
 * This function render the HTML content of "Add Task Menu" into the content div of the HTML template.
 *
 */
async function renderAddTask() {
	setInnerHtmlById('content', '');
	coworkersToAssignTo = transferallUserData();
	addCheckAttributeToCoworkersToAssignTo();
	await loadExitingCategories();
	document.getElementById('content').innerHTML += generateAddTaskHtml();
}

/**
 * Transfers allUserData needed to transferArray
 * @returns {object} transferArray
 */
function transferallUserData() {
	transferArray = [];
	coworkersToAssignTo = [];
	creatingTransferObjectOfContacts();
	return transferArray;
}

/**
 * Creates a copy of allUsers without password
 */
function creatingTransferObjectOfContacts() {
	allUsers.forEach((user) => {
		transferArray.push({
			colorIndex: user.colorIndex,
			email: user.email,
			firstSecondLetter: user.firstSecondLetter,
			name: user.name,
			phone: user.phone,
		});
	});
}

/**
 * Adds "check: false" to every  coworker in coworkersToAssignTo Object
 */
function addCheckAttributeToCoworkersToAssignTo() {
	coworkersToAssignTo.forEach((contact) => {
		contact.check = false;
	});
}

/**
 * On submit (enter) focus is on description
 */
function goToDescripten() {
	document.getElementById('addTaskDescripten').focus();
}

/**
 * On submit (enter) focus is on addTaskUrgent
 */
function goToPrio() {
	document.getElementById('addTaskUrgent').focus();
}

/**
 * This function load the data(key:joinTaskArray) from local storage.
 * Then it filter this data to create a JSON Array with existing categories.
 * !Christian has stopped cleaning here. To be continued later ;)
 */
async function loadExitingCategories() {
	await loadTask();
	addTaskCategoryList = [
		{
			category: 'New Category',
			catColor: '',
		},
	];
	joinTaskArray.forEach((task) => {
		const taskCategory = task['category'];
		const categoryColor = task['catColor'];

		const newCategoryItem = {
			category: taskCategory,
			catColor: categoryColor,
		};
		if (!checkCategoryList(newCategoryItem)) {
			addTaskCategoryList.push({
				category: taskCategory,
				catColor: categoryColor,
			});
		}
	});
}

/**
 * This function determind data(key:joinTaskArray) available in local storage.
 *
 * @returns true or false
 */
function joinTaskArrayExistInStorage() {
	return localStorage.getItem('joinTaskArray');
}

/**
 * This function enable or disable the Dropdown Menu of the category selector.
 */
function enableDisableCatList() {
	if (categoryListAndNewCategoryInputNotActive()) {
		document.getElementById('CatListDropdown').classList.remove('listD-none');
		document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
		borderBottomOffAssignedBoxButton('selectedCat');
	} else {
		document.getElementById('CatListDropdown').classList.add('listD-none');
		document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
		borderBottomOnAssignedBoxButton('selectedCat');
	}
	catListStatus = !catListStatus;
}

/**
 * Closes category list
 */
function closeCatList() {
	catListStatus ? enableDisableCatList() : null;
}

/**
 * This function determind "Dropdown Menu" of the category selector and "Category Input" active or not active.
 *
 * @returns true or false
 */
function categoryListAndNewCategoryInputNotActive() {
	return !catListStatus && !newCatInputActive;
}

/**
 * This function render the category list of the dropdown menu category.
 */
function renderCategoryList() {
	setInnerHtmlById('CatListDropdown', '');
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		let categoryName = addTaskCategoryList[i]['category'];
		let categoryColor = addTaskCategoryList[i]['catColor'];
		if (categoryColorAvailable(categoryColor)) {
			document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml(categoryName, categoryColor, i);
		} else {
			document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml1(categoryName, i);
		}
	}
}

/**
 * this function checked, a backgroundcolor is set for this category.
 * @param {number} categoryColor - This is a number that is equal to the css color classes. Example, if the number is 1
 * the related css color class is 'color1'.
 * @returns - true, if a backgroundcolor is set. if not, it returns false.
 */
function categoryColorAvailable(categoryColor) {
	return categoryColor != '';
}

/**
 * this function return the html code for the category list if backgroundcolor is available.
 * @param {string} categoryName - is the category name as string.
 * @param {number} categoryColor - is a number that is related to the category backgroundcolor.
 * @param {number} i - is the index number of the category array.
 * @returns - the html string for the category list if backgroundcolor is available.
 */
function dropdownCategoryListHtml(categoryName, categoryColor, i) {
	return /*html*/ `
        <li onclick='selectCategory(${i})'>
			${categoryName}
			<div  class='color${categoryColor} addTaskColorDiv'></div>
        </li>`;
}

/**
 * this function return the html code for the category list if backgroundcolor is not available.
 * @param {string} categoryName - is the category name as string.
 * @param {number} categoryColor - is a number that is related to the category backgroundcolor.
 * @param {number} i - is the index number of the category array.
 * @returns - the html string for the category list if backgroundcolor is not available.
 */
function dropdownCategoryListHtml1(categoryName, i) {
	return /*html*/ `
        <li onclick='selectCategory(${i})'>
            ${categoryName}
        </li>`;
}

/**
 * this function add a new category to the category list.
 */
function setNewCategoryToList() {
	let newSetCategory = document.getElementById('selectedCatInput').value;
	newSetCategory = newSetCategory.trim();
	if (newSetCategory != '') {
		let newCatColor = catColor;
		let newCategoryItem = {
			category: newSetCategory,
			catColor: newCatColor,
		};
		if (!checkCategoryList(newCategoryItem)) {
			addTaskCategoryList.push(newCategoryItem);
			let newCategoryIndex = addTaskCategoryList.length - 1;
			renderCategoryList();
			selectCategory(+newCategoryIndex);
			enableDisableCatList();
		}
		newCatInputActive = false;
	}
}

/**
 * Checks if a new category item already exists in the add task category list.
 */
function checkCategoryList(newCategoryItem) {
	let categoryName1 = newCategoryItem['category'];
	let categoryColor1 = newCategoryItem['catColor'];
	let doubleEntry = false;
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		let listCategory = addTaskCategoryList[i]['category'];
		let listCatColor = addTaskCategoryList[i]['catColor'];
		if (listCategory == categoryName1 && listCatColor == categoryColor1) {
			doubleEntry = true;
		}
	}
	return doubleEntry;
}

/**
 * this function set the input field for a new category to 'selected a category'.
 */
function resetCatSelection() {
	newCatInputActive = false;
	catListStatus = !catListStatus;
	document.getElementById('colorSelection').classList.add('listD-none');
	setInnerHtmlById('CatListDropdown', resetCatSelectionHtml());
}

/**
 * this function start subfunction to set the selected category (catId > 0) in the field category or open a input field to create a
 * new category (catId = 0)
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 */
function selectCategory(catId) {
	if (newCategoryCreationIsSelected(catId)) {
		setSettingsForNewCategoryInput();
	} else {
		setSettingsForExistingCategory(catId);
	}
}

/**
 * this function returns true or false for the if query. It is 'true' if the catId Value is 0.
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 * @returns - true or false for the if query
 */
function newCategoryCreationIsSelected(catId) {
	return catId == 0;
}

/**
 * this function render the category field to a input field to create a new category and
 * create on the right side of the category field a enter and cancel button for the new entered category name.
 */
function setSettingsForNewCategoryInput() {
	document.getElementById('selectedCat').innerHTML = newCategoryInputHtml();
	newCatInputActive = true;
	enableDisableCatList();
	document.getElementById('addTaskNewCatBtn').classList.remove('d-none');
	document.getElementById('dropdownImg').classList.add('d-none');
	document.getElementById('colorSelection').classList.remove('listD-none');
	setInnerHtmlById('sColor', '');
	addColorToCat(3);
}

/**
 * this function perform the settings for the category field indication for a existing category.
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 */
function setSettingsForExistingCategory(catId) {
	let newCat = addTaskCategoryList[catId]['category'];
	let categoryColor = addTaskCategoryList[catId]['catColor'];
	document.getElementById('selectedCat').innerHTML = existingCategoryHtml(newCat, categoryColor);
	catColor = categoryColor;
	enableDisableCatList();
	document.getElementById('dropdownImg').classList.remove('d-none');
	document.getElementById('colorSelection').classList.add('listD-none');
}

/**
 * this function set the settings for a selected catogory of the submenu of the new category creation.
 * @param {number} colorId
 */
function addColorToCat(colorId) {
	if (catColor != '' || catColor == '0') {
		document.getElementById('color' + catColor + 'Div').classList.remove('colorDivSelected');
		catColor = '';
	}
	document.getElementById('color' + colorId + 'Div').classList.add('colorDivSelected');
	catColor = colorId;
}

/**
 * this function show a popup, that indicated that the new task is succsessfully created.
 */
function showAddDiv() {
	document.getElementById('taskCreatedIndication').classList.add('taskCreatedIndication');
}

/**
 * this function inhibited to show a popup, that indicated that the new task is succsessfuly created.
 */
function notShowAddDiv() {
	document.getElementById('taskCreatedIndication').classList.remove('taskCreatedIndication');
}

/**
 * this function check over some subfunction, all required form values are valid. If not it starts subfuction
 * to indicated the required fields.
 */
function checkInputs(workflow) {
	getReqiredFieldValues();
	resetRequiredWarnings();
	if (requiredFieldAreNotValid()) {
		setRequiredTextWarnings();
	} else {
		createTaskData(workflow);
	}
}

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
	const notSelected = !urgentBtn.classList.contains('urgent-color') && !mediumBtn.classList.contains('medium-color') && !lowBtn.classList.contains('low-color');
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
		<img src="../assets/img/new_cat_cancel.png">
		<img src="../assets/img/bnt_divider.png" class='btnDivider'>
		<img src="../assets/img/akar-icons_check.png">
	  </div>
	  <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
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
	showAddDiv();
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

/**
* Hides the subtaskCross and shows the subtask image div when the subtask input is entered.
*/
function subTaskInputLeave() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText == '') {
		document.getElementById('subtaskCross').classList.remove('d-none');
		document.getElementById('subTaskImgDiv').classList.add('d-none');
	}
}

/**
 * Simulates the user clicking on the subTask input field by giving it focus.
 */
function enterSubTaskInput() {
	document.getElementById('subTask').onfocus();
}

/**
 * Resets the value of the "subTask" input element to an empty string.
 */
function resetSubtaskInput() {
	document.getElementById('subTask').value = '';
}

/**
 * Adds a new subtask to the task.
 */
function addSubtask() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText != '' && subTaskText.length >= 3) {
		subTaskInputLeave();
		pushNewSubtaskDatatoArray(subTaskText);
		renderSubtasks();
		resetSubtaskInput();
		createSubtaskListToSave();
	}
}

/**
* Adds a "Maintask" subtask to the subtaskArray and updates the UI.
*/
function addSubtaskMain() {
	let subTaskText = 'Maintask';
	subTaskArray = [];
	subTaskInputLeave();
	pushNewSubtaskDatatoArray(subTaskText);
	renderSubtasks();
	resetSubtaskInput();
	createSubtaskListToSave();
}

/**
 * Pushes a new subtask object to the subTaskArray with subtaskText and subtaskStatus properties.
 * @param {string} subTaskText - The text of the new subtask.
 */
function pushNewSubtaskDatatoArray(subTaskText) {
	let subtaskJson = {
		subtaskText: subTaskText,
		subtaskStatus: true,
	};
	subTaskArray.push(subtaskJson);
}

/**
 * Deletes the subtask object at the specified index from the subTaskArray and updates the display of subtasks.
 * @param {number} i - The index of the subtask object to be deleted.
 */
function deleteSubtask(i) {
	subTaskArray.splice(i);
	renderSubtasks();
	createSubtaskListToSave();
}

/**
* Renders the subtask list in the HTML.
* First, it calls the subtaskListHtml function to update the HTML with the current subtask list.
* Then, it loops through the subTaskArray and checks each subtask checkbox that has a subtaskStatus of true.
*/
async function renderSubtasks() {
	await subtaskListHtml();
	for (let i = 0; i < subTaskArray.length; i++) {
		if (subTaskArray[i]['subtaskStatus']) {
			document.getElementById(`subtask${i}`).checked = true;
		}
	}
}

/**
* Updates the HTML with the current subtask list.
* Loops through the subTaskArray and generates HTML for each subtask, including a checkbox, title, and delete button.
*/
async function subtaskListHtml() {
	document.getElementById('subtaskCheckboxes').innerHTML = '';
	for (let i = 0; i < subTaskArray.length; i++) {
		let subTaskTitle = subTaskArray[i]['subtaskText'];
		document.getElementById('subtaskCheckboxes').innerHTML += /*html*/ `
        <div>
            <input type="checkbox" id='subtask${i}' onclick='subtaskSelectionChange(${i})'>
            <span>${subTaskTitle}</span> <img onclick='deleteSubtask(${i})' src="assets/img/bin.png" alt="" style="height: 16px; width: 16px; margin-left: 8px;">
        </div>`;
	}
}

/**
* Updates the status of the subtask in the subTaskArray based on the checkbox selection.
* @param {number} subTaskIndex - Index of the subtask in the subTaskArray.
*/
function subtaskSelectionChange(subTaskIndex) {
	let actualSubTaskStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
	if (actualSubTaskStatus) {
		subTaskArray[subTaskIndex]['subtaskStatus'] = true;
	} else {
		subTaskArray[subTaskIndex]['subtaskStatus'] = false;
	}
	createSubtaskListToSave();
}

/**
* Creates a list of subtasks to be saved, based on the subTaskArray
*/
function createSubtaskListToSave() {
	selectedSubtasks = [];
	for (let i = 0; i < subTaskArray.length; i++) {
		let subTaskText = subTaskArray[i]['subtaskText'];
		let subTaskStatus = subTaskArray[i]['subtaskStatus'];
		let subtaskJson = {
			subtaskText: subTaskText,
			subtaskStatus: subTaskStatus,
		};
		if (subTaskStatus) {
			selectedSubtasks.push(subtaskJson);
		}
	}
}

/**
* Resets the checkboxes for subtask selection by unchecking all of them.
*/
function resetSubtaskSelections() {
	for (let i = 0; i < subTaskArray.length; i++) {
		document.getElementById(`subtask${i}`).checked = false;
	}
}

/**
* Removes all elements from the subTaskArray except for the first element
*/
function emptySubTaskArray() {
	subTaskArray.splice(1);
}

/**
 * gets Index of Guest
 */
function setIndexOfGuest() {
	guestId = allUsers.findIndex((user) => user.email === guestEmail);
}