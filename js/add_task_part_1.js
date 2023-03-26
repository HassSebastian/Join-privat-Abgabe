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
	initAddTaskMobHighlight();
}

/**
 * Initializes the subfunctions for the add task interface, including rendering the category list, subtasks, 
 * assignee dropdown menu, due date input, contributors letter, priority button IDs, and other elements.
 */
function initSubfunctionAddTask() {
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


