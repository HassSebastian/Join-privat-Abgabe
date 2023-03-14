let menuSelectorStyles = [
	{
		background: 'background-color: #091931;',
		disabledBackground: 'background-color: unset;',
		color: 'color: #FFFFFF;',
		color1: 'color: default;',
		enableImg: 'imgDisplay',
		disableImg: 'imgDisplayNone',
	},
	{
		menuName: 'btn_summary_menu',
		img1Id: 'imgSummary1',
		img2Id: 'imgSummary2',
		url: './summary.html',
	},
	{
		menuName: 'btn_board_menu',
		img1Id: 'imgBoard1',
		img2Id: 'imgBoard2',
		url: './board.html', //hinzu gefügt//
	},
	{
		menuName: 'btn_add_task_menu',
		img1Id: 'imgAddTask1',
		img2Id: 'imgAddTask2',
		url: './add_task.html',
	},
	{
		menuName: 'btn_contacts_menu',
		img1Id: 'imgContacts1',
		img2Id: 'imgContacts2',
	},
	{
		menuName: 'btnLegalNotice',
		url: './legalNotice.html',
	},
];

let colorUserIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];

let selectedMenuBtnId;
let includeAttribute = 'w3-include-html';

function initLoginStart() {
	window.location.href = 'loginDesk.html';
}

async function loadApplicableSummary() {
	init();
}

let desktopView;
let viewchange = false;

async function init() {
	await includeHTML();
	initSummary();
}

async function includeHTML() {
	let includeElements = document.querySelectorAll(`[${includeAttribute}]`);
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute(`${includeAttribute}`);
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = 'Page not found';
		}
	}
}

function selectedMenuButton(menuId) {
	if (selectedMenuNotShownAndNotLegalNotice(menuId)) {
		setMenuBtnStyle(menuId);
	}
	if (selectedMenuIsLegalNoticeAndNotShown) {
		setLegalNoticeBtnStyle(menuId);
	}
	selectedMenuBtnId = menuId;
	enableDisableScrollContent();
}

function enableDisableScrollContent() {
	if (selectedMenuBtnId == 4) {
		document.getElementById('content').style = 'overflow: hidden; overflow-y: hidden;';
	}
	if (selectedMenuBtnId == 3 || selectedMenuBtnId == 2) {
		document.getElementById('content').style = 'overflow: hidden; overflow-y: scroll;';
	}
}

function selectedMenuNotShownAndNotLegalNotice(menuId) {
	return selectedMenuBtnId != menuId && menuId != 5;
}

function selectedMenuIsLegalNoticeAndNotShown(menuId) {
	return menuId == 5 && selectedMenuBtnId != 5;
}

function setMenuBtnStyle(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
	document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color'];
	document.getElementById(img1Id).classList.add(menuSelectorStyles[0]['disableImg']);
	document.getElementById(img2Id).classList.add(menuSelectorStyles[0]['enableImg']);
	if (otherMenuBtnPreSelected()) {
		deselectMenuButton(selectedMenuBtnId);
	}
	if (!document.querySelector('.mobileContent')) {
		setMenuBtnStyleSlider(menuId);
	}
}

function setMenuBtnStyleSlider(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	menuBtnId = menuBtnId + '1';
	img1Id = img1Id + '1';
	img2Id = img2Id + '1';
	document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
	document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color'];
	document.getElementById(img1Id).classList.add(menuSelectorStyles[0]['disableImg']);
	document.getElementById(img2Id).classList.add(menuSelectorStyles[0]['enableImg']);
}

function deselectMenuButtonSlider(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	menuBtnId = menuBtnId + '1';
	img1Id = img1Id + '1';
	img2Id = img2Id + '1';
	if (legalNoticeNotSelected()) {
		document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
		document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color1'];
		document.getElementById(img1Id).classList.remove(menuSelectorStyles[0]['disableImg']);
		document.getElementById(img2Id).classList.remove(menuSelectorStyles[0]['enableImg']);
	}
	if (legalNoticeSelected()) {
		document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
	}
}

function otherMenuBtnPreSelected() {
	return selectedMenuBtnId;
}

function setLegalNoticeBtnStyle(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
	if (otherMenuBtnPreSelected()) {
		deselectMenuButton(selectedMenuBtnId);
	}
}

function deselectMenuButton(menuId) {
	let menuBtnId = menuSelectorStyles[menuId]['menuName'];
	let img1Id = menuSelectorStyles[menuId]['img1Id'];
	let img2Id = menuSelectorStyles[menuId]['img2Id'];
	if (legalNoticeNotSelected()) {
		document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
		document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color1'];
		document.getElementById(img1Id).classList.remove(menuSelectorStyles[0]['disableImg']);
		document.getElementById(img2Id).classList.remove(menuSelectorStyles[0]['enableImg']);
	}
	if (legalNoticeSelected()) {
		document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
	}
	if (!document.querySelector('.mobileContent')) {
		deselectMenuButtonSlider(menuId);
	}
}

function legalNoticeNotSelected() {
	return selectedMenuBtnId != 5;
}

function legalNoticeSelected() {
	return selectedMenuBtnId == 5;
}

async function openSubPage(menuId) {
	let url = menuSelectorStyles[menuId]['url'];
	let target = '_parent';
	await window.open(url, target);
}

function renderList() {
	renderSummary();
	renderBoard(); //hinzu gefügt//
	renderLegalNotice();
}

function logOutBtn() {
	document.getElementById('logOut').classList.toggle('logOutOn');
}

function logOut() {
	window.location.href = './index.html';
	localStorage.removeItem('loggedUser');
}

function loadContributorsLetter() {
	let colorIndex = allUsers[loggedUser[0]].colorIndex;
	document.getElementById('contributorsLogoHeadder').style = `background:${colorUserIndex[colorIndex]}`;
	document.getElementById('contributorsLogoHeadderLetters').innerHTML = `<p style='color:white'>${allUsers[loggedUser].firstSecondLetter}</p>`;
}
