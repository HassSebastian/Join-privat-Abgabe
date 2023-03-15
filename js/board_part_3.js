
let searchTerm;
let arrayMoveBtnText = [
	{
		workStatus: 0,
		btn: ['Task to "In progress"'],
		newStatus: [1],
	},
	{
		workStatus: 1,
		btn: ['Task to "To do"', 'Task to "Awaiting Feedback"'],
		newStatus: [0, 2],
	},
	{
		workStatus: 2,
		btn: ['Task to "In progress"', 'Task to "Done"'],
		newStatus: [1, 3],
	},
	{
		workStatus: 3,
		btn: ['Task to "Awaiting Feedback"'],
		newStatus: [2],
	},
];


/**
 * When the user types in the search field, get the search term and convert it to lowercase. Then, for
 * each card, get the card title and convert it to lowercase. If the card title contains the search
 * term, display the card. Otherwise, hide the card.
 */
function startSearch() {
	let cards = document.querySelectorAll('.taskBackground'); // Select all elements with class "taskBackground"

	document.getElementById('searchField').addEventListener('input', function () {
		searchTerm = this.value.trim().toLowerCase();
		cards.forEach(function (card) {
			let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
			let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
			if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	});
}

/**
 * Calls the desktop version of the search after popup function.
 */
function searchAfterPopup() {
	searchAfterPopupDesktop();
}

/**
 * It searches for the search term in the title and description of the cards and displays the cards
 * that contain the search term.
 * </code>
 */
function searchAfterPopupDesktop() {
	let cards = document.querySelectorAll('.taskBackground');
	if (searchTerm) {
		searchTerm = searchTerm.trim();
		if (searchTerm != '') {
			cards.forEach(function (card) {
				let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
				let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
				if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
					card.style.display = 'block';
				} else {
					card.style.display = 'none';
				}
			});
		}
	}
}

/**
 * Searches for cards containing the search term in the mobile view.
 * @function
 * @returns {void}
 */
function searchAfterPopupMobil() {
	let cards = document.querySelectorAll('.taskBackgroundMobil');
	if (searchTerm) {
		searchTerm = searchTerm.trim();
		if (searchTerm != '') {
			cards.forEach(function (card) {
				let cardTitle = card.querySelector('.taskHeadlineContentMobil').textContent.toLowerCase();
				let cardDescription = card.querySelector('.taskContentMobil').textContent.toLowerCase();
				if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
					card.style.display = 'block';
				} else {
					card.style.display = 'none';
				}
			});
		}
	}
}

/**
 * Renders a move button after a change has been made to a subtask, waiting for the changes to be saved first.
 * @async
 * @function
 * @param {number} taskIndex - The index of the task that was modified.
 * @returns {Promise<void>} - A promise that resolves when the move button is rendered.
 */
async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
}

/**
 * Saves the changes made to a task's details view, creates work status arrays and renders all cards.
 * @async
 * @function saveChangesDetailView
 * @returns {Promise<void>} A Promise that resolves once the changes have been saved and rendered.
 */
async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
}

/**
 * Renders move buttons in the mobile view for a given task index.
 *
 * @async
 * @function renderMoveBtnMobil
 * @param {number} taskIndex - The index of the task to render the move buttons for.
 * @returns {Promise} A promise that resolves when the move buttons are rendered.
 */
async function renderMoveBtnMobil(taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML = '';
	let workStatus = joinTaskArray[taskIndex]['workFlowStatus'];
	let buttonArray = arrayMoveBtnText[workStatus]['btn'];
	let forLoppEndValue = buttonArray.length;
	let newStatusArray = arrayMoveBtnText[workStatus]['newStatus'];
	if (workStatus >= 1 && workStatus < 3) {
		forLoppEndValue = taskCardAllowMove(taskIndex);
	}
	for (let i = 0; i < forLoppEndValue; i++) {
		let buttonText = buttonArray[i];
		let newTaskStatus = newStatusArray[i];
		renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex);
	}
}

/**
 * Hides the board popup on mobile devices.
 */
function closeBoardMobilDetailOverlay() {
	document.getElementById('boardPopup').classList.add('d-none');
}

/**
 * Updates the move button in the mobile view of a task card after a change in the subtask(s) of the card.
 * Saves any changes made to the task card using the `saveChangesDetailView` function, and then calls the
 * `renderMoveBtnMobil` function to update the move button with the new available options based on the
 * current status of the card.
 *
 * @async
 * @function renderBtnBySubtaskChange
 * @param {number} taskIndex - The index of the task card whose move button needs to be updated.
 * @returns {Promise<void>} A Promise that resolves when the move button has been updated.
 */
async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
}

/**
 * Saves the task, creates the work status arrays, and re-renders all cards.
 *
 * @async
 * @function saveChangesDetailView
 * @returns {Promise<void>}
 */
async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
}

/**
 * Renders move buttons on the mobile view of a task card, based on its current workFlowStatus.
 *
 * @async
 * @function renderMoveBtnMobil
 * @param {number} taskIndex - The index of the task to render move buttons for.
 * @returns {Promise<void>} - A Promise that resolves when the move buttons have been rendered.
 */
async function renderMoveBtnMobil(taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML = '';
	let workStatus = joinTaskArray[taskIndex]['workFlowStatus'];
	let buttonArray = arrayMoveBtnText[workStatus]['btn'];
	let forLoppEndValue = buttonArray.length;
	let newStatusArray = arrayMoveBtnText[workStatus]['newStatus'];
	if (workStatus >= 1 && workStatus < 3) {
		forLoppEndValue = taskCardAllowMove(taskIndex);
	}
	for (let i = 0; i < forLoppEndValue; i++) {
		let buttonText = buttonArray[i];
		let newTaskStatus = newStatusArray[i];
		renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex);

	}
}

/**
 * Renders the HTML code for a button to move tasks on mobile devices.
 * @param {string} buttonText - The text to be displayed on the button.
 * @param {string} newTaskStatus - The new status of the task being postponed.
 * @param {number} taskIndex - The index of the task being moved.
 */
function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML += /*html*/ `
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}

/**
 * Moves a task to a new status on mobile and refreshes the view.
 *
 * @async
 * @function
 * @param {number} taskIndex - The index of the task being moved.
 * @param {string} newTaskStatus - The new status of the task.
 * @returns {Promise<void>}
 */
async function moveMobilTaskTo(taskIndex, newTaskStatus) {
	joinTaskArray[taskIndex]['workFlowStatus'] = newTaskStatus;
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
	closeBoardMobilDetailOverlay();
}

/**
 * Determines whether a task card can be moved on the board view.
 *
 * @function
 * @param {number} taskIndex - The index of the task card.
 * @returns {number} - Returns a numeric value indicating whether the map can be moved (1) or not (2).
 */
function taskCardAllowMove(taskIndex) {
	let endValue;
	let doneBarDraggedElement = document.getElementById(`doneBar${taskIndex}`);
	let doneBarOuterDraggedElement = document.getElementById(`doneBarOuter${taskIndex}`);
	let doneBarWidth = doneBarDraggedElement.offsetWidth;
	let doneBarOuterWidth = doneBarOuterDraggedElement.offsetWidth;
	if (doneBarWidth == doneBarOuterWidth) {
		endValue = 2;
	} else {
		endValue = 1;
	}
	return endValue;
}

/**
 * Starts an interval to show the task creation popup when it is not showing and the screen is wide enough.
 *
 * @function
 * @returns {void}
 */
let addTaskContactsResponsiveOn = false;
let addTaskOpen;
function startIntervalWhenOff() {
	const interval = setInterval(() => {
		if (window.innerWidth > 563 && !addTaskContactsResponsiveOn && addTaskOpen) {
			showAddTaskPopupWindow();
			addTaskContactsResponsiveOn = true;
			clearInterval(interval);
			startIntervalWhenOn();
			addTaskOpen = true;
		}
	}, 100);
}

/**
 * Starts an interval to show the task creation popup when it is shown and the screen is too narrow.
 *
 * @function
 * @returns {void}
 */
function startIntervalWhenOn() {
	const interval = setInterval(() => {
		if (window.innerWidth < 563 && addTaskContactsResponsiveOn && addTaskOpen) {
			showAddTaskPopupWindow();
			addTaskContactsResponsiveOn = false;
			clearInterval(interval);
			startIntervalWhenOff();
			addTaskOpen = true;
		}
	}, 100);
}

/**
 * Starts the functions to automatically display the task creation pop-up window based on the width of the screen.
 *
 * @function
 * @returns {void}
 */
function addTaskContactAutomaticResponisive() {
	startIntervalWhenOff();
	startIntervalWhenOn();
}

/**
 * Set the addTaskOpen variable to `false` to indicate that the task creation popup window has been closed.
 *
 * @function
 * @returns {void}
 */
function trackThatAddTaskIsClose() {
	addTaskOpen = false;
}

/**
 * Set the addTaskOpen variable to `true` to indicate that the task creation popup is allowed to be displayed.
 *
 * @function
 * @returns {void}
 */
function allowAddTaskPopUp() {
	addTaskOpen = true;
}
