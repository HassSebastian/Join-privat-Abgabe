/**
 * It returns a string of HTML code.
 * @returns A string of HTML.
 */
function renderContentHTML() {
	return /*html*/ `
    <div class="shadowOverlay d-none" id="boardPopup" onclick="closeNewContact(), closeEditContact()"></div>
		<div class="contactsContainer">
			<div class="Frame_97" id="Frame_97">
				<div class="Contact_list" id="Contact_list"></div>
			</div>
			<div class="contactContainerRight" id="contactContainerRight">
                <div class="contactContainerList">
				<div class="better_with_a_team">
					<h1>Contacts</h1>
					<div class="vector_5"></div>
					<span>Better with a team</span>
				</div>
                </div>
				<div class="showContact" id="showContact"></div>
			</div>
			<div class="new_contact" onclick="openNewContact()">
				<span>New contact</span>
				<img src="assets/img/add_contact_icon.png" alt="" />
			</div>
			<div class="add_contact d-none" id="new_contact"></div>
			<div class="add_contact d-none" id="edit_contact"></div>
		</div>
    `;
}

/**
 * Depending on guestLoggedIn
 * either allUsers or allFakeUsers
 * will showup in the list of contacts
 * @param {boolean} guestLoggedIn
 */
function chooseRightUserArray() {
	/* !guestLoggedIn ?  */ calculateUserInAlphabetArray(allUsers); /* : null; */
	/* guestLoggedIn ? calculateUserInAlphabetArray(allFakeUsers) : null; */
}

/**
 * It takes the users from the allUsers array and pushes them into the alphabetOrd array based on the
 * first letter of their name.
 */
function calculateUserInAlphabetArray(arr) {
	arr.forEach((user, i) => {
		let id = i;
		let colorIndex = user.colorIndex;
		let name = user.name;
		let email = user.email;
		let letter = user.firstSecondLetter;
		let firstLetter = user.firstSecondLetter[0];
		alphabetOrd[firstLetter].push({
			name: name,
			email: email,
			id: id,
			letter: letter,
			colorIndex: colorIndex,
		});
	});
}

/**
 * It loops through the alphabetOrd object, and if the length of the array is greater than 0, it will
 * add the letter to the HTML, and then loop through the array and add the names to the HTML.
 */
function calculateAndShowAlphabet() {
	for (let alphabetLetter in alphabetOrd) {
		if (alphabetOrd[alphabetLetter].length > 0) {
			document.getElementById('Contact_list').innerHTML += showLettersHTML(alphabetLetter);
			for (i = 0; i < alphabetOrd[alphabetLetter].length; i++) {
				let name = alphabetOrd[alphabetLetter][i].name;
				let color = alphabetOrd[alphabetLetter][i].colorIndex;
				let email = alphabetOrd[alphabetLetter][i].email;
				let id = alphabetOrd[alphabetLetter][i].id;
				let letter = alphabetOrd[alphabetLetter][i].letter;
				document.getElementById(alphabetLetter).innerHTML += showAlphabetNames(name, color, email, id, letter);
			}
		}
	}
}

/**
 * It returns a string of HTML that contains a div with a class of "letters" and a div with an id of
 * the alphabet letter.
 * @param alphabetLetter - the letter of the alphabet
 * @returns the HTML code for the letters of the alphabet.
 */
function showLettersHTML(alphabetLetter) {
	return /*html*/ `
        <div class="letters">
            <span><b>${alphabetLetter}</b></span>
        </div>
        <div id='${alphabetLetter}'></div> 
    `;
}

function showContactQuerry(name, email, phone, letter, color, i, showContact) {
	showContact.classList.remove('d-none');
	showContactHelp(name, email, phone, letter, color, i, showContact);
}

function showContactHelp(name, email, phone, letter, color, i, showContact) {
	showContact.innerHTML = '';
	showContact.innerHTML = showContactHTML(name, email, phone, letter, color, i);
	showContact.classList.add('showContactSlide');
}

function addContactHelp(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired) {
	checkNameInput(name, newNameRequired);
	checkEmailInput(email, newEmailRequired);
	checkPhoneInput(phone, newPhoneRequired);
	if (allInformationTypedIn(newNameRequired, newEmailRequired, newPhoneRequired)) {
		comparisonEmailAddress(newEmailRequired, name.value, email.value, phone.value);
	}
}

function checkNameInput(name, newNameRequired) {
	if (noNameInput(name)) {
		newNameRequired.classList.remove('d-none');
		newNameRequired.classList.add('requiredOn');
	} else {
		newNameRequired.classList.remove('requiredOn');
		newNameRequired.classList.add('d-none');
	}
}

function checkEmailInput(email, newEmailRequired) {
	if (noValidEmailInput(email)) {
		newEmailRequired.classList.remove('d-none');
		newEmailRequired.classList.add('requiredOn');
	} else {
		newEmailRequired.classList.remove('requiredOn');
		newEmailRequired.classList.add('d-none');
	}
}

function checkPhoneInput(phone, newPhoneRequired) {
	if (noPhoneNumber(phone)) {
		newPhoneRequired.classList.remove('d-none');
		newPhoneRequired.classList.add('requiredOn');
	} else {
		newPhoneRequired.classList.remove('requiredOn');
		newPhoneRequired.classList.add('d-none');
	}
}

function noNameInput(name) {
	return name.value.length == 0 || name.value[0] === ' ';
}

function noValidEmailInput(email) {
	return email.value.length < 8 || !email.value.includes('@') || !email.value.includes('.') || email.value[0] === ' ';
}

function noPhoneNumber(phone) {
	return phone.value.length < 8 || phone.value[0] === ' ';
}

function allInformationTypedIn(newNameRequired, newEmailRequired, newPhoneRequired) {
	return !newNameRequired.classList.contains('requiredOn') && !newEmailRequired.classList.contains('requiredOn') && !newPhoneRequired.classList.contains('requiredOn');
}

function comparisonEmailHelp(newEmailRequired, name, email, phone, valueToCheck) {
	check = 0;
	for (let i = 0; i < allUsers.length; i++) {
		let testValue = allUsers[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		newEmailRequired.classList.remove('d-none');
		newEmailRequired.classList.add('requiredOn');
		newEmailRequired.innerHTML = `This email address is not available!!`;
	} else {
		calculateNewAllUserArray(name, email, phone);
	}
}

/**
 * It takes in 5 parameters, and returns a string of HTML code.
 * @param name - the name of the contact
 * @param color - the color of the circle
 * @param email - the email of the contact
 * @param id - the id of the contact
 * @param letter - The first letter of the name
 * @returns A string of HTML code.
 */
function showAlphabetNames(name, color, email, id, letter) {
	return /*html*/ `
        <div class="contact" id="contact${i}" onclick="showContact(${id})">
            <div class="ellipse" style='background:${colorIndex[color]}'>
                <span>${letter}</span>
            </div>
            <div class="name_and_email">
                <div class="name">
                <span>${name}</span>
                </div>
                <div class="email">${email}</div>
            </div>
        </div>
    `;
}

/**
 * It returns a string of HTML code that is used to create a popup window.
 * @param color - the color of the contact's elypse
 * @param letter - the first letter of the name of the contact
 * @param name - "John Doe"
 * @param email - "test@test.com"
 * @param phone - "123456789"
 * @returns A string of HTML.
 */
function openEditContactHTML(color, letter, name, email, phone, i) {
	return /*html*/ `   
        <div class="overlayAdd">
            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Edit contact</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <img onclick="closeEditContact()" class="closeLogo" src="./assets/img/close_logo.png">
            <div class="name_logo_inContainer">
                <div class="elypse" style='background:${colorIndex[color]}'>
                    <span>${letter}</span>
                </div>
            </div>
            <div class="buttonOutContainer">
                <div class="buttonInContainer">
                    <button onclick="saveEditContact(${i})" class="save">
                        <span id="saveEditButton">Save</span>
                    </button>
                </div>
            </div>
            <div class="contactContainer">
                <div class="nameOutContainer">
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserName" type="text" value="${name}">
                            <img src="./assets/img/name_logo.png" alt="">
                        </div>
                        <span class="required d-none">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserEmail" type="email" value="${email}">
                            <img src="./assets/img/email_Logo.png" alt="">
                        </div>
                        <span class="required d-none">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="editUserPhone" type="number" value="${phone}">
                            <img src="./assets/img/phoneLogo.png" alt="">
                        </div>
                        <span class="required d-none">This field is required</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * It returns a string of HTML code.
 * @returns A string of HTML.
 */
function openNewContactHTML() {
	return /*html*/ `
        <div class="overlayAdd">
            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Add contact</span>
                    <span class="fontTaskArBetter">Tasks are better with a team!</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <div class="whiteSite">
                <img onclick="closeNewContact()" class="closeLogo" src="./assets/img/close_logo.png">
                <div class="name_logo_inContainer">
                    <div class="elypse">
                        <img src="./assets/img/nameLogoOverlay.png">
                    </div>
                </div>
                <div class="buttonNewOutContainer">
                    <div class="buttonInContainer">
                        <button onclick="closeNewContact()" class="cancel" onmouseover="cancelOn()" onmouseout="cancelOff()">
                            <span>Cancel</span>
                            <img id="cancelImg" width="13px" height="13px" src="./assets/img/close_logo.png">
                        </button>
                        <button onclick="addContact()" class="createContact">
                            <span>Create contact</span>
                            <img src="./assets/img/okHaeckchen.png">
                        </button>
                    </div>
                </div>
                <div class="contactContainer">
                    <div class="nameOutContainer">
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserName" type="text" placeholder="Name" required>
                                <img src="./assets/img/name_logo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentNameRequired">This field is required</span>
                        </div>
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserEmail" type="email" placeholder="Email" required>
                                <img src="./assets/img/email_Logo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentEmailRequired">This field is required</span>
                        </div>
                        <div class="nameContainer">
                            <div class="inputEditContainer">
                                <input class="inputName" id="newUserPhone" type="number" placeholder="Phone" required>
                                <img src="./assets/img/phoneLogo.png" alt="">
                            </div>
                            <span class="required d-none" id="newContentPhoneRequired">This field is required</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contactSucc" id="contactSucc">
            <div class="contactSuccContainer">
                <span>Contact succesfully created</span>
            </div>
        </div>

        </div>

    `;
}

/**
 * It takes in 5 parameters and returns a string of HTML.
 * @param name - "John Doe"
 * @param email - "test@test.com"
 * @param phone - "1234567890"
 * @param letter - the first letter of the name
 * @param color - is a number from 0 to 5
 * @returns A string of HTML.
 */
function showContactHTML(name, email, phone, letter, color, i) {
	return /*html*/ `
        <div class="showContactDetail">
		    <div id="listing">
                    <img onclick="showContactList()" src="assets/img/back_logo_black.png" alt="">
                    </div>                       
            <div class="show_contact_ellipse_5" style='background:${colorIndex[color]}' onclick="deleteContactQuestion(${i})">
                <span id="deleteContactQuestion">${letter}</span>
            </div>
            <div class="showContact_Name_addTask">
                <div class="rightSideShowContacts">
                    <h1 class="nameOnDisplay">${name}</h1>
                    <span onclick="allowAddTaskPopUp(), showAddTaskPopupWindow(0)">+ Add Task</span>
                </div>
            </div>
        </div>
        <div class="showContact_information_edit">
            <div class="contact_information">
                <div class="contact_information_edit">
                    <h2>Contact Information</h2>
                    <div class="edit_contact" onclick="openEditContact(${i})">
                        <img src="./assets/img/edit_button_black.png" alt="">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <div class="contactEmailContainer">
                    <div class="contactEmailAndPhone">Email</div>
                    <div class="contactEmail"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="contactPhoneContainer">
                    <div class="contactEmailAndPhone">Phone</div>
                    <div class="contactPhone"><a href="tel:${phone}">${phone}</a></div>
                </div>
            </div>
        </div>
    `;
}

/**
 * This function adds a new contact to the allUsers array, saves the array to local storage, closes the
 * new contact form, and then sorts the contacts into alphabetical order.
 * @param name - name of the contact
 * @param email - email,
 * @param phone - '+1 (123) 456-7890'
 * @param firstLetter - The first letter of the user's name
 * @param secondLetter - the second letter of the user's name
 * @param colorIndex - 0-5
 */
async function addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex) {
	allUsers.push({
		name: name,
		email: email,
		colorIndex: colorIndex,
		firstSecondLetter: firstLetter + secondLetter,
		phone: phone,
	});
	await saveTask();
	closeNewContact();
	userInAlphabetArray();
}

/**
 * It takes the values from the edit contact form and saves them to the allUsers array.
 * @param name - the name of the contact
 * @param email - email,
 * @param password - password
 * @param phone - the phone number
 * @param firstLetter - first letter of the name
 * @param secondLetter - the second letter of the user's name
 * @param colorIndex - the index of the color in the array of colors
 * @param i - the index of the user in the allUsers array
 */
async function editContactSave(name, email, password, phone, firstLetter, secondLetter, colorIndex, i) {
	allUsers[i] = {
		name: name,
		email: email,
		password: password,
		colorIndex: colorIndex,
		firstSecondLetter: firstLetter + secondLetter,
		phone: phone,
	};
	await saveTask(); // ! Speichert die einen Task oder einen bearbeiteten Kontakt?
	closeEditContact();
	document.getElementById('showContact').classList.add('d-none');
	userInAlphabetArray();
	showContact(i);
}

/**
 * When the user hovers over the cancel button, the image changes to a blue version of the same image.
 */
function cancelOn() {
	document.getElementById('cancelImg').src = '././assets/img/close_logo_blue.png';
}

/**
 * When the mouse leaves the cancel button, change the image to the original image.
 */
function cancelOff() {
	document.getElementById('cancelImg').src = './assets/img/close_logo.png';
}
