/**
 * this function returns the AddTask HTML for rendering.
 * @returns - AddTask HTML
 */
function generateAddTaskHtml() {
	return /*html*/ `
	
	<div class="testResponsiv" id="testResponsiv">
	<div class="addTaskHeadlineDiv">
		<h2 class="addTHeadline">Add Task</h2>
	</div>
	<div class="mainAddTaskContainer">
	<div class="taskAddedToBoard" id="taskCreatedIndication">
				<div class="taskAddedToBoardContainer">
					<span>Task added to board</span>
					<img src="./assets/img/img_board_w.png" />
				</div>
			</div>
		<div class="addTaskAddTitleContainer">
			<div class="addTaskAddTitleBox">
				<h3 class="subTitleAddTask">Title</h3>
				<form class="formAddTaskTitle" onsubmit="goToDescripten(); return false">
					<input class="addTaskResponsiv" required type="text" placeholder="Enter a title" id="addTaskTitle" autocomplete="off" minlength="3" />
				</form>
				<span class="requiredText" id="titleReq">This field is required</span>
			</div>
			<div class="addTaskAddDescriptenBox">
				<h3 class="subTitleAddTask">Description</h3>
				<textarea class="addTaskResponsiv" form="formDesc" type="text" placeholder="Enter Descripten" id="addTaskDescripten" required minlength="5"></textarea>
				<span class="requiredText" id="descReq">This field is required</span>
			</div>
			<div class="addTaskAddCategoryBox">
				<h3 class="subTitleAddTask">Category</h3>
				<button onclick="enableDisableCatList()" id="selectedCat" class="addTaskResponsiv">
					<input disabled id="selectedCatInput" placeholder="Select task category" autocomplete="off" />
					<span id="sColor"></span>
					<div class="newCategoryImgDiv d-none" id="addTaskNewCatBtn">
						<img src="assets/img/new_cat_cancel.png" />
						<img src="assets/img/bnt_divider.png" class="btnDivider" />
						<img src="assets/img/akar-icons_check.png" />
					</div>
					<img src="assets/img/Vector 2.png" class="dropdownImg" id="dropdownImg" />
				</button>
				<span class="listD-none requiredText" id="catReq">This field is required</span>
				<ul class="addTaskCatList listD-none" id="CatListDropdown"></ul>
				<div class="addTaskAddCategoryColor listD-none" id="colorSelection">
					<div class="color0" id="color0Div" onclick="addColorToCat(0)"></div>
					<div class="color1" id="color1Div" onclick="addColorToCat(1)"></div>
					<div class="color2" id="color2Div" onclick="addColorToCat(2)"></div>
					<div class="color3" id="color3Div" onclick="addColorToCat(3)"></div>
					<div class="color4" id="color4Div" onclick="addColorToCat(4)"></div>
					<div class="color5" id="color5Div" onclick="addColorToCat(5)"></div>
				</div>
			</div>
			<div class="addTaskAssignedBox" id="addTaskAssignedBox">
				<h3 class="subTitleAddTask">Assigned to</h3>
				<button id="addTaskAssignedButton" onclick="enableDisableAssignList()" class="addTaskResponsiv">
					<input disabled onclick="doNotCloseOnClick(event)" id="selectedAssign" name="selectedAssign" class="inputselectedAssign" placeholder="Select contacts to assign" autocomplete="off" />

					<div id="assignToCancelConfirmImgContainer" class="assignToCancelConfirmImgContainer d-none">
						<img onclick="assignBoxBackToDefaultMode(), enableAssignList()" class="assignToCancelIcon" src="assets/img/cancel-black.png" alt="cancel" />
						<img class="assignToDeviderIcon" src="assets/img/bnt_divider.png" />
						<img onclick="frontEndDeveloper()" class="assignToCheckIcon" src="assets/img/akar-icons_check.png" alt="confirm" />
					</div>
					<img id="assignDropDownImg" src="assets/img/Vector 2.png" class="dropdownImg" />
				</button>
				<span id="assignReq">This field is required</span>
				<div id="badgesTaskForce" class="badgesTaskForce"></div>
				<ul class="addTaskAssignList listD-none" id="dropdown2">
					<li onclick="assigendContactEmail()" class="inviteNewContacts">Invite new contacts<img class="assignInviteNewContactImage" src="assets/img/assigned_inviteNewContact.png" alt="" /></li>
				</ul>
			</div>
		</div>
		<div class="addTaskRightContainer" id="addTaskRightContainer">
			<div class="addTaskDate">
				<h3 class="subTitleAddTask">Due date</h3>
				<input required type="date" id="dueDate" min="2023-01-01" class="addTaskResponsiv" />
				<span class="requiredText" id="dateReq">This field is required</span>
			</div>
			<div class="addTaskPrio">
				<h3 class="subTitleAddTask">Prio</h3>
				<div class="addTaskPrioIcons" id="addTaskPrioIcons">
					<div class="addTaskUrgent" id="addTaskUrgent" onclick="addPrio(0)">
						<span id="addTaskUrgentSpan">Urgent</span>
						<img id="addTaskUrgentImg" src="./assets/img/urgent_arrows.png" />
					</div>
					<div class="addTaskMedium" id="addTaskMedium" onclick="addPrio(1)">
						<span id="addTaskMediumSpan">Medium</span>
						<img id="addTaskMediumImg" src="./assets/img/prio_medium.png" />
					</div>
					<div class="addTaskLow" id="addTaskLow" onclick="addPrio(2)">
						<span id="addTaskLowSpan">Low</span>
						<img id="addTaskLowImg" src="./assets/img/prio_low.png" />
					</div>
				</div>
				<span class='requiredText' id='prioReq'>This field is required</span>
			</div>
			<div class="subtask">
				<h3 class="subTitleAddTask">Subtask</h3>
				<div class="inputDiv addTaskResponsiv">
					<form onsubmit="addSubtask(); return false">
						<input type="text" placeholder="Add new subtask" id="subTask" autocomplete="off" onfocus="subTaskInputentered()" onblur="subTaskInputLeave()" minlength="3" />
						<img src="./assets/img/add_cross.png" class="subtaskCross" id="subtaskCross" onclick="enterSubTaskInput()" />
					</form>
					<div class="subTaskImgDiv d-none" id="subTaskImgDiv">
						<img src="./assets/img/new_cat_cancel.png" onclick="resetSubtaskInput()" />
						<img src="./assets/img/bnt_divider.png" class="btnDivider" />
						<img src="./assets/img/akar-icons_check.png" onclick="addSubtask()" />
					</div>
				</div>
				<div class="addTaskCheckbox" id="subtaskCheckboxes"></div>
			</div>
			<div class="addTaskBtnOuterContainer" id="addTaskBtnOuterContainer">
			<div class="addTaskBtnInnerContainer">
				<button class="addTaskClear" onmouseover="addTaskClearOn()" onmouseout="addTaskClearOff()" onclick="clearFormularData()">
					<span>Clear</span>
					<img id="addTaskClear" src="./assets/img/clearb.png" />
				</button>
				<button class="addTaskCreate" onclick="checkInputs(0)">
					<span>Create Task</span>
					<img src="./assets/img/createb.png" />
				</button>
			</div>
		</div>	
		</div>
	</div>
</div>
	`;
}

/**
 * this function return the input html code for the category selection 'selected a category'.
 */
function resetCatSelectionHtml() {
	return /*html*/ `
        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="./assets/img/new_cat_cancel.png">
            <img src="./assets/img/bnt_divider.png" class='btnDivider'>
            <img src="./assets/img/akar-icons_check.png">
        </div>
        <img src="./assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * this function render the html code for the category input field to create a new category.
 * @returns - the html code for the input field category.
 */
function newCategoryInputHtml() {
	return /*html*/ `
        <input id='selectedCatInput' placeholder='New Category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="./assets/img/new_cat_cancel.png" onclick='resetCatSelection()'>
            <img src="./assets/img/bnt_divider.png" class='btnDivider'>
            <img src="./assets/img/akar-icons_check.png" onclick='setNewCategoryToList()'>
        </div>
        <img src="./assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * this function returns the HTML code for selected category. To show it in the category field.
 * @param {*} newCat - this value is equal to the index of the addTaskCategoryList.
 * @param {*} categoryColor - this value X is equal to the css colorX.
 * @returns - the HTML code for the category field for a existing category.
 */
function existingCategoryHtml(newCat, categoryColor) {
	return /*html*/ `
		<p id='selectedCatInput'>${newCat}</p>
		<span id='sColor'><div class='color${categoryColor} addTaskColorDiv'></div></span>
        <img src="./assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * @param {string} name
 * @param {string} contact
 * @returns html for assignto-list
 */
function generateAssignContactListForDropDownMenu(name, contact) {
	return /*html*/ `
	<li class="addTaskListElements" onclick="addContactToTaskForceWithCheckBox(${contact})">
		${name}
		<div  class="assignCheckboxContainer">
			<img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
			<img id="checkMark${contact}" class="checkMark d-none" src="assets/img/check_mark.png" />
		</div>
	</li>
	`;
}

/**
 *
 * @param {string} name
 * @param {string} contact
 * @returns html for the loggedIn User in assignto-list
 */
function generateLoggedUserHtml(name, contact) {
	return /*html*/ `
	<li onclick="addContactToTaskForceWithCheckBox(${contact})" title="${name}">
		You
		<div  class="assignCheckboxContainer">
			<img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
			<img id="checkMark${contact}" class="checkMark d-none" src="assets/img/check_mark.png" />
		</div>
	</li>
	`;
}

/**
 * It takes in a bunch of parameters and returns a string of HTML.
 * @param {memberOfTaskForce} - This is the name of the task force.
 * @param {firstName} - "John"
 * @param {lastName} - "Smith"
 * @param {initialFirstName} - The first letter of the first name
 * @param {initialLastName} - "S"
 * @param {badgesIndex} - the index of the current member in the array of members
 * @returns A string of HTML.
 */
function generateBadgesTaskForceHtml(memberOfTaskForce, name, initials, badgesIndex) {
	return /*html*/ `
		<div
			id="${memberOfTaskForce}"
			class="badgeTaskForce"
			title="${name}"
			style="background-color:${colorIndex[badgesIndex]}"
		>
			${initials}
		</div>
		`;
}
