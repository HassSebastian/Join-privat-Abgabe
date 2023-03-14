let workStatusArray = [];
let workStatus0Array = [];
let workStatus1Array = [];
let workStatus2Array = [];
let workStatus3Array = [];
let boardEditedPrio = '';
let currentDraggedElement;
let showContributorsPrioIcons = { M: './assets/img/medium.png', U: './assets/img/urgent.png', L: './assets/img/low.png' };
let categoryBackgroundColors = ['#8aa4ff', '#ff0000', '#2ad300', '#ff8a00', '#e200be', '#0038ff'];
let prioColorAndUrlArray = [
	{
		urgent: ['#FF3D00', './assets/img/urgent_white.png'],
		medium: ['#FFA800', './assets/img/medium_white.png'],
		low: ['#7AE229', './assets/img/low_white.png'],
	},
];

/**
 * The function initBoard() is an async function that calls the async functions includeHTML(),
 * renderBoard(), loadTask(), and createWorkStatusArrays(), and then calls the function
 * renderAllCards().
 */
async function initBoard() {
	sliderMenuShown = false;
	await renderBoard();
	selectedMenuButton(2);
	await createWorkStatusArrays();
	renderAllCards();
	loadContributorsLetter();
	coworkersToAssignTo = transferallUserData();
	/* await checkBoardInitMode(); */
}

async function initBoardNormal() {
	sliderMenuShown = false;
	await renderBoard();
	selectedMenuButton(2);
	await createWorkStatusArrays();
	renderAllCards();
	loadContributorsLetter();
}

/**
 * this function render the basic board html structur into the HTML template div content.
 */
async function renderBoard() {
	document.getElementById('content').innerHTML = '';
	if (!(selectedMenuBtnId == 2)) {
		/* await enableBoardStyles(); */
		await loadTask();
	}
	document.getElementById('content').innerHTML += boardHtml();
	// document.getElementById('content').innerHTML += boardHtmlRESPOSIV();
}

/**
 * This function clear all Arrays related to the workstatus.
 * The workstatus is releted to the progress of processing of the task.
 */
async function resetWorkStatusArrays() {
	workStatus0Array = [];
	workStatus1Array = [];
	workStatus2Array = [];
	workStatus3Array = [];
	workStatusArray = [workStatus0Array, workStatus1Array, workStatus2Array, workStatus3Array];
}

/**
 * For each element in the joinTaskArray, if the element's workFlowStatus is equal to the index, then
 * createWorkStatusArrayData(index, i)
 */
async function createWorkStatusArrays() {
	await resetWorkStatusArrays();
	for (let index = 0; index < 4; index++) {
		for (let i = 0; i < joinTaskArray.length; i++) {
			let taskWorkStatus = joinTaskArray[i]['workFlowStatus'];
			if (taskWorkStatus == index) {
				createWorkStatusArrayData(index, i);
			}
		}
	}
}

/**
 * It takes the data from the joinTaskArray and creates a new array called workStatusArray.
 * @param index - the index of the array that the json will be pushed to
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function createWorkStatusArrayData(index, taskIndex) {
	let cardTitle = joinTaskArray[taskIndex]['title'];
	let cardDescription = joinTaskArray[taskIndex]['descripten'];
	let cardCatColor = joinTaskArray[taskIndex]['catColor'];
	let cardCategory = joinTaskArray[taskIndex]['category'];
	let cardPrio = joinTaskArray[taskIndex]['prio'];
	let subTasks = joinTaskArray[taskIndex]['subTasks'];
	let assignedToList = joinTaskArray[taskIndex]['assignedTo'];
	let wJson = createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex, assignedToList);
	workStatusArray[index].push(wJson);
}

/**
 * It takes in a bunch of parameters and returns a JSON object.
 * @param cardTitle - The title of the card.
 * @param cardDescription - The description of the card.
 * @param cardCatColor - The color of the category of the card.
 * @param cardCategory - The category of the card (e.g. 'Bug', 'Feature', 'Task', etc.)
 * @param cardPrio - is the priority of the task.
 * @param subTasks - This is an array of objects that contain the following:
 * @param taskIndex - The index of the task in the list of tasks.
 * @param assignedToList - This is a list of objects that contain the name and email of the person
 * assigned to the task.
 * @returns An object with the following properties:
 * cardTitle
 * cardDescription
 * cardCatColor
 * cardCategory
 * cardPrio
 * subTasks
 * taskIndex
 * assignedTo
 */
function createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex, assignedToList) {
	return {
		cardTitle: cardTitle,
		cardDescription: cardDescription,
		cardCatColor: cardCatColor,
		cardCategory: cardCategory,
		cardPrio: cardPrio,
		subTasks: subTasks,
		taskIndex: taskIndex,
		assignedTo: assignedToList,
	};
}

/**
 * This function renders all the cards in the Kanban board.
 */
async function renderAllCards() {
	if (selectedMenuBtnId == 2) {
		renderToDoCards();
		renderInProgressCards();
		renderAwaitingFeedbackCards();
		renderDoneCards();
		renderAssignTo();
	}
}

/**
 * It takes two numbers, divides the first by the second, and multiplies the result by 100
 * @param number - The number you want to calculate the percentage of.
 * @param total - The total number of items.
 * @returns The percentage of the number in relation to the total.
 */
function calculatePercentage(number, total) {
	return (number / total) * 100;
}

/**
 * It loops through an array of objects, and for each object, it adds a card to the DOM.
 */
async function renderToDoCards() {
	document.getElementById('toDoDiv').innerHTML = '';
	for (let i = 0; i < workStatus0Array.length; i++) {
		document.getElementById('toDoDiv').innerHTML += toDoCardHtml(i);
		let taskIndex = workStatus0Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus0();
}

/**
 * For each array in the workStatusArray, for each object in the array, get the taskIndex property of
 * the object and pass it to the renderAssignToHtml function.
 */
function renderAssignTo() {
	for (let i = 0; i < workStatusArray.length; i++) {
		for (let index = 0; index < workStatusArray[i].length; index++) {
			let taskIndex = workStatusArray[i][index]['taskIndex'];
			renderAssignToHtml(taskIndex);
		}
	}
}

/**
 * The function determindSubTasksDone() takes two arguments, the first is the index of the
 * workStatusArray[workStatusArrayNo] array, the second is the index of the workStatusArray array. The
 * function returns the amount of subTasks that are done.
 * @param arrayIndex - the index of the task in the array
 * @param workStatusArrayNo - the index of the workStatusArray that you want to check.
 * @returns The amount of subTasks that are done.
 */
function determindSubTasksDone(arrayIndex, workStatusArrayNo) {
	let doneAmount = 0;
	for (let i = 0; i < workStatusArray[workStatusArrayNo][arrayIndex]['subTasks'].length; i++) {
		let subTaskStatus = workStatusArray[workStatusArrayNo][arrayIndex]['subTasks'][i]['subtaskStatus'];
		if (subTaskStatus) {
			doneAmount += 1;
		}
	}
	return doneAmount;
}

/**
 * this function set the backgroundcolor of the catogory in the todo task card.
 */
function setCategoryBackgroundColorForWorkStatus0() {
	for (let i = 0; i < workStatus0Array.length; i++) {
		let cardCatColor = workStatus0Array[i]['cardCatColor'];
		let catBackground = categoryBackgroundColors[cardCatColor];
		document.getElementById(`toDoCardCat${i}`).style = `background-color: ${catBackground};`;
	}
}

/**
 * this function render all in progress cards.
 */
function renderInProgressCards() {
	document.getElementById('progressDiv').innerHTML = '';
	for (let i = 0; i < workStatus1Array.length; i++) {
		document.getElementById('progressDiv').innerHTML += inProgressHtml(i);
		let taskIndex = workStatus1Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus1();
}

/**
 * this function set the backgroundcolor of the catogory in the in progress task card.
 */
function setCategoryBackgroundColorForWorkStatus1() {
	for (let i = 0; i < workStatus1Array.length; i++) {
		let cardCatColor = workStatus1Array[i]['cardCatColor'];
		let catBackground = categoryBackgroundColors[cardCatColor];
		document.getElementById(`progressCard${i}`).style = `background-color: ${catBackground};`;
	}
}

/**
 * this function render all awaiting feedback cards.
 */
function renderAwaitingFeedbackCards() {
	document.getElementById('awaitingDiv').innerHTML = '';
	for (let i = 0; i < workStatus2Array.length; i++) {
		document.getElementById('awaitingDiv').innerHTML += awaitingFeedbackHtml(i);
		let taskIndex = workStatus2Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus2();
}

/**
 * this function set the backgroundcolor of the catogory in the awaiting feedback task card.
 */
function setCategoryBackgroundColorForWorkStatus2() {
	for (let i = 0; i < workStatus2Array.length; i++) {
		let cardCatColor = workStatus2Array[i]['cardCatColor'];
		let catBackground = categoryBackgroundColors[cardCatColor];
		document.getElementById(`feedbackCard${i}`).style = `background-color: ${catBackground};`;
	}
}

/**
 * this function render all done cards.
 */
function renderDoneCards() {
	document.getElementById('doneDiv').innerHTML = '';
	for (let i = 0; i < workStatus3Array.length; i++) {
		document.getElementById('doneDiv').innerHTML += doneHtml(i);
		let taskIndex = workStatus3Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus3();
}

/**
 * When the user scrolls down the page, the height of the drop areas will increase to match the height
 * of the page.
 */
function changeHeightDropArea() {
	const elmnt = document.getElementById('canbanBoard');
	let y = elmnt.scrollTop;
	let newHeight = y + 600;
	document.getElementById('dropArea0').style = `height: ${newHeight}px;`;
	document.getElementById('dropArea1').style = `height: ${newHeight}px;`;
	document.getElementById('dropArea2').style = `height: ${newHeight}px;`;
	document.getElementById('dropArea3').style = `height: ${newHeight}px;`;
}

/**
 * this function set the backgroundcolor of the catogory in the done task card.
 */
function setCategoryBackgroundColorForWorkStatus3() {
	for (let i = 0; i < workStatus3Array.length; i++) {
		let cardCatColor = workStatus3Array[i]['cardCatColor'];
		let catBackground = categoryBackgroundColors[cardCatColor];
		document.getElementById(`doneCard${i}`).style = `background-color: ${catBackground} !important;`;
	}
}

/**
 * It takes the priority of a task and displays the corresponding icon.
 * @param taskIndex - The index of the task in the array.
 */
function showContributorsPrioIcon(taskIndex) {
	for (let a in showContributorsPrioIcons) {
		let prio = joinTaskArray[taskIndex].prio[0];
		if ((a = prio)) {
			document.getElementById(`contributorsPrioIcon${taskIndex}`).src = `${showContributorsPrioIcons[a]}`;
			break;
		}
	}
}

/**
 * thie function cache the id of the dragged element.
 * @param {string} id - the id is the id of the dragged element.
 */
function startDrag(id) {
	currentDraggedElement = id;
}

/**
 * this function allows to drop an draggable element.
 * @param {event} ev
 */
function allowDrop(ev) {
	ev.preventDefault();
}

function moveTo(area) {
	let doneBarDraggedElement = document.getElementById(`doneBar${currentDraggedElement}`);
	let doneBarOuterDraggedElement = document.getElementById(`doneBarOuter${currentDraggedElement}`);
	let doneBarWidth = doneBarDraggedElement.offsetWidth;
	let doneBarOuterWidth = doneBarOuterDraggedElement.offsetWidth;
	let workFlowStatusDraggedElement = joinTaskArray[currentDraggedElement]['workFlowStatus'];
	if ((doneBarWidth == doneBarOuterWidth && workFlowStatusDraggedElement >= 1) || (workFlowStatusDraggedElement < 1 && area < 2) || area < workFlowStatusDraggedElement) {
		moveToNewArea(area);
	} else {
		alert('Please finish all subtasks and to not skip a step.');
	}
}

async function moveToNewArea(area) {
	joinTaskArray[currentDraggedElement]['workFlowStatus'] = area;
	await saveTask();
	await createWorkStatusArrays();
	await renderAllCards();
	searchAfterPopup();
}

/**
 * this function change the backgroundcolor of the droparea, if a dragged element is over it.
 * @param {string} id - is the id of the element where the dragged element is over it.
 */
function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * this function reset the backgroundcolor settings during hovering of thedragged element.
 * @param {string} id - is the id of the element where the dragged element is dropped.
 */
function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}
