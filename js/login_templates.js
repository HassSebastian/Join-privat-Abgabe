/**
 * This function removes the class 'requiredOn' from the requiredEmail and requiredPassword elements,
 * and sets the innerHTML of both elements to 'This field is required'.
 * @param email - the email input field
 * @param password - the password input field
 * @param requiredEmail - The element that will display the error message for the email field.
 * @param requiredPassword - The element that will display the error message for the password field.
 */
function resetRequiredLine(email, password, requiredEmail, requiredPassword) {
	requiredEmail.classList.remove('requiredOn');
	requiredPassword.classList.remove('requiredOn');
	requiredEmail.innerHTML = `This field is required`;
	requiredPassword.innerHTML = `This field is required`;
}

/**
 * If the email and password fields are not empty, check if the email is valid, if not, show the
 * required email message, if it is, check if the password is empty, if it is, show the required
 * password message, if it isn't, check if the required email and password messages are not showing, if
 * they aren't, run the userLogin function.
 * @param email - the email input field
 * @param password - the password input field
 * @param requiredEmail - the element that will be shown if the email is not valid
 * @param requiredPassword - the password input field
 */
function calculateCheckCorrectInput(email, password, requiredEmail, requiredPassword) {
	if (email.value || password.value) {
		if (email.value.length < 8 || !email.value.includes('@') || !email.value.includes('.') || email.value[0] === ' ') {
			requiredEmail.classList.add('requiredOn');
		} else {
			requiredEmail.classList.remove('requiredOn');
		}
		if (password.value.length == 0 || email.value[0] === ' ') {
			requiredPassword.classList.add('requiredOn');
		} else {
			requiredPassword.classList.remove('requiredOn');
		}
		if (!requiredEmail.classList.contains('requiredOn') && !requiredPassword.classList.contains('requiredOn')) {
			userLogin(email.value, password.value);
		}
	} else {
		requiredEmail.classList.add('requiredOn');
		requiredPassword.classList.add('requiredOn');
	}
}

/**
 * If the user doesn't exist, then add the class 'requiredOn' to the email and password fields, and add
 * the text 'No user available. please  Sign up!!' to the email and password fields.
 * @param requiredEmailLogin - the element that will display the error message
 * @param requiredPasswordLogin - the password input field
 */
function pleaseRegister(requiredEmailLogin, requiredPasswordLogin) {
	requiredEmailLogin.classList.add('requiredOn');
	requiredEmailLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
	requiredPasswordLogin.classList.add('requiredOn');
	requiredPasswordLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
}

/**
 * If the email and password match, then the user is logged in.
 * @param email - the email that the user entered
 * @param password - the password the user entered
 * @param requiredEmailLogin - is the element that will display the error message if the email is not
 * found in the database.
 * @param requiredPasswordLogin - is the element that will display the error message if the password is
 * incorrect.
 */
function statusOK(email, password, requiredEmailLogin, requiredPasswordLogin) {
	let loginStatus = false;
	let userId;
	for (let i = 0; i < allUsers.length; i++) {
		let emailData = allUsers[i]['email'];
		if (emailData == email) {
			if (allUsers[i]['password'] == password) {
				loginStatus = true;
				userId = i;
				break;
			}
		}
	}
	if (loginStatus == true) {
		rememberMe(email, password, userId);
	} else {
		requiredEmailLogin.classList.add('requiredOn');
		requiredEmailLogin.innerHTML = `Email or Password do not match!!`;
		requiredPasswordLogin.classList.add('requiredOn');
		requiredPasswordLogin.innerHTML = `Email or Password do not match!!`;
	}
}

/**
 * It checks if the email and password entered by the user is in the local storage. If it is, it
 * redirects the user to the summary page. If it isn't, it calls the keyQueryOne function.
 * @param email - the email address of the user
 * @param password - the password the user entered
 * @param rememberUser - [{email: "test@test.com", password: "test"}]
 * @param valueToCheck - email
 * @param check - 0
 */
function calculateRememberDoubleUserCheck(email, password, rememberUser, valueToCheck, check) {
	for (let i = 0; i < rememberUser.length; i++) {
		let testValue = rememberUser[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		window.location.href = './summary.html';
	} else {
		keyQueryOne(email, password);
	}
}

/**
 * It takes two arguments, email and password, and pushes them into an array called rememberUser.
 *
 * Then it converts the array into a string and stores it in localStorage.
 *
 * The function is called when the user clicks the checkbox.
 *
 * The function is called with the email and password values from the form.
 *
 * The function is called from the checkbox's onclick event.
 *
 * The function is called from the check
 * @param email - the email address of the user
 * @param password - the password of the user
 */
// remember me help fuction -null-
function keyQueryNull(email, password) {
	rememberUser.push({ email: email, password: password });
	let rememberUserAtString = JSON.stringify(rememberUser);
	localStorage.setItem('rememberUser', rememberUserAtString);
}

/**
 * It takes two arguments, email and password, and pushes them into an array called rememberUser.
 * @param email - the email address of the user
 * @param password - the password of the user
 */
// remember me help function -one-
function keyQueryOne(email, password) {
	let rememberUserString = localStorage.getItem('rememberUser');
	rememberUser = JSON.parse(rememberUserString);
	rememberUser.push({ email: email, password: password });
	let rememberUserAtString = JSON.stringify(rememberUser);
	localStorage.setItem('rememberUser', rememberUserAtString);
}
