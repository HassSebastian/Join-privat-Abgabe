/*=======================
   ASSIGN TO FUNCTIONS 
=======================*/

/**
 * Shows or hides drob down menu of assignTo
 */
function showHideDropDownAssignTo() {
	document.getElementById('dropdown2').classList.toggle('listD-none');
}

function enableDisableAssignList() {
	if (!assignListStatus) {
		borderBottomOffAssignedBoxButton('addTaskAssignedButton');
		showHideDropDownAssignTo();
		hideBadgesTaskForce();
	} else {
		borderBottomOnAssignedBoxButton('addTaskAssignedButton');
		showHideDropDownAssignTo();
		showBadgesTaskForce();
	}
	assignListStatus = !assignListStatus;
}

function enableAssignList() {
	showHideDropDownAssignTo();
	assignListStatus = !assignListStatus;
}

/**
 * When the user clicks the 'Add Task' button,
 * the border radius of the 'Add Task' button will change
 * to 10px 10px 0 0.
 */
function borderBottomOffAssignedBoxButton(id) {
	document.getElementById(id).style = `border-radius: 10px 10px 0 0;`;
}

/**
 * It changes the border radius of the button with the id of 'addTaskAssignedButton'
 * to 10px.
 */
function borderBottomOnAssignedBoxButton(id) {
	document.getElementById(id).style = `border-radius: 10px 10px 10px 10px;`;
}

/**
 * Sets the placeholder of inputField to "contact email"
 */
function assignChangeInputPlaceholderToContactEmail() {
	document.getElementsByName('selectedAssign')[0].placeholder = `Contact email`;
}

/**
 * Disables inputField at addTaskAssignTo
 */
function enableInputaddTasAssign() {
	document.getElementById('selectedAssign').disabled = false;
}

/**
 * Shows btn to delete or confirm filled in input
 */
function showCancelConfirmButtons() {
	document.getElementById('assignToCancelConfirmImgContainer').classList.remove('d-none');
}

/**
 * Hides assignDropDownImg
 */
function hideAssignDropDownImg() {
	document.getElementById('assignDropDownImg').classList.add('d-none');
}

/**
 * Takes assign inpu in focus
 */
function assignInputAutoFocus() {
	document.getElementById('selectedAssign').focus();
}

/**
 * Prepares everything to to being able to assign someone to current task.
 */
function assigendContactEmail() {
	assignChangeInputPlaceholderToContactEmail();
	enableInputaddTasAssign();
	showCancelConfirmButtons();
	hideAssignDropDownImg();
	assignInputAutoFocus();
	changeAssignPlaceholderColorToGrey();
}

function doNotCloseOnClick(event) {
	event.stopPropagation();
}

function assignInputPlaceholderToDefaultMode() {
	document.getElementsByName('selectedAssign')[0].placeholder = `Select contacts to Assign`;
}

function assignInputValueToDefault() {
	document.getElementById('selectedAssign').value = '';
}

function hideCancelConfirmButtons() {
	document.getElementById('assignToCancelConfirmImgContainer').classList.add('d-none');
}

function showAssignDropDownImg() {
	document.getElementById('assignDropDownImg').classList.remove('d-none');
}

function disableInputAddTasAssign() {
	document.getElementById('selectedAssign').disabled = true;
}

function changeAssignPlaceholderColorToGrey() {
	document.getElementById('selectedAssign').classList.add('greyPlaceholder');
}

function changeAssignPlaceholderColorToDefault() {
	document.getElementById('selectedAssign').classList.remove('greyPlaceholder');
}

function assignBoxBackToDefaultMode() {
	assignInputPlaceholderToDefaultMode();
	changeAssignPlaceholderColorToDefault();
	assignInputValueToDefault();
	hideCancelConfirmButtons();
	showAssignDropDownImg();
	disableInputAddTasAssign();
}

/**
 * Find the index of the member of the task force whose email address is the same as the email address
 * passed in as a parameter.
 * @param emailAddressLoggedUser - The email address of the member of the task force.
 * @returns The index of the member of the task force.
 */
function findIndexOfMemberOfTaskForce(emailAddressLoggedUser) {
	return taskForce.findIndex((memberOfTaskForce) => {
		return memberOfTaskForce.email == emailAddressLoggedUser;
	});
}

/**
 * Shows check mark of contact in assignTo list
 * @param {number} contact
 */
function addCheckMarkToCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.remove('d-none');
}

/**
 * Adds so of contact list to taskForce
 * @param {number} contact
 */
function addSelectedContactToTaskForce(contact) {
	taskForce.push(coworkersToAssignTo[contact]);
}

/**
 *
 * @param {number} contact
 */
function removeCheckMarkFromCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.add('d-none');
}

/**
 * Takes a member off the taskForce
 * @param {number} index
 */
function removeSelectedContactFromTaskForce(index) {
	taskForce.splice(index, 1);
}

/**
 * @param addedToTaskForce - boolean, true if the contact is already in the task force, false if not
 * @param contact - the contact that was selected
 * @param indexOfMemberInTaskForce - The index of the contact in the task force array.
 */
function addRemoveToggleForTaskForce(addedToTaskForce, contact, indexOfMemberInTaskForce) {
	if (!addedToTaskForce) {
		addCheckMarkToCheckBox(contact);
		addSelectedContactToTaskForce(contact);
		renderBadgesMemberOfTaskForce();
	} else {
		removeCheckMarkFromCheckBox(contact);
		removeSelectedContactFromTaskForce(indexOfMemberInTaskForce);
		renderBadgesMemberOfTaskForce();
	}
}

/**
 * It adds a contact to the task force if the contact is not already in the task force, and removes the
 * contact from the task force if the contact is already in the task force.
 * @param contact - the name of the contact
 */
function addContactToTaskForceWithCheckBox(contact) {
	let addedToTaskForce = coworkersToAssignTo[contact].check;
	let emailAddressLoggedUser = coworkersToAssignTo[contact].email;
	let indexOfMemberOfTaskForce = findIndexOfMemberOfTaskForce(emailAddressLoggedUser);
	addRemoveToggleForTaskForce(addedToTaskForce, contact, indexOfMemberOfTaskForce);
	addedToTaskForce = !addedToTaskForce;
	coworkersToAssignTo[contact].check = addedToTaskForce;
}

/**
 * This function loops through the assignedContacts array and generates a list of contacts for the
 * dropdown menu.
 */
async function renderContactsInAssignDropDownMenu() {
	let assignedContactList = document.getElementById('dropdown2');
	coworkersToAssignTo.forEach((coworker, contact) => {
		if (notLoggedUser(contact)) assignedContactList.innerHTML += generateAssignContactListForDropDownMenu(coworker.name, contact);
	});
}

/**
 *
 * @param {object} coworker
 * @param {number} contact
 * @returns boolean
 * !NAME UND FUNKTION ÜBERARBEITEN
 */
function notLoggedUser(contact) {
	return contact !== loggedInUserIndex;
}

/**
 * Renders logged user into assignTo list under "you"
 */
async function renderLoggedUserInAssignDrobDownMenuIntoYou() {
	let contact = loggedInUserIndex;
	let name = coworkersToAssignTo[loggedInUserIndex].name;
	let assignedContactList = document.getElementById('dropdown2');
	assignedContactList.innerHTML += generateLoggedUserHtml(name, contact);
}

/**
 * Sets check status to false
 */
function checkStatusToFalse() {
	coworkersToAssignTo.forEach((coworker, i) => {
		if (!(coworker.email == 'guest@web.de')) {
			coworker.check = false;
			removeCheckMarkFromCheckBox(i);
		}
	});
}

/**
 * It takes the first and last name of each member of the task force and generates a badge for each
 * member.
 */
function renderBadgesMemberOfTaskForce() {
	let badgeContainer = document.getElementById('badgesTaskForce');
	badgeContainer.innerHTML = '';
	taskForce.forEach((member, i) => {
		const initials = member.firstSecondLetter;
		const name = member.name;
		const badgesIndex = member.colorIndex;

		/* chooseColorForTaskForceBadge(initialFirstName, initialLastName); */
		badgeContainer.innerHTML += generateBadgesTaskForceHtml(i, name, initials, badgesIndex);
	});
}

/**
 * Show assignTo-list by removing d-none class
 */
function showBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.remove('d-none');
}

/**
 * Closes assignTo-List
 */
function hideBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.add('d-none');
}

/**
 * Closes assignTo-List if open
 * @param {boolean} assignListStatus
 */
function closeDropDownAssignTo() {
	assignListStatus ? enableDisableAssignList() : null;
}

/**
 * Sets taskForce and assignTo checkMarks to default mode; restricteds in guestLogIn
 * @param {boolean} guestLoggedIn
 */
function clearTaskForce() {
	if (!guestLoggedIn) checkStatusToFalse();
	taskForce = [];
	renderBadgesMemberOfTaskForce();
	closeDropDownAssignTo();
}

/**
 * Opens window with a message
 */
function frontEndDeveloper() {
	alert('This function is part of backend. The course is about frontend though');
}
