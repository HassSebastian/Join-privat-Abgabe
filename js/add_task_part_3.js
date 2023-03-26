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
	subTaskArray.splice(i, 1);
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