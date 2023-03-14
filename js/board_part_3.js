// Searchfunction for board

let searchTerm;

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

function searchAfterPopup() {
	/* if (innerWidth <= 1300) {
		searchAfterPopupMobil();
	} else { */
	searchAfterPopupDesktop();
	/* 	} */
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

/*
! HIER WEITER */

async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
}

async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	/* 	if (window.innerWidth < 1400) {
		renderAllCardsMobil();
	} else { */
	renderAllCards();
	/* 	} */
}

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

/* 
!Functions for moving cards on mobile devices
 */

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

function closeBoardMobilDetailOverlay() {
	document.getElementById('boardPopup').classList.add('d-none');
}

async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
}

async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
}

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

function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML += /*html*/ `
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}

async function moveMobilTaskTo(taskIndex, newTaskStatus) {
	joinTaskArray[taskIndex]['workFlowStatus'] = newTaskStatus;
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
	closeBoardMobilDetailOverlay();
}

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
