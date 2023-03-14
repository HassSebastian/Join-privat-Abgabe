/**
 * this function returns the basic board html string
 * @returns - basic board html string
 */
function boardHtml() {
	return /*html*/ `
    <div class="boardContainer">
			<div class="boardOverlay">
			<span class="kanbanboardTitleSummary"> Kanban Project Management Tool </span>
				<div class="boardHeadline">
					<span>Board</span>
				</div>
				<div class="inputOutContainer">
					<div class="inputContainer">
						<div class="inputInContainer">
							<div class="inputFontContainer">
								<input type="text" id="searchField" required placeholder="Find Task" onfocus="startSearch(event)" autocomplete="off" />
							</div>
							<div class="vector"></div>
							<img src="./assets/img/search_logo.png" />
						</div>
					</div>
					<button class="addTaskButton" onclick="showAddTaskPopupWindow(0)">
						<span>Add task</span>
						<div class="plusOutContainer">
							<img src="./assets/img/plus_logo_white.png" />
						</div>
					</button>
				</div>
			</div>
			<div class="canbanBoard" id="canbanBoard">
				<div class="columnBoard">
					<div class="toDoAreaHeader">
						<span>To do</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(0)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea0" ondrop="moveTo(0); removeHighlight('dropArea0')" ondragleave="removeHighlight('dropArea0')" ondragover="allowDrop(event); highlight('dropArea0')">
						<div id="toDoDiv"></div>
					</div>
				</div>

				<div class="columnBoard">
					<div class="inProgressAreaHeader">
						<span>In progress</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(1)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea1" ondrop="moveTo(1); removeHighlight('dropArea1')" ondragleave="removeHighlight('dropArea1')" ondragover="allowDrop(event); highlight('dropArea1')">
						<div id="progressDiv"></div>
					</div>
				</div>

				<div class="columnBoard">
					<div class="awaitingFeedbackAreaHeader">
						<span>Awaiting Feedback</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(2)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea2" ondrop="moveTo(2); removeHighlight('dropArea2')" ondragleave="removeHighlight('dropArea2')" ondragover="allowDrop(event); highlight('dropArea2')">
						<div id="awaitingDiv"></div>
					</div>
				</div>

				<div class="columnBoard">
					<div class="doneAreaHeader">
						<span>Done</span>
						<button class="menuPlusButton" onclick="showAddTaskPopupWindow(3)"></button>
					</div>
					<div class="canbanContainer dragArea" id="dropArea3" ondrop="moveTo(3); removeHighlight('dropArea3')" ondragleave="removeHighlight('dropArea3')" ondragover="allowDrop(event); highlight('dropArea3')">
						<div id="doneDiv"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="shadowOverlay d-none" id="boardPopup" onclick="disablePopupWindow()"></div>`;
}

/**
 * It takes the index of a task in the joinTaskArray, and then it renders the assignedTo property of
 * that task as HTML.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function renderAssignToHtml(taskIndex) {
	let assignedList = joinTaskArray[taskIndex]['assignedTo'];
	let divId = 'contributorsList' + taskIndex;
	document.getElementById(divId).innerHTML = '';
	if (assignedList.length > 0) {
		if (assignedList.length <= 3) {
			for (let i = 0; i < assignedList.length; i++) {
				let name = assignedList[i].name;
				let nameLetters = assignedList[i].firstSecondLetter;
				let assignToColor = colorIndex[assignedList[i].colorIndex];
				let assignToTitle = name;
				document.getElementById(divId).innerHTML += /*html*/ `
                <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span>${nameLetters}</span>
                </div>`;
			}
		} else {
			for (let i = 0; i < 3; i++) {
				let name = assignedList[i].name;
				let nameLetters = assignedList[i].firstSecondLetter;
				let assignToColor = colorIndex[assignedList[i].colorIndex];
				let assignToTitle = name;
				document.getElementById(divId).innerHTML += /*html*/ `
                <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span>${nameLetters}</span>
                </div>`;
			}
			let assignedListLength = assignedList.length - 3;
			document.getElementById(divId).innerHTML += /*html*/ `
            <div class='contributorsLogo' style='background-color:#000000; color:white'>
                <span>+${assignedListLength}</span>
            </div>`;
		}
	}
}

/**
 * this function returns the html code for each todo task card.
 * @param {number} arrayIndex - is the index number of the workStatus0Array.
 * @returns - the html string for each todo task card.
 */
function toDoCardHtml(arrayIndex) {
	let cardTitle = workStatus0Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus0Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus0Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus0Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 0;
	let subTasksAmount = workStatus0Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                       
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * this function returns the html code for each in progress task card.
 * @param {number} arrayIndex - is the index number of the workStatus1Array.
 * @returns - the html string for each in progress task card
 */
function inProgressHtml(arrayIndex) {
	let cardTitle = workStatus1Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus1Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus1Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus1Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 1;
	let subTasksAmount = workStatus1Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='boardTaskCategory' id='progressCard${arrayIndex}'>
                        <span>${cardCategory}</span>
                    </div>
                    <div class='taskHeadline'>
                        <span class='taskHeadlineContent'>${cardTitle}</span>
                        <span class='taskContent'>${cardDescription}</span>
                    </div>
                    <div class='doneBar'>
                        <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                            <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                        </div>
                        <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                    </div>
                    <div class='contributorsPrio'>
                        <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                           
                        </div>
                        <div class='prio'>
                            <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                        </div>
                    </div>
                </div>
            </div>`;
}

/**
 * this function returns the html code for each awaitingFeedback task card.
 * @param {number} arrayIndex - is the index number of the workStatus2Array.
 * @returns - the html string for each awaitingFeedback task card
 */
function awaitingFeedbackHtml(arrayIndex) {
	let cardTitle = workStatus2Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus2Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus2Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus2Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 2;
	let subTasksAmount = workStatus2Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='feedbackCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * this function returns the html code for each done task card.
 * @param {number} arrayIndex - is the index number of the workStatus3Array.
 * @returns - the html string for each done task card
 */
function doneHtml(arrayIndex) {
	let cardTitle = workStatus3Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus3Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus3Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus3Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 3;
	let subTasksAmount = workStatus3Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(${taskIndex}); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='doneCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}
