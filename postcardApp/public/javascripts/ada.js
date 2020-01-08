var booleCounter = 0;
	var boolePhrase = "George Boole was here";

	$(document).ready(function() {
    		$('button').click(function () {
				$.get('http://localhost:3000/quote', function(data, status) {
					console.log(`${data}`)
				})
			}) 
        		
		$('blockquote').click(function (event) {
			goToSource(this); 
			}
		);
		$('.english').click(function (event) {
			translatePhrase(this);
			}
		); 
		$('#img1').hover(function (event) {
			$('body').css('background-color', 'white');
			},
			function (event) {
			$('body').css('background-color', '#efd469');
			}
		);
		$('#img2').hover(function (event) {
			$('body').css('background-color', '#87fd23');
			},
			function (event) {
			$('body').css('background-color', '#efd469');
			}
		);
		$('#img3').hover(function (event) {
			$('body').css('background-color', 'black');
			},
			function (event) {
			$('body').css('background-color', '#efd469');
			}
		);
		$('#img4').hover(function (event) {
			$('body').css('background-color', 'cyan');
			},
			function (event) {
			$('body').css('background-color', '#efd469');
			}
		);

	});

	function goToSource(quote) {
		console.log(quote.innerHTML);
		window.open(quote.cite);
	}

	function translatePhrase(phrase) {
		var text = phrase.innerHTML;
		var url = "https://translate.google.com/#en/sv/" + encodeURI(text);
		window.open(url);		
	}

	function booleify(element) {
		if($(element).html() !== boolePhrase) {
			$(element).html("George Boole was here");
			$(element).addClass('english');
			booleCounter++;
			if(booleCounter === 4) {
				$('.english').css('color', 'white');
				$('.english').css('font-weight', 'bold');
			}
		} else {
			translatePhrase(element);
		}
	} 
