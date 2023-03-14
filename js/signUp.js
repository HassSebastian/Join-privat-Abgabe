function backToLogIn() {
	window.location.href = './loginDesk.html';
}

/**
 * It checks the input formatting of the sign up form.
 */
// check input formatting
function inputValueTest() {
	let name = document.getElementById('inputNameSignUp');
	let email = document.getElementById('inputEmailSignUp');
	let password = document.getElementById('inputPasswordSignUp');
	let requiredName = document.getElementById('requiredName');
	let requiredEmail = document.getElementById('requiredEmail');
	let requiredPassword = document.getElementById('requiredPassword');
	requiredEmail.classList.remove('requiredOn');
	requiredEmail.innerHTML = `This field is required`;
	calculateinputValueTest(name, email, password, requiredName, requiredEmail, requiredPassword);
}

/**
 * If there are no users, then call the firstAndSecondLetter function, otherwise call the
 * comparisonEmail function.
 * @param name - the name of the user
 * @param email - the email that the user entered
 * @param password - the password the user entered
 */
// check email existing
async function emailToCheck(name, email, password) {
	await loadTask();
	let requiredEmail = document.getElementById('requiredEmail');
	if (!allUsers) {
		firstAndSecondLetter(name, email, password);
	} else {
		comparisonEmail(requiredEmail, name, email, password);
	}
}

/**
 * It takes in 6 parameters, pushes them into an array, and then saves the array to local storage.
 * @param firstLetter - The first letter of the user's name
 * @param secondLetter - the second letter of the user's name
 * @param name - the name of the user
 * @param email - user's email
 * @param password - the password the user entered
 * @param colorIndex - the index of the color in the color array
 */
// save user data and forward to login site
async function userSignIn(firstLetter, secondLetter, name, email, password, colorIndex) {
	await loadTask();
	allUsers.push({
		name: name,
		email: email,
		password: password,
		colorIndex: colorIndex,
		firstSecondLetter: firstLetter + secondLetter,
		phone: 'N/A',
	});
	await saveTask();
	contactSucc();
	setTimeout(forwardScript, 2000);
}

function forwardScript() {
	if (document.getElementById('new_contact')) {
		if (document.getElementById('new_contact').classList.contains('add_contact_slide')) {
			closeNewContact();
			setTimeout(userInAlphabetArray, 500);
		} else {
			window.location.href = './loginDesk.html';
		}
	} else {
		window.location.href = './loginDesk.html';
	}
}

function contactSucc() {
	document.getElementById('contactSucc').classList.remove('d-none');
	setTimeout(() => {
		document.getElementById('contactSucc').classList.add('contactSuccSlide');
	}, 1);
}

/**
 * It toggles the visibility of the password icon and the show button, and if the password icon is
 * hidden, it changes the type of the password input to text, otherwise it changes it back to password.
 */
function passwordShowIcon(x) {
	document.getElementById('passwordLogo').classList.toggle('d-none');
	document.getElementById('pwShowButton').classList.toggle('d-none');
	if (document.getElementById('passwordLogo').classList.contains('d-none')) {
		document.getElementById(`inputPassword${x}`).type = 'text';
	} else {
		document.getElementById(`inputPassword${x}`).type = 'password';
	}
}
