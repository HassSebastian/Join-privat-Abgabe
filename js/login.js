let rememberUser = [];
let loggedUser = [];
let allUsers = [];
let guestEmail = 'guest@web.de';
let forgotEmailIndex;

async function outLogoutMob() {
	await initLoginMob();
	window.location.href = 'index.html';
}

async function initLoginMob() {
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await loadTask();
}

function forgotPassword() {
	window.location.href = './forgotMyP_sendMail.html';
}

function guestLogIn() {
	const email = guestEmail;
	const password = '123456';
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

function notAJoinUserButtonMob() {
	document.getElementById('logInMasterContainerMob').classList.add('d-none');
	document.getElementById('signInMasterContainerMob').classList.remove('d-none');
	document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
}

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
function showForgotPasswordMob() {
	document.getElementById('logInMasterContainerMob').classList.add('d-none');
	document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
	document.getElementById('formForgotPassword').classList.remove('d-none');
}

function sendMailButton() {
	document.getElementById('requiredEmailForgot').classList.remove('requiredOn');
	document.getElementById('requiredEmailForgot').innerHTML = `This field is required`;
	let inputForgotValue = document.getElementById('inputForgot').value;
	if (inputForgotValue == '') {
		document.getElementById('requiredEmailForgot').classList.add('requiredOn');
	} else {
		inputForgotValueOk(inputForgotValue);
	}
}

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

function preparationShowPasswordResetCard(i) {
	document.getElementById('requiredEmailForgot').style = 'color:transparent';
	document.getElementById('sentMassageDoneMaserContainerMob').classList.add('sentMassageDoneMaserContainerMobSlide');
	forgotEmailIndex = i;
}

function comparisonFailed() {
	document.getElementById('requiredEmailForgot').classList.add('requiredOn');
	document.getElementById('requiredEmailForgot').innerHTML = `email is not available`;
}

function showPasswordResetCard() {
	document.getElementById('sentMassageDoneMaserContainerMob').classList.add('d-none');
	document.getElementById('formForgotPassword').classList.add('d-none');
	document.getElementById('resetPWMasterContainerMob').classList.remove('d-none');
}

function backToSignInMob() {
	document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
	document.getElementById('signInMasterContainerMob').classList.remove('d-none');
	document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
}

function resetbuttonContainerMob() {
	inputPasswordErrorMessageClear();
	let inputNewPassword = document.getElementById('inputNewPassword').value;
	let inputConfirmPassword = document.getElementById('inputConfirmPassword').value;
	if (inputNewPassword == '' || inputConfirmPassword == '') {
		inputPasswordErrorMessage();
	} else {
		if (inputNewPassword == inputConfirmPassword) {
			newPasswordCheck(forgotEmailIndex, inputNewPassword);
		} else {
			inputPasswordErrorMessage();
		}
	}
}

function inputPasswordErrorMessageClear() {
	document.getElementById('requiredNewPassword').classList.remove('requiredOn');
	document.getElementById('requiredConfirmPassword').classList.remove('requiredOn');
	document.getElementById('requiredNewPassword').innerHTML = `This field is required`;
	document.getElementById('requiredConfirmPassword').innerHTML = `This field is required`;
}

function inputPasswordErrorMessage() {
	document.getElementById('requiredNewPassword').classList.add('requiredOn');
	document.getElementById('requiredConfirmPassword').classList.add('requiredOn');
	document.getElementById('requiredNewPassword').innerHTML = `password is not the same`;
	document.getElementById('requiredConfirmPassword').innerHTML = `password is not the same`;
}

function newPasswordCheck(forgotEmailIndex, inputNewPassword) {
	allUsers[forgotEmailIndex].password = inputNewPassword;
	saveTask();
	document.getElementById('pwResetContainerMob').classList.add('pwResetContainerMobSlide');
	setTimeout(backToLogInMob, 3000);
}
