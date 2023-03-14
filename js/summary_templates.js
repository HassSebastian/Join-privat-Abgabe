function generateSummaryHtml(numberInBoard, numberToDo, numberInProgress, numberAwaitingFeedback, numberDone, numberUrgent, nextDueDate) {
	return /*html*/ `
	<div class="summaryContainer">
		<div class="title">
		<span class="kanbanboardTitleSummary"> Kanban Project Management Tool </span>	
		<h3>Summary</h3>
			<img src="./assets/img/vertical_line.png" />
			<h4>Everything in a nutshell!</h4>
		</div>
		<div class="summaryMain">
			<div class="summaryContainerLeft">
				<div class="overview">
					<div class="taskOverview">
						<div id="taskInBoard" onclick="initBoard()">
							<span id="taskInBoardAmount" class="amountSummary">${numberInBoard}</span>
							<p class="nameTask">Task in Board</p>
						</div>
						<div id="taskInProgress" onclick="initBoard()">
							<span id="taskInProgressAmount" class="amountSummary">${numberInProgress}</span>
							<p class="nameTask">Task in Progress</p>
						</div>
						<div id="awaitingFeedback" onclick="initBoard()">
							<span id="awaitingFeedbackAmount" class="amountSummary">${numberAwaitingFeedback}</span>
							<p class="nameTask">Awaiting Feedback</p>
						</div>
					</div>
					<div onclick="initBoard()" class="ugencySummary">
						<div class="urgencyCenterContainer">
							<div class="ugent">
								<div class="ugentImgContainer">
									<img class="ugentImg" id="urgentImg" src="./assets/img/summary_urgent.png" />
								</div>
								<div class="ugentAmount">
									<span id="ugencySummaryAmount" class="amountSummary">${numberUrgent}</span>
									<p id="ugencySummaryurgent" class="nameTask">Urgent</p>
								</div>
								
							</div>
							<div class="ugentVerticalLine"></div>
							<div class="deadlineData">
								<p id="deadlineDate">${nextDueDate}</p>
								<p class="deadlineText"><b>Upcoming Deadline</b></p>
							</div>
						</div>
					</div>
					<div class="toDoData">
						<div onclick="initBoard()" class="toDoDone" id="toDo">
							<div class="toDoDoneSvgContainer">
								<svg class="summarySvg" width="24" height="34" viewBox="0 0 24 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.61559 29.262L3.05082 25.8847L17.211 2.55302C17.7841 1.60874 19.0141 1.30784 19.9584 1.88092L22.1037 3.1829C23.0479 3.75598 23.3488 4.98604 22.7758 5.93031L8.61559 29.262Z" fill="currentColor"/>
								<path d="M7.94001 30.3749L2.37524 26.9976L3.23136 30.4972C3.36259 31.0337 3.90387 31.3622 4.44034 31.231L7.94001 30.3749Z" fill="currentColor"/>
								</svg>							
							</div>							
							<div class="toDoAmountData">
								<span id="toDoAmountTasks" class="amountSummary">${numberToDo}</span>
								<p id="toDoAmountP" class="nameTask">to-Do</p>
							</div>
						</div>
						<div onclick="initBoard()" class="toDoDone" id="toDoDone">
							<div class="toDoDoneSvgContainer">
								<svg class="summarySvg" width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.27832 15.0001L15.5071 26.0662L34.2217 3.93408" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>						
							</div>							
							<div class="toDoAmountData">
								<span id="toDoDoneAmountTasks" class="amountSummary">${numberDone}</span>
								<p id="toDoDoneAmountP" class="nameTask">Done</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="summaryContainerRight">
				<div class="welcome">
					<h4 id="greetUser"></h4>
					<h3>${allUsers[loggedUser[0]].name}</h3>
				</div>
			</div>
		</div>
	</div>
    `;
}
