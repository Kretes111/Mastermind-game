const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
const codeToGuess = [];
const code = $(".code .pin");
let currentColor = "";
let rowIndex = 1;

//draw color code by CPU
const draw = function () {
	let index = 0;
	while (codeToGuess.length < 4) {
		const randomNum = Math.floor(Math.random() * colors.length);
		codeToGuess.push(colors[randomNum]);
		code[index].classList.add(codeToGuess[[index]]);
		index += 1;
	}
	console.log(codeToGuess)
};

//pick color
const pickColor = function () {
	currentColor = this.classList[0];
}

//set the selected color
const setColor = function () {
	$(this).removeClass();
	$(this).addClass("pin");
	$(this).addClass(currentColor);
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
						currentPoints[j].classList.add("black");
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

		if (currentPoints[0].classList.contains("black") &&
			currentPoints[1].classList.contains("black") &&
			currentPoints[2].classList.contains("black") &&
			currentPoints[3].classList.contains("black")) {
			$("#end-game-popup p").html(`Gratulations<br>You won in: ${rowIndex -1}. attempt!`);
			$("#end-game-popup").fadeIn();
		} else if (rowIndex > 10) {
			$("#end-game-popup p").html(`Game over<br>Code was:`);
			$("#end-game-popup").fadeIn();
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
$("#1v1").click(function() {
	$("#welcome-popup").fadeOut();
	$("#two-players-popup").fadeIn();
	$("#two-players-score").fadeIn();
})