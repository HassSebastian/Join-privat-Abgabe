/**
 * If the input fields are not empty, check if the name field is empty or starts with a space, check if
 * the email field is less than 8 characters, does not contain an @ or ., or starts with a space, check
 * if the password field is empty or starts with a space, and if all of the above are false, run the
 * emailToCheck function.
 * @param {name} - the name input field
 * @param email - the email input
 * @param password - the password input
 * @param requiredName - the span element that will be added to the name input
 * @param requiredEmail - the span element that will be added to the DOM if the email input is invalid
 * @param requiredPassword - the element that will be added the class 'requiredOn' if the password
 * input is empty or starts with a space.
 */
function calculateinputValueTest(name, email, password, requiredName, requiredEmail, requiredPassword) {
	if (name.value || email.value || password.value) {
		if (name.value.length == 0 || name.value[0] === ' ') {
			requiredName.classList.add('requiredOn');
		} else {
			requiredName.classList.remove('requiredOn');
		}
		if (email.value.length < 8 || !email.value.includes('@') || !email.value.includes('.') || email.value[0] === ' ') {
			requiredEmail.classList.add('requiredOn');
		} else {
			requiredEmail.classList.remove('requiredOn');
		}
		if (password.value.length == 0 || password.value[0] === ' ') {
			requiredPassword.classList.add('requiredOn');
		} else {
			requiredPassword.classList.remove('requiredOn');
		}
		if (!requiredName.classList.contains('requiredOn') && !requiredEmail.classList.contains('requiredOn') && !requiredPassword.classList.contains('requiredOn')) {
			emailToCheck(name.value, email.value, password.value);
		}
	} else {
		requiredName.classList.add('requiredOn');
		requiredEmail.classList.add('requiredOn');
		requiredPassword.classList.add('requiredOn');
	}
}

/**
 * If the email address is already available, then add the class 'requiredOn' to the element with the
 * id 'requiredEmail' and change the innerHTML of that element to 'This email address is already
 * available!!'. Otherwise, call the function 'calculateAllUserArray' with the parameters 'name',
 * 'email', and 'password'.
 * @param requiredEmail - is the div that will show the error message
 * @param name - the name of the user
 * @param email - the email address that the user has entered
 * @param password - the password that the user has entered
 */
function comparisonEmail(requiredEmail, name, email, password) {
	let valueToCheck = email;
	let check = 0;
	for (let i = 0; i < allUsers.length; i++) {
		let testValue = allUsers[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		requiredEmail.classList.add('requiredOn');
		requiredEmail.innerHTML = `This email address is not available!!`;
	} else {
		calculateAllUserArray(name, email, password);
	}
}

/**
 * This function takes in a name, email, and password, and then calls the calcSecondLetter function,
 * which returns a second letter, and then calls the calcColorIndex function, which returns a color
 * index, and then calls the userSignIn function, which returns a user object.
 * @param name - the user's name
 * @param email - string
 * @param password - string
 */
async function calculateAllUserArray(name, email, password) {
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	userSignIn(firstLetter, secondLetter, name, email, password, colorIndex);
}

/**
 * It takes a string, finds the index of the space, then takes the substring from the space to the end
 * of the string, then takes the first letter of that substring.
 * @param name - the name of the person
 * @returns The second letter of the second name.
 */
function calcSecondLetter(name) {
	let spaceIndex = name.indexOf(' ');
	let secondName = name.substring(spaceIndex + 1);
	let secondLetter = secondName[0].toUpperCase();
	return secondLetter;
}

/**
 * It takes two letters, converts them to their ASCII values, adds them together, and then returns the
 * remainder of that sum divided by 10.
 * @param firstLetter - The first letter of the name of the person you want to get the color for.
 * @param secondLetter - The second letter of the name of the person you want to get the color for.
 * @returns The colorIndex is being returned.
 */
function calcColorIndex(firstLetter, secondLetter) {
	let asciiFirstLetter = firstLetter.charCodeAt(0);
	let asciiSecondLetter = secondLetter.charCodeAt(0);
	let sum = asciiFirstLetter + asciiSecondLetter;
	let colorIndex = sum % 10;
	return colorIndex;
}
