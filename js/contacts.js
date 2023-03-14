let alphabetOrd = {
	A: [],
	B: [],
	C: [],
	D: [],
	E: [],
	F: [],
	G: [],
	H: [],
	I: [],
	J: [],
	K: [],
	L: [],
	M: [],
	N: [],
	O: [],
	P: [],
	Q: [],
	R: [],
	S: [],
	T: [],
	U: [],
	V: [],
	W: [],
	X: [],
	Y: [],
	Z: [],
};

let newContactUser = [];
let colorIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];
let check = 0;
let listOpen = true;
let autoResponsive = false;
/**
 * This function is called when the user clicks on the contacts button in the menu. It loads the
 * contacts page and renders the content.
 */
async function initContacts() {
	await renderContent();
	sliderMenuShown = false;
	selectedMenuButton(4);
	await userInAlphabetArray();
	loadContributorsLetter();
	coworkersToAssignTo = transferallUserData();
}

/**
 * It takes the HTML from the renderContentHTML() function and puts it into the content div.
 */
async function renderContent() {
	document.getElementById('content').innerHTML = '';
	/* await enableContactsStyles(); */
	await loadTask();
	document.getElementById('content').innerHTML = renderContentHTML();
}

/**
 * This function is called when the user clicks the "Submit" button. It calls the
 * calculateUserInAlphabetArray() function, which calculates the number of times each letter in the
 * alphabet appears in the user's input, and then it calls the alphabet() function, which displays the
 * results.
 */
async function userInAlphabetArray() {
	alphabetOrd = {
		A: [],
		B: [],
		C: [],
		D: [],
		E: [],
		F: [],
		G: [],
		H: [],
		I: [],
		J: [],
		K: [],
		L: [],
		M: [],
		N: [],
		O: [],
		P: [],
		Q: [],
		R: [],
		S: [],
		T: [],
		U: [],
		V: [],
		W: [],
		X: [],
		Y: [],
		Z: [],
	};
	chooseRightUserArray();
	alphabet();
	if (window.innerWidth > 850) {
		showContact(i);
	}
}

window.onresize = function contactListAutomaticResponisive() {
	const rightContainer = document.getElementById('contactContainerRight');

	if (window.innerWidth > 850) {
		autoResponsive = true;
		if (!rightContainer) return;
		rightContainer.style.display = 'flex';
		showContact(i);
	}

	if (window.innerWidth < 850 && listOpen && autoResponsive) {
		showContactList();
		autoResponsive = false;
	}
};

/**
 * It clears the contact list and then calls the calculateAndShowAlphabet function.
 */
function alphabet() {
	document.getElementById('Contact_list').innerHTML = '';
	calculateAndShowAlphabet();
}

function openEditContact(i) {
	let email = allUsers[i].email;
	if (guestLoggedIn) {
		alert('please sign in first');
		return;
	}
	if (email == guestEmail) {
	} else {
		/* !guestLoggedIn ?  */ openEditContactsOf(allUsers, i) /* : openEditContactsOf(allFakeUsers, i) */;
	}
}

/**
 * It removes the class 'd-none' from the element with the id 'edit_contact', then it sets the
 * innerHTML of that element to the return value of the function openEditContactHTML(color, letter,
 * name, email, phone).
 * @param {array} arr of users
 * @param {number}i - the index of the user in the array
 */
function openEditContactsOf(arr, i) {
	let color = arr[i].colorIndex;
	let letter = arr[i].firstSecondLetter;
	let name = arr[i].name;
	let email = arr[i].email;
	let phone = arr[i].phone;
	document.getElementById('boardPopup').classList.remove('d-none');
	document.getElementById('edit_contact').classList.remove('d-none');
	document.getElementById('edit_contact').innerHTML = '';
	document.getElementById('edit_contact').innerHTML = openEditContactHTML(color, letter, name, email, phone, i);
	setTimeout(() => {
		document.getElementById('edit_contact').classList.add('add_contact_slide');
	}, 1);
}

/**
 * It opens a new contact form.
 */
function openNewContact() {
	if (guestLoggedIn) {
		alert('Sorry, does not work with guest status!');
		return;
	}

	document.getElementById('boardPopup').classList.remove('d-none');
	document.getElementById('new_contact').classList.remove('d-none');
	document.getElementById('new_contact').innerHTML = '';
	document.getElementById('new_contact').innerHTML = openNewContactHTML();
	setTimeout(() => {
		document.getElementById('new_contact').classList.add('add_contact_slide');
	}, 1);
}

function closeNewContact() {
	document.getElementById('new_contact').classList.add('d-none');
	document.getElementById('boardPopup').classList.add('d-none');
}

/* 
!Bitte Änderungen anschauen und absegnen */
function closeNewContact() {
	const newContact = document.getElementById('new_contact');
	if (!newContact) {
		document.getElementById('boardPopup').classList.add('d-none');
		return;
	}
	newContact.classList.add('d-none');
	document.getElementById('boardPopup').classList.add('d-none');
}

/**
 * If the window width is less than 769px, render the content for mobile, otherwise remove the class
 * 'add_contact_slide' from the element with the id 'edit_contact'.
 *
 * After 500ms, add the class 'd-none' to the element with the id 'edit_contact'.
 */

/* 
!Bitte Änderungen anschauen und absegnen */
function closeEditContact() {
	const editContact = document.getElementById('edit_contact');
	if (!editContact) {
		document.getElementById('boardPopup').classList.add('d-none');
		return;
	}
	editContact.classList.add('d-none');
	document.getElementById('boardPopup').classList.add('d-none');
}

/**
 * Depending on guestLoggedIn it chooses the right contacts to show
 * @param {boolean} guestLoggedIn
 * @param {number} i= index of user of allUsers or allFakeUsers
 */
function showContact(i) {
	showContactOf(allUsers, i);
	/* if (guestLoggedIn) showContactOf(allFakeUsers, i); */
	showContactList();
	document.getElementById('contactContainerRight').style.display = 'flex';
}

/**
 * It takes the index of the user in the array, and then uses that index to get the user's name, email,
 * phone, first and second letter of their name, and the color index of their name. Then it passes all
 * of that information to the showContactQuerry function.
 * @param {number}i - the index of the user in the allUsers array
 */
function showContactOf(arr, i) {
	let name = arr[i].name;
	let email = arr[i].email;
	let phone = arr[i].phone;
	let letter = arr[i].firstSecondLetter;
	let color = arr[i].colorIndex;
	let showContact = document.getElementById('showContact');
	showContactQuerry(name, email, phone, letter, color, i, showContact);
}

function showContactList() {
	let contactRight = document.getElementById('contactContainerRight');
	const listing = document.getElementById('listing');
	if (!listOpen) {
		document.getElementById('Frame_97').style.marginLeft = '0';
		document.getElementById('contactContainerRight').style.removeProperty('left');
		document.getElementById('listing').style.removeProperty('display');
		listOpen = true;
		contactRight.style.display = 'none';
	} else if (listOpen && window.innerWidth < 850 /*769*/) {
		document.getElementById('Frame_97').style.marginLeft = '-460px';
		document.getElementById('contactContainerRight').style.left = '0';
		if (!listing) return;
		document.getElementById('listing').style.display = 'flex';
		listOpen = false;
		contactRight.style.display = 'flex';
	}
}

/**
 * If the user is not logged in as a guest, then run the addContactHelp function.
 */
async function addContact() {
	if (!guestLoggedIn) {
		let name = document.getElementById('newUserName');
		let email = document.getElementById('newUserEmail');
		let phone = document.getElementById('newUserPhone');
		let newNameRequired = document.getElementById('newContentNameRequired');
		let newEmailRequired = document.getElementById('newContentEmailRequired');
		let newPhoneRequired = document.getElementById('newContentPhoneRequired');
		addContactHelp(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired);
	}
}

/**
 * If the email is required, then check the email, otherwise check the phone.
 * @param newEmailRequired - boolean
 * @param name - the name of the person who is being checked
 * @param email - the email address to check
 * @param phone - the phone number of the person
 */
function comparisonEmailAddress(newEmailRequired, name, email, phone) {
	let valueToCheck = email;
	comparisonEmailHelp(newEmailRequired, name, email, phone, valueToCheck);
}

/**
 * This function takes in a name, email, and phone number, and then adds the contact to the
 * allUserArray.
 * @param name - string
 * @param email - "test@test.com"
 * @param phone - string
 */
async function calculateNewAllUserArray(name, email, phone) {
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex);
}

/**
 * It takes the value of the input field with the id of "editContactName" and sets the innerHTML of the
 * element with the id of "contactName" to that value.
 * @param i - The index of the contact to edit.
 */
function saveEditContact(i) {
	editContact(i);
}

/**
 * It takes the values from the input fields, and then calls the function editContactSave() with the
 * values and the index of the user in the array.
 * @param i - the index of the user in the allUsers array
 */
async function editContact(i) {
	let name = document.getElementById('editUserName').value;
	let email = document.getElementById('editUserEmail').value;
	let phone = document.getElementById('editUserPhone').value;
	let password = allUsers[i].password;
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	editContactSave(name, email, password, phone, firstLetter, secondLetter, colorIndex, i);
}

/**
 * Delets contact on click; function restricted for guest
 * @param {number} i index of user of allUsers Array
 * @returns
 */
async function deleteContactQuestion(i) {
	let letter = allUsers[i].firstSecondLetter;
	let email = allUsers[i].email;
	let deleteQuestion = document.getElementById('deleteContactQuestion');
	let deleteQuestionInner = document.getElementById('deleteContactQuestion').innerHTML;
	if (guestLoggedIn || email == guestEmail) return;
	if (deletionRequested(letter, deleteQuestionInner)) {
		deleteQuestion.innerHTML = `Delete?`;
		deleteQuestion.style = 'font-size: 20px'; // damit es auch in der mobilen version passt
	} else {
		deleteUser(i);
	}
}

function deletionRequested(letter, deleteQuestionInner) {
	return letter === deleteQuestionInner;
}

async function deleteUser(i) {
	allUsers.splice(i, 1);
	await saveTask();
	await renderContent();
	await userInAlphabetArray();
}

let allFakeUsers = [
	{
		name: 'Rosa Lilie',
		email: 'rosalie@testSetUser.de',
		password: 'rosi',
		colorIndex: 8,
		firstSecondLetter: 'RL',
		phone: 123456789,
	},
	{
		name: 'Peter Lustig',
		email: 'peter@web.de',
		colorIndex: 1,
		firstSecondLetter: 'PL',
		phone: 16789345345,
	},
	{
		name: 'Anna Mueller',
		email: 'anna.mueller@mail.com',
		password: 'anna12345',
		colorIndex: 4,
		firstSecondLetter: 'AM',
		phone: 987654321,
	},
	{
		name: 'Max Mustermann',
		email: 'max.mustermann@gmail.com',
		colorIndex: 2,
		firstSecondLetter: 'MM',
		phone: 13572468,
	},
	{
		name: 'Laura Schmidt',
		email: 'laura.schmidt@outlook.com',
		colorIndex: 7,
		firstSecondLetter: 'LS',
		phone: 246803579,
	},
	{
		name: 'Guest',
		email: 'guest@web.de',
		colorIndex: 2,
		firstSecondLetter: 'GG',
		phone: '123123123123',
	},
];
