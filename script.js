const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
//const rows = [".one", ".two", ".three", ".four", ".five", ".six", ".seven", ".eight", ".nine", ".ten"];
const codeToGuess = [];
const code = $(".code .pin");
let currentColor = "";
//let previousColor = "";
//let currentRow = document.getElementsByClassName("active");


//draw color code by CPU
const draw = function () {
	let index = 0;
	while (codeToGuess.length < 4) {
		const randomNum = Math.floor(Math.random() * colors.length);
		codeToGuess.push(colors[randomNum]);
		code[index].classList.add(codeToGuess[[index]]);
		index += 1;
	}
};


$("#1vCPU").click(function () {
	$("#welcome-popup").fadeOut();
	draw();

	let rowIndex = 1;

	//	pick color
	$(".color-pin").click(function () {
		currentColor = this.classList[0];
		//		console.log(currentColor)
	});

	//	set the selected color
	$(document).on("click", "#play-area .active div", function () {
		$(this).removeClass();
		$(this).addClass("pin");
		$(this).addClass(currentColor);
		//		console.log(this);
		//		console.log(rowIndex);
	});


	//	check code by Try button
	$("#color-pins button").click(function () {

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
							console.log("przypisujemy czarne");
							console.log(currentRow[i]);
							console.log(code[i]);
							break;
							//						continue;
						}
					}
				}
			}
			
			console.log("czarne przypisane, teraz przypisujemy biale")

			for (let i = 0; i < currentRow.length; i++) {
				if (!currentRow[i].classList.contains("checked")) {
					for (let j = 0; j < code.length; j++) {

						//						duplicated condition, without it some bug appear, don't know why yet
						if (!code[j].classList.contains("checked") && !currentRow[i].classList.contains("checked") && currentRow[i].classList[1] == code[j].classList[1]) {

							currentRow[i].classList.add("checked");
							code[j].classList.add("checked");
							console.log("białe:");
							console.log(currentRow[i]);
							console.log(code[j]);

							for (let k = 0; k < currentPoints.length; k++) {
								if (currentPoints[k].classList.length < 2) {
									currentPoints[k].classList.add("white");
									console.log(`przypisanie punktu białego`);
									console.log(currentPoints[k]);
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
			
			
			$(".active").removeClass("active");
			rowIndex += 1;
			$(`.row-${rowIndex}`).addClass("active");
			$(".code .pin").removeClass("checked");
			console.log(code[0].classList);
		}
	});

});
