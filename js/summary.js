let greetingOnce = false;
let noDueDate = 'No due date';

let loggedInUserIndex;
let emailAddressLoggedUser;

let numberInBoard = 0;
let numberToDo = 0;
let numberInProgress = 0;
let numberAwaitingFeedback = 0;
let numberDone = 0;
let numberUrgent = 0;

let allUpcomingTasks = [];
let tasksInBoard = [];
let toDoTasks = [];
let inProgressTasks = [];
let awatingFeedbackTasks = [];
let doneTasks = [];

async function initSummary() {
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await loadTask();
	resetsValues();
	selectedMenuButton(1);
	await loadAmountsForSummary();
	loadSummary();
}

function resetsValues() {
	resetCounters();
	resetsTasksArrays();
}

function loadSummary() {
	renderSummary();
	selectsSummaryBtnSideMenu();
	greetingManagement();
	loadContributorsLetter();
	getAllValuesForOverview();
	showNextDueDate();
}

/**
 * Selets btn in side menu (to be replaced with bootstrap)
 */
function selectsSummaryBtnSideMenu() {
	selectedMenuBtnId = 0;
	selectedMenuButton(1);
}

function greetingManagement() {
	greetUser();
	greetingAnimationSmallerScreens();
}

function resetCounters() {
	numberInBoard = 0;
	numberToDo = 0;
	numberInProgress = 0;
	numberAwaitingFeedback = 0;
	numberDone = 0;
	numberUrgent = 0;
}

function resetsTasksArrays() {
	toDoTasks = [];
	inProgressTasks = [];
	awatingFeedbackTasks = [];
	doneTasks = [];
	allUpcomingTasks = [];
}

async function renderSummary() {
	setInnerHtmlById('content', '');
	document.getElementById('content').innerHTML += generateSummaryHtml(numberInBoard, numberToDo, numberInProgress, numberAwaitingFeedback, numberDone, numberUrgent);
	greetUserInMobileUI();
}

/*================ 
GREETING FUNCTIONS
=================*/

/**
 * Depending on the time greet user being logged in
 */
function greetUser() {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const greeting = getGreeting(hours);

	setInnerHtmlById('greetUser', greeting);
	setInnerHtmlById('greetingMobile', greeting);
}

/**
 * Depending on time returns greeting
 * @param {number} hours
 * @returns string fitting greeting
 */
function getGreeting(hours) {
	if (hours >= 0 && hours < 12) return 'Good Morning';
	if (hours >= 12 && hours < 18) return 'Good Day';
	return 'Good Evening';
}

/**
 * Puts name of logged in user in mobile greeting ani
 */
function greetUserInMobileUI() {
	setInnerHtmlById('nameToBeingGreeted', userName());
}

function userName() {
	return allUsers[loggedUser[0]].name;
}

/**
 * Makes sure that the greeting animation is only shown once
 * on mobile devices.
 */
function greetingAnimationSmallerScreens() {
	if (window.innerWidth <= 1024 && !greetingOnce) {
		document.getElementById('greetMobileOverlay').classList.remove('d-none');

		setTimeout(() => {
			document.getElementById('greetMobileOverlay').classList.add('d-none');
		}, 2000);
		greetingOnce = true;
	}
}

/* =================
MAIN SUMMARY SECTION
====================*/

/**
 * This function loads the logged in user's array,
 * gets the index of the logged in user, gets the email
 * address of the logged in user, and updates the summary.
 */
async function loadAmountsForSummary() {
	loadLoggedInUserArray();
	getLoggedUserIndex();
	getEmailAdrressOfLoggedUser();
	getAllValuesForOverview();
}

/**
 * It takes the loggedUserAtString from localStorage,
 * parses it into a JSON object,
 * and then logs the id of the object to the console.
 */
function loadLoggedInUserArray() {
	let loggedUserAsString = localStorage.getItem('loggedUser');
	loggedUser = JSON.parse(loggedUserAsString);
}

/**
 * This function takes the logged in user's index from the array
 * and assigns it to a variable.
 */
function getLoggedUserIndex() {
	loggedInUserIndex = loggedUser[0];
}

/**
 * This function takes the index of the logged in user
 * and returns the email address of that user.
 * @param loggedInUserIndex - The index of the user in the users array.
 */
function getEmailAdrressOfLoggedUser() {
	emailAddressLoggedUser = allUsers[loggedInUserIndex].email;
	emailAddressLoggedUser == guestEmail ? (guestLoggedIn = true) : null;
}

/**
 * generic function
 * @param {object} tasks of the logged in user
 * @returns array of all tasks of the logged in user
 */
function allUserTasks(tasks) {
	return tasks.filter((task) => task.assignedTo.some((person) => emailMatch(person)));
}

/**
 *
 * @param {object} tasks
 * @param {number} status
 * @param {string} emailAddressLoggedUser
 * @returns array of tasks of priority x of the logged in user
 */
function filterTasks(taskArray, status) {
	return taskArray.filter((task) => task.workFlowStatus === status);
}

/**
 *
 * @param {object} tasks
 * @param {string} priority
 * @param {string} emailAddressLoggedUser
 * @returns
 */
function filterTasksPriority(taskArray, priority) {
	return taskArray.filter((task) => task.prio === priority);
}

/**
 *
 * @param {object} person
 * @returns {boolean} true if email of person matches email of logged in user
 */
function emailMatch(person) {
	return person.email === emailAddressLoggedUser;
}

async function getAllValuesForOverview() {
	getTasks();
	getAmountTasks();
}

/**
 * This function gets all tasks of the logged in user
 * and filters them by status and priority.
 */
function getTasks() {
	tasksInBoard = allUserTasks(joinTaskArray);
	toDoTasks = filterTasks(joinTaskArray, 0);
	inProgressTasks = filterTasks(joinTaskArray, 1);
	awatingFeedbackTasks = filterTasks(joinTaskArray, 2);
	doneTasks = filterTasks(joinTaskArray, 3);
	allYourUrgentTasks = filterTasksPriority(joinTaskArray, 'Urgent');
}

/**
 * This function gets the amount of tasks of the logged in user
 * and filters them by status and priority.
 */
function getAmountTasks() {
	numberInBoard = joinTaskArray.length;
	numberToDo = toDoTasks.length;
	numberInProgress = inProgressTasks.length;
	numberAwaitingFeedback = awatingFeedbackTasks.length;
	numberDone = doneTasks.length;
	numberUrgent = allYourUrgentTasks.length;
}

function showNextDueDate() {
	getNextDueDate();
	renderUpcomingDueDate();
}

//´return next due date of task in joinTaskArray
function getNextDueDate() {
	let tasks = tasksInBoard.filter((task) => task.dueDate != null);
	tasks.forEach((task) => {
		let convertedDate = new Date(task.dueDate);
		task.dueDate = convertedDate;
		selectAllUpcomingTasks(convertedDate, task);

		allUpcomingTasks.sort((a, b) => {
			return new Date(a.dueDate) - new Date(b.dueDate);
		});
	});
	return nextUpcomingDate();
}

/**
 * @returns {string} next due date of task in joinTaskArray
 */
function nextUpcomingDate() {
	if (allUpcomingTasks.length == 0) return;
	return allUpcomingTasks[0].dueDate;
}

/**
 * Pushes all upcoming tasks into allUpcomingTask array
 * @param {string} convertedDate
 * @param {object} task
 */
function selectAllUpcomingTasks(convertedDate, task) {
	if (convertedDate > yesterday()) {
		allUpcomingTasks.push(task);
	}
}

/**
 * Renders the next due date in the summary section
 */
function renderUpcomingDueDate() {
	setInnerHtmlById('deadlineDate', formattedDueDate());
}

/**
 *Formats due date for display
 * @returns {string}formatted date of next due date
 */
function formattedDueDate() {
	let nextDueDate = getNextDueDate();
	if (nextDueDate == undefined) return noDueDate;
	let fullDateString = new Date(nextDueDate); // full date string
	let formattedDateString = fullDateString.toLocaleDateString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
	return formattedDateString;
}

/**
 * @returns date of yesterday
 */
function yesterday() {
	let today = new Date();
	let yesterday = today.setDate(today.getDate() - 1);
	return yesterday;
}
