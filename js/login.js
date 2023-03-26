let rememberUser = [];
let loggedUser = [];
let allUsers = [];
let guestEmail = 'guest@web.de';
let forgotEmailIndex;

/**
 * Logs the user out and redirects to the login page on a mobile device.
 */
async function outLogoutMob() {
	await initLoginMob();
	window.location.href = 'index.html';
}

/**
 * Initializes the login process for the mobile application by setting the backend URL
 * and loading the necessary tasks.
 */
async function initLoginMob() {
	setURL('https://sebastian-hass.developerakademie.net/Join2.0/smallest_backend_ever');
	await loadTask();
}

/**
 * Redirects the user to the "forgot password" page.
 */
function forgotPassword() {
	window.location.href = './forgotMyP_sendMail.html';
}

/**
 * Logs in a guest user with a hardcoded email and password, sets the values of the email and password input fields on the login page, clears the localStorage, and calls the userLogin function to log in the user.
 */
function guestLogIn() {
	const email = guestEmail;
	const password = '123456aA';
	document.getElementById('inputEmailLogin').value = email;
	document.getElementById('inputPasswordLogin').value = password;
	localStorage.clear();
	userLogin(email, password);
}

/**
 * If the input is correct, then do nothing, otherwise, show the error message.
 */
// check input formatting
function checkCorrectInput() {
	let email = document.getElementById('inputEmailLogin');
	let password = document.getElementById('inputPasswordLogin');
	let requiredEmail = document.getElementById('requiredEmailLogin');
	let requiredPassword = document.getElementById('requiredPasswordLogin');
	resetRequiredLine(email, password, requiredEmail, requiredPassword);
	calculateCheckCorrectInput(email, password, requiredEmail, requiredPassword);
}

/**
 * If the allUsers array is empty, then display a message to the user to register, otherwise, check the
 * user's email and password.
 * @param email - the email the user entered
 * @param password - the password the user entered
 */
// user login
async function userLogin(email, password) {
	await loadTask();
	let requiredEmailLogin = document.getElementById('requiredEmailLogin');
	let requiredPasswordLogin = document.getElementById('requiredPasswordLogin');
	if (allUsers.length == null) {
		pleaseRegister(requiredEmailLogin, requiredPasswordLogin);
	} else {
		statusOK(email, password, requiredEmailLogin, requiredPasswordLogin);
	}
}

/**
 * If the checkbox is checked, then the user's email and password are saved to local storage, and the
 * user is redirected to the summary page.
 * @param email - the email of the user
 * @param password - the password the user entered
 * @param userId - true or false
 */
//  remember me checkbox check
function rememberMe(email, password, userId) {
	let checkbox = document.getElementById('checkbox');
	if (checkbox.checked) {
		rememberUserExisting(email, password);
	}
	loggedUser = [];
	loggedUser.push(userId);
	let loggedUserAsString = JSON.stringify(loggedUser);
	localStorage.setItem('loggedUser', loggedUserAsString);
	window.location.href = './summary.html';
}

/**
 * If the localStorage key 'rememberUser' is null, then call the function keyQueryNull, otherwise call
 * the function rememberDoubleUserCheck.
 * @param email - the email address of the user
 * @param password - the password the user entered
 */
// remember me check - user existing in localstorage
function rememberUserExisting(email, password) {
	let keyQuery = localStorage.getItem('rememberUser');
	if (keyQuery === null) {
		keyQueryNull(email, password);
	} else {
		rememberDoubleUserCheck(email, password);
	}
}

/**
 * It checks if the email address is already in localStorage.
 * @param email - the email address of the user
 * @param password - the password that the user entered
 */
// remember me check - double entries
function rememberDoubleUserCheck(email, password) {
	let doubleUserCheckAtString = localStorage.getItem('rememberUser');
	let rememberUser = JSON.parse(doubleUserCheckAtString);
	let valueToCheck = email;
	let check = 0;
	calculateRememberDoubleUserCheck(email, password, rememberUser, valueToCheck, check);
}

/**
 * If there is a string in localStorage with the key 'rememberUser', then parse the string into an
 * object, push the object into an array, and then set the value of the email and password inputs to
 * the email and password of the object.
 */
function logInAtLocalstorage() {
	let rememberUserString = localStorage.getItem('rememberUser');
	if (rememberUserString) {
		rememberUser = JSON.parse(rememberUserString);
		rememberUser.push(rememberUser);
		document.getElementById('inputEmailLogin').value = `${rememberUser[0].email}`;
		document.getElementById('inputPasswordLogin').value = `${rememberUser[0].password}`;
	}
}

/* Sign In */
/**
 * Hides the login container and shows the sign-up container in mobile view.
 */
function notAJoinUserButtonMob() {
	document.getElementById('logInMasterContainerMob').classList.add('d-none');
	document.getElementById('signInMasterContainerMob').classList.remove('d-none');
	document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
}

/**
 * Reverts the view to the login screen on mobile by hiding the sign up container, displaying the login container and displaying the "not a join user" option
 */
function backToLogInMob() {
	document.getElementById('logInMasterContainerMob').classList.remove('d-none');
	document.getElementById('signInMasterContainerMob').classList.add('d-none');
	document.getElementById('notAJoinUserContainerMob').classList.remove('d-none');
	document.getElementById('contactSucc').classList.add('d-none');
	document.getElementById('formForgotPassword').classList.add('d-none');
	document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
	document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
}

/* Forgot Password */
/**
 * Shows the forgot password form in mobile view by updating the visibility of certain HTML elements.
 */
function showForgotPasswordMob() {
	document.getElementById('logInMasterContainerMob').classList.add('d-none');
	document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
	document.getElementById('formForgotPassword').classList.remove('d-none');
}

/**
 * Validates the input field for the forgot password form and calls the
 * `inputForgotValueOk` function if the input is not empty.
 */
function sendMailButton() {
	document.getElementById('requiredEmailForgot').classList.remove('requiredOn');
	document.getElementById('requiredEmailForgot').innerHTML = `This field is required`;
	let inputForgotValue = document.getElementById('inputForgot').value;
	if (emailTest.test(inputForgotValue)) {
		inputForgotValueOk(inputForgotValue);
	} else {
		document.getElementById('requiredEmailForgot').classList.add('requiredOn');
	}
}

/**
 * Checks if the input value matches an email in the list of all users.
 * If a match is found, prepares to show the password reset card.
 * If no match is found, displays an error message.
 * @param {string} inputForgotValue - The input value to check against the list of user emails.
 */
function inputForgotValueOk(inputForgotValue) {
	for (i = 0; i < allUsers.length; i++) {
		let inputComparison = allUsers[i].email;
		if (inputForgotValue == inputComparison) {
			preparationShowPasswordResetCard(i);
			setTimeout(showPasswordResetCard, 2000);
			break;
		} else {
			comparisonFailed();
		}
	}
}

/**
 * Prepares for showing the password reset card by hiding the "This field is required" message,
 * adding a class to show the "sent message done" container with a slide animation, and storing
 * the index of the user who requested the password reset.
 *
 * @param {number} i - The index of the user who requested the password reset.
 */
function preparationShowPasswordResetCard(i) {
	document.getElementById('requiredEmailForgot').style = 'color:transparent';
	document.getElementById('sentMassageDoneMaserContainerMob').classList.add('sentMassageDoneMaserContainerMobSlide');
	forgotEmailIndex = i;
}

/**
 * Checks if the input email is available for password reset and prepares to show the password reset card.
 */
function comparisonFailed() {
	document.getElementById('requiredEmailForgot').classList.add('requiredOn');
	document.getElementById('requiredEmailForgot').innerHTML = `email is not available`;
}

/**
 * Shows the password reset card and hides the forgot password form.
 */
function showPasswordResetCard() {
	document.getElementById('sentMassageDoneMaserContainerMob').classList.add('d-none');
	document.getElementById('formForgotPassword').classList.add('d-none');
	document.getElementById('resetPWMasterContainerMob').classList.remove('d-none');
}

/**
 * Hides the password reset card and shows the sign-in form.
 */
function backToSignInMob() {
	document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
	document.getElementById('signInMasterContainerMob').classList.remove('d-none');
	document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
}

/**
 * Checks the input of the new password and confirm password fields, and updates the password for the user if the new password meets the requirements.
 */
function resetbuttonContainerMob() {
	inputPasswordErrorMessageClear();
	let inputNewPassword = document.getElementById('inputNewPassword').value;
	let inputConfirmPassword = document.getElementById('inputConfirmPassword').value;
	if (passwordTest.test(inputNewPassword) || passwordTest.test(inputConfirmPassword)) {
		if (inputNewPassword == inputConfirmPassword) {
			newPasswordCheck(forgotEmailIndex, inputNewPassword);
		} else {
			inputPasswordErrorMessage();
		}
	} else {
		inputPasswordErrorMessage();
	}
}

/**
 * Clears the error messages for the input password fields.
 */
function inputPasswordErrorMessageClear() {
	document.getElementById('requiredNewPassword').classList.remove('requiredOn');
	document.getElementById('requiredConfirmPassword').classList.remove('requiredOn');
	document.getElementById('requiredNewPassword').innerHTML = `This field is required`;
	document.getElementById('requiredConfirmPassword').innerHTML = `This field is required`;
}

/**
 * Displays an error message when the input password and confirm password fields do not match.
 */
function inputPasswordErrorMessage() {
	document.getElementById('requiredNewPassword').classList.add('requiredOn');
	document.getElementById('requiredConfirmPassword').classList.add('requiredOn');
	document.getElementById('requiredNewPassword').innerHTML = `min 8 min "a" min "A" min "0-9" OR password is not the same`;
	document.getElementById('requiredConfirmPassword').innerHTML = `min 8 min "a" min "A" min "0-9" OR password is not the same`;
}

/**
 * Updates the password for the user with the specified email index to the new password.
 * @param {number} forgotEmailIndex - The index of the user's email address in the allUsers array.
 * @param {string} inputNewPassword - The new password to set for the user.
 */
function newPasswordCheck(forgotEmailIndex, inputNewPassword) {
	allUsers[forgotEmailIndex].password = inputNewPassword;
	saveTask();
	document.getElementById('pwResetContainerMob').classList.add('pwResetContainerMobSlide');
	setTimeout(backToLogInMob, 3000);
}
