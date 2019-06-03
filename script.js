const colors = ["blue", "green", "pink", "yellow", "purple", "orange"];
let codeToGuess = [];
let currentColor = "";
let rowIndex = 1;
let code;
let roundIndex = 1;
let playerNumber;
let span1 = document.getElementById("points-1");
let span2 = document.getElementById("points-2");
let penalty = 0;
let currentScore;
let currentCodeRow;

//check which player
const whichPlayer = function () {
	if (roundIndex % 2 == 0) {
		playerNumber = 2;
		currentScore = span2;
	} else {
		playerNumber = 1;
		currentScore = span1;
	}
}

//draw color code by CPU
const draw = function () {
	code = $("#end-game-popup .code .pin");
	let index = 0;
	while (codeToGuess.length < 4) {
		const randomNum = Math.floor(Math.random() * colors.length);
		codeToGuess.push(colors[randomNum]);
		code[index].classList.add(codeToGuess[[index]]);
		index += 1;
	}
	console.log(codeToGuess);
	console.log(code);
};

//set code by player
const setCode = function () {
	let currentCodeRow = $("#two-players-popup .active div");
	let index = 0;
	code = $("#two-players-popup .code .pin")
	if (currentCodeRow[0].classList.length == 2 &&
		currentCodeRow[1].classList.length == 2 &&
		currentCodeRow[2].classList.length == 2 &&
		currentCodeRow[3].classList.length == 2) {

		codeToGuess = [];
		while (codeToGuess.length < 4) {
			codeToGuess.push(currentCodeRow[index].classList[1]);
			code[index].classList.add(codeToGuess[[index]]);
			index += 1;
		}
		console.log(codeToGuess);
		//		console.log(code);
		$(document).on("click", "#play-area .active div", setColor);
		$("#two-players-popup").fadeOut();
	}
}

//pick color
const pickColor = function () {
	currentColor = this.classList[0];
	$(".color-pin").removeClass("currentColor");
	this.classList.add("currentColor");
	$(".prompt").fadeOut();
	//	console.log(currentColor);
	//	console.log(this.classList)
}

//set the selected color
const setColor = function () {
	$(this).removeClass();
	$(this).addClass("pin");
	$(this).addClass(currentColor);
	//	console.log(this.classList);
}

//check result
const checkCode = function () {
	let currentRow = $("#play-area .active div");
	let currentPoints = $("#punctation .active div");

	if (currentRow[0].classList.length === 2 &&
		currentRow[1].classList.length === 2 &&
		currentRow[2].classList.length === 2 &&
		currentRow[3].classList.length === 2) {
		for (let i = 0; i < currentRow.length; i++) {
			if (currentRow[i].classList[1] == codeToGuess[i]) {
				for (let j = 0; j < currentPoints.length; j++) {
					if (currentPoints[j].classList.length < 2) {
						currentPoints[j].classList.add("red");
						currentRow[i].classList.add("checked");
						code[i].classList.add("checked");
						break;
					}
				}
			}
		}
		for (let i = 0; i < currentRow.length; i++) {
			if (!currentRow[i].classList.contains("checked")) {
				for (let j = 0; j < code.length; j++) {

					//						duplicated condition, without it some bug appear, don't know why yet
					if (!code[j].classList.contains("checked") &&
						!currentRow[i].classList.contains("checked") &&
						currentRow[i].classList[1] == code[j].classList[1]) {

						currentRow[i].classList.add("checked");
						code[j].classList.add("checked");

						for (let k = 0; k < currentPoints.length; k++) {
							if (currentPoints[k].classList.length < 2) {
								currentPoints[k].classList.add("white");
								break;
							}
						}
					} else {
						continue;
					}
				}
			} else {
				continue;
			}
		}
		rowIndex += 1;

		whichPlayer();

		if (currentPoints[0].classList.contains("red") &&
			currentPoints[1].classList.contains("red") &&
			currentPoints[2].classList.contains("red") &&
			currentPoints[3].classList.contains("red")) {
			if ($("#two-players-score").is(':hidden')) {
				$("#end-game-popup p").html(`Gratulations<br>You won in: ${rowIndex -1}. attempt!`);
				$("#end-game-popup").fadeIn();
			} else if ($("#two-players-score").is(':visible')) {
				roundIndex += 1;
				$(document).off('click', "#play-area .active div");
				nextRound();
			}
		} else if (rowIndex > 10) {
			if ($("#two-players-score").is(':hidden')) {
				$("#end-game-popup p").html(`Game over<br>Code was:`);
				$("#end-game-popup").fadeIn();
			} else if ($("#two-players-score").is(':visible')) {
				roundIndex += 1;
				penalty = 11;
				$(document).off('click', "#play-area .active div");
				nextRound();
			}
		}

		$(".active").removeClass("active");
		$(`.row-${rowIndex}`).addClass("active");
		$(".code .pin").removeClass("checked");
	}
}

//<---play with computer--->
$("#1vCPU").click(function () {
	$("#welcome-popup").fadeOut();
	draw();
	$(".prompt").fadeIn();

	//	pick color
	$(".color-pin").click(pickColor);

	//	set the selected color
	$(document).on("click", "#play-area .active div", setColor);

	//	check code by Try button
	$("#color-pins button").click(checkCode);
});

//reload game
$("#end-game-popup button").click(function () {
	window.location.reload();
})



//<---play with friend--->
$("#1v1").click(function () {

	$("#welcome-popup").fadeOut();
	$("#two-players-popup").fadeIn();
	$("#two-players-score").fadeIn();
	$(".prompt").fadeIn();
	$(".color-pin").click(pickColor);
	$(document).on("click", "#two-players-popup .active div", setColor);
	$("#two-players-popup button").click(setCode);
	

	$("#color-pins button").click(checkCode);
})

const nextRound = function () {
	$("#end-round-popup .pin").removeClass();
	$("#end-round-popup .code div").addClass("pin");

	$("#end-round-popup .pin")[0].classList.add(codeToGuess[0]);
	$("#end-round-popup .pin")[1].classList.add(codeToGuess[1]);
	$("#end-round-popup .pin")[2].classList.add(codeToGuess[2]);
	$("#end-round-popup .pin")[3].classList.add(codeToGuess[3]);

	if (penalty == 11) {
		currentScore.textContent = parseInt(currentScore.textContent) + penalty;
		$("#end-round-popup p").html("Sorry, you missed a chance<br>Code was:");
		$("#end-round-popup").fadeIn();
	} else {
		currentScore.textContent = parseInt(currentScore.textContent) + (rowIndex - 1);
		$("#end-round-popup p").html(`Gratulations<br>You guessed in: ${rowIndex -1}. attempt!`);
		$("#end-round-popup").fadeIn();
	}
	penalty = 0;

	const newRound = function () {
		whichPlayer();
		$("#end-round-popup").fadeOut();
		rowIndex = 1;
		$("#play-area .pin").removeClass();
		$("#play-area .pins-row div").addClass("pin");
		$(".point").removeClass();
		$(".round-punctation div").addClass("point");
		console.log($(".active"));
		$(".active").removeClass("active");
		$(`.row-${rowIndex}`).addClass("active");
		$("#two-players-popup h2").text(`Player ${playerNumber} set the code:`);
		$("#two-players-popup .pin").removeClass();
		$("#two-players-popup .code div").addClass("pin");
		$("#two-players-popup .code").addClass("active");
		$(document).on("click", "#two-players-popup .active div", setColor);
		$("#two-players-popup").fadeIn();
	}

	$("#end-round-popup button").click(newRound);
}
