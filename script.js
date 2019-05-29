const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
//const rows = [".one", ".two", ".three", ".four", ".five", ".six", ".seven", ".eight", ".nine", ".ten"];
		const codeToGuess = [];
let currentColor = "";
//let previousColor = "";
let currentRow = document.getElementsByClassName("active");


	//draw color code by CPU
	const draw = function () {
		while (codeToGuess.length < 4) {
			const randomNum = Math.floor(Math.random() * colors.length);
			codeToGuess.push(colors[randomNum]);
			console.log(codeToGuess);
		}
	};


$("#1vCPU").click(function () {
	$("#welcome-popup").fadeOut();
	draw();
	let rowIndex = 1;

	//	pick color
	$(".color-pin").click(function () {
		currentColor = this.classList[0];
		console.log(currentColor)
	});

	//	set the selected color
	$(document).on("click", ".active div", function () {
		$(this).removeClass();
		$(this).addClass("pin");
		$(this).addClass(currentColor);
		console.log(this);
		console.log(rowIndex);
	});


	//	check code by Try button
	$("#color-pins button").click(function () {
		let currentRow = $("#play-area .active div");
		let currentPoints = $("#punctation .active div");
		//			console.log(currentRow);
		//			console.log(currentPoints[0].classList.length);
		
		for (let i = 0; i < currentRow.length; i++) {
			if (currentRow[i].classList[1] == codeToGuess[i]) {
				for (let j = 0; j < currentPoints.length; j++) {
					if (currentPoints[j].classList.length < 2) {
						currentPoints[j].classList.add("black");
						currentRow[i].classList.add("checked");
//						codeToGuess[i].classList.add("checked");
						console.log(typeof(codeToGuess[i]))
						break;
					}
				}
			}
			//				if (!currentRow[i].classList.contains("checked")) {
			//					for (i = 0; i < codeToGuess.length; i++) {
			//						if (!codeToGuess[i].classList.contains("checked"))
			//					}
			//				}
		}


		//		if (currentRow[0].classList.length === 2 &&
		//			currentRow[1].classList.length === 2 &&
		//			currentRow[2].classList.length === 2 &&
		//			currentRow[3].classList.length === 2) {
		//			
		//
		//
		//			$(".active").removeClass("active");
		//			rowIndex += 1;
		//			$(`.row-${rowIndex}`).addClass("active");
		//
		//		}
	});


});
