$(document).ready(function() {
	var multiplier
	var multiplicand
	var time
	function checkInput( inputBoxId ) {
		var condition
		var input = $.trim( $(inputBoxId).val())
		if ( input.length === 0 )
			condition = true
		for( i = 0; i < input.length ; i ++ ) {
			if ( input[i] === '1' ) 
				condition = true
			else {
				alert("Unary number contains only 1's!!!! \n Try again!!!")
				$(inputBoxId).val('')
				condition = false
				break
			}
		}
		return condition
	}

	function drawArrow(id) {
		var context = $(id)[0].getContext('2d')
		context.beginPath()
		context.moveTo( 50, 5 )
		context.lineTo( 50, 55 )
		context.lineTo( 40, 45)
		context.moveTo( 50, 55 )
		context.lineTo( 60, 45 )
		context.stroke()
	}

	function animateFirstInput() {
		var input = $.trim( $('#firstInput').val())
		$('#inputScreen').addClass('hide')
		$('.firstArrow').removeClass('hide')
		$('#firstString').html(input)
		drawArrow('#canvas1')
		$('#firstString').delay(500).animate({marginTop: '+=80%'},2000).delay(500).animate({marginLeft: '+=70%'},2000).delay(500).hide(1)
	}

	function animateSecondInput() {
		var input = $.trim( $('#secondInput').val())
		$('.secondArrow').removeClass('hide')
		$('#secondString').html(input)
		drawArrow('#canvas2')
		$('#secondString').delay(500).animate({marginTop: '+=80%'},2000).delay(500).animate({marginLeft: '-=70%'},2000).delay(500).hide(1, function() {
			showResult()
		})
	}

	function showAddition() {
		$('.result').removeClass('hide')
	}

	function showResult() {
		var firstInput = $.trim( $('#firstInput').val())
		var secondInput = $.trim( $('#secondInput').val())
		var result = firstInput.concat(secondInput)
		$('.result').append('<p>' + result + '</p>')
	}

	$('.buttonAdd').click(function() {
		if ( checkInput('#firstInput') && checkInput('#secondInput') ) {
			showAddition()
			animateFirstInput()
			animateSecondInput()
		}
	})

	function showMultipliationStatement() {
		$('.multiplicationStatement').removeClass('hide')
		$('.multiplicationInputs').removeClass('hide')
		$('#inputScreen').addClass('hide')
		$('.result').addClass('hide').delay(1000).queue(inputs)
	}

	function showCount(firstInput, secondInput) {
		$('.firstMultiplicationInput').append('<p>' + 'count = ' + firstInput.length + '</p>')
		$('.secondMultiplicationInput').append('<p>' + 'count = ' + secondInput.length + '</p>').dequeue().delay(2000).queue(function() {
			showLeastCount( firstInput, secondInput )
		})
	}

	function showLeastCount(inputFirst, inputSecond) {
		var least
		if ( inputFirst < inputSecond ) { 
			$('.leastCount').append('Least Count = ' + inputFirst.length)
			least = inputFirst.length
		}
		else {
			$('.leastCount').append('Least Count = ' + inputSecond.length)
			least = inputSecond.length
		}
		hideInputs()
	}

	function inputs() {
		var inputFirst = $.trim( $('#firstInput').val())
		$('.firstMultiplicationInput').append('<p>' + inputFirst + '</p>')
		var inputSecond = $.trim( $('#secondInput').val())
		$('.secondMultiplicationInput').append('<p>' + inputSecond + '</p>').delay(2000).queue(function() {showCount( inputFirst, inputSecond )})
	}

	function hideInputs() {
		$('.multiplicationInputs').addClass('hide')
		$('.leastCount').animate({ top: '-=40%' },1000).delay(1000).queue(function() { showMultiplicationResult() })
	}

	function showMultiplicationResult() {
		$('.multiplicationResult').removeClass('hide')
		var inputFirst = $.trim( $('#firstInput').val())
		var inputSecond = $.trim( $('#secondInput').val())
		if ( inputFirst < inputSecond ) {
			multiplier = inputFirst.length
			multiplicand = inputSecond
		}
		else {
			multiplier = inputSecond.length
			multiplicand = inputFirst
		}
		displayResult()
	}

	function displayResult() {
			time = setInterval( multiply, 1000 )
	}

	function multiply() {
		if ( multiplier > 0 ) {
			$('.leastCount').html('Least Count = ' + multiplier)
			$('.multiplicationResultDisplay').append(multiplicand)
			multiplier --
		}
		else {
			clearInterval(time)
			$('.multiplicationResult').html('Result : ')
			$('.leastCount').addClass('hide')
		}
	}

	$('.buttonMul').click(function() {
		if ( checkInput('#firstInput') && checkInput('#secondInput') ) {
			showMultipliationStatement()
		}
	})
})