$(document).ready(function() {

	var validRomanNumbers = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000
	}

	var firstRoman, secondRoman
	var firstSubstitutedValue, secondSubstitutedValue, result
	var sortedString = ''
	var roman = ''
	function validateInput(input) {
		var isValid
		for ( i = 0 ; i < input.length ; i++ ) {
			for ( var key in validRomanNumbers ) {
				if ( key === input[i] ){
					isValid = true
					break
				}
				else {
					isValid = false
				}
			}
		}
		return isValid
	} 

	function displayCalculationArea() {
		$('#inputScreen').addClass('hide')
		$('.steps').removeClass('hide')
		$('.firstInput').removeClass('hide')
		$('.secondInput').removeClass('hide')
		$('.showFirstRoman').removeClass('hide')
		$('.showSecondRoman').removeClass('hide')
		$('.substitutionTable').removeClass('hide')
		$('.showFirstRoman').append(firstRoman)
		$('.showSecondRoman').append(secondRoman)
		$('.steps').html('Substitute for any subtractives')
	}

	function substitute(input, location) {
		var pattern1 = new RegExp(/IV/g)
		var pattern2 = new RegExp(/IX/g)
		var pattern3 = new RegExp(/XL/g)
		var pattern4 = new RegExp(/XC/g)
		var pattern5 = new RegExp(/CD/g)
		var pattern6 = new RegExp(/CM/g)
		var substitute1 = input.replace(pattern1, 'IIII')
		var substitute2 = substitute1.replace(pattern2, 'VIIII')
		var substitute3 = substitute2.replace(pattern3, 'XXXX')
		var substitute4 = substitute3.replace(pattern4, 'LXXXX')
		var substitute5 = substitute4.replace(pattern5, 'CCCC')
		var substitute6 = substitute5.replace(pattern6, 'DCCCC')
		$(location).html(substitute6)
		return substitute6
	}

	function sortString(input) {
		setTimeout(function() {
			var string = input
			var array = []
			for ( i = 0 ; i < string.length ; i ++ ) {
				for ( var key in validRomanNumbers ) {
					if ( string[i] === key )
						array.push(validRomanNumbers[key])
				}
			}

			var sorted = array.sort(function(a, b) {
				return b - a
			})

			for ( i = 0 ; i < sorted.length ; i ++ ) {
				for ( var key in validRomanNumbers ) {
					if ( sorted[i] === validRomanNumbers[key] )
						sortedString += key
				}
			}
			$('.steps').html('Sort the symbols in order from left-to-right with the "largest" symbols on the left ')
			$('.result').html(sortedString)
		}, 6000 )
	}

	function showSubstitutedValues() {
		$('.substitutedValue1').removeClass('hide')
		$('.substitutedValue2').removeClass('hide')
		$('.substitutedValue1').append(firstSubstitutedValue)
		$('.substitutedValue2').append(secondSubstitutedValue)
	}

	function combineGroups() {
		setTimeout(function() {
			var str = ''
			var possibleGroups = {
				IIIII: 'V',
				VV: 'X',
				XXXXX: 'L',
				LL: 'C',
				CCCCC: 'D',
				DD: 'M'
			}
			str = sortedString.split('').reverse().join('')
			$('.unGroupedValue').append('&emsp;' + $('.result').html())
			findGroups(str, possibleGroups)
		}, 9000)
	}

	function findGroups(string, group) {
		var step = 0
		var time = setInterval(function() {
			for ( var key in group ) {
				if ( string.indexOf(key) >= 0 ) {
					$('.steps').html('Starting with the right end, combine groups of the same symbols that' + '<br>' + 'can make a "larger" one and substitute the single larger one.')
					string = string.replace(key, group[key])
					string = string.split('').reverse().join('')
					$('.found').show(1000)
					$('.replacement').show(1000)
					$('.showFirstRoman').hide(1000)
					$('.showSecondRoman').hide(1000)
					$('.substitutedValue1').hide(1000)
					$('.substitutedValue2').hide(1000)
					$('.unGroupedValue').show(1000)
					if ( step === 0 ) {
						$('.result').animate({ top: '+=25%' }, 1000)
						step = 1
					}
					showFoundGroups(key, group[key], string)
					break
				}
			}
			string = string.split('').reverse().join('')
			console.log(string)
		}, 2000)
	}

	function showFoundGroups(found, replacement, res) {
		setTimeout(function() {
			$('#found').html(found)
			$('#replacement').html(replacement)
			$('.result').html(res)
		}, 2000)
	}

	function concatStrings(string) {
		setTimeout(function() {
			$('.steps').html('Put the two values together ')
			$('.firstInput').addClass('hide')
			$('.substitutionTable').addClass('hide')
			$('.secondInput').addClass('hide')
			$('.result').removeClass('hide')
			$('.result').html(firstSubstitutedValue + '&emsp;' + '+' + '&emsp;' + secondSubstitutedValue + '&emsp;' + '=' + '&emsp;' + string)
			showSubstitutedValues()
		}, 3000 )
	}

	function addRomans() {
		displayCalculationArea()
		firstSubstitutedValue = substitute(firstRoman, '.firstInput')
		secondSubstitutedValue = substitute(secondRoman, '.secondInput')
		result = firstSubstitutedValue.concat(secondSubstitutedValue)
		concatStrings(result)
		var sorted = sortString(result)
		combineGroups()
	}

	$('.buttonAdd').click( function() {
		firstRoman = $('#firstInput').val()
		secondRoman = $('#secondInput').val()
		var isFirstValid = validateInput(firstRoman)
		var isSecondValid = validateInput(secondRoman)
		if ( isFirstValid && isSecondValid) {
			addRomans()
		}
		else {
			alert('enter valid Roman Numbers!!')
			if ( !isFirstValid && !isSecondValid ) {
				$('#firstInput').val('')
				$('#secondInput').val('')
			}
			else if ( !isSecondValid )
				$('#secondInput').val('')
			else if ( !isFirstValid )
				$('#firstInput').val('')
		}
	})

	function showMultiplicationProcedure() {
		setTimeout(function() {
			$('.steps').html('For each symbol in one value form the product with every symbol in the second')
			$('.substitutionTable').hide(500)
		}, 2000)
	} 

	function multiplyRomans() {
		displayCalculationArea()
		firstSubstitutedValue = substitute(firstRoman, '.firstInput')
		secondSubstitutedValue = substitute(secondRoman, '.secondInput')
		showMultiplicationProcedure()
		multiply(firstSubstitutedValue, secondSubstitutedValue)
	}

	function convertToRoman(num) {
		var temp = 0
		var value = num

		if ( value === 0 )
			return roman

		else if ( String(value).length >= 4 ) {
			temp = Math.floor( value / 1000 )
			for ( iter = 0 ; iter < temp ; iter++ )
				roman += 'M'
			value = value % 1000
			convertToRoman(value)		
		}

		else if ( String(value).length === 3 ) {
			temp = Math.floor( value / 100 )
			for ( iter = 0 ; iter < temp ; iter++ )
				roman += 'C'
			value = value % 100
			convertToRoman(value)
		}

		else if ( String(value).length === 2 ) {
			temp = Math.floor( value / 10 )
			for ( iter = 0 ; iter < temp ; iter++ )
				roman += 'X'
			value = value % 10
			convertToRoman(value)
		}

		else if ( String(value).length === 1 ) {
			for ( iter = 0 ; iter < value ; iter++ )
				roman += 'I'
			value = value % 1
			convertToRoman(value)
		}

		return group(roman)
	}

	function group(value) {
		var possibleGroups = {
				IIIII: 'V',
				VV: 'X',
				XXXXX: 'L',
				LL: 'C',
				CCCCC: 'D',
				DD: 'M'
			}
		var str = value.split('').reverse().join('')
		for ( var key in possibleGroups ) {
			if ( str.indexOf(key) >= 0 ) {
				str = str.replace(key, possibleGroups[key])
			}
		}
		str = str.split('').reverse().join('')
		return str
	}

	function multiply(firstString, secondString) {
		i = 0
		j = 0
		var time = setInterval(function() {
			var firstNumber, secondNumber, res, match
			if ( i < firstString.length ) {
				if ( j < secondString.length ) {
					$.each( validRomanNumbers, function( key, value ) {
						if ( key === firstString[i] )
							firstNumber = value
					})
					$.each( validRomanNumbers, function( key, value ) {
						if ( key === secondString[j] )
							secondNumber = value
					})
					var res = firstNumber*secondNumber
					$.each( validRomanNumbers, function( key, value ) {
						if ( validRomanNumbers[key] === res )
							match = key
					})
					if ( typeof(match) === 'undefined')
						match = convertToRoman(res)
					$('.firstInput').html(firstString.substring(0, i) + '<span>' + firstString.substring(i, i+1) + '</span>' + firstString.substring(i+1))
					$('.secondInput').html(secondString.substring(0, j) + '<span>' + secondString.substring(j, j+1) + '</span>' + secondString.substring(j+1))
					$('.result').addClass('slide')
					$('.result').removeClass('hide')
					$('.result').append('<span>' + match + '</span>')
					j++
				}
				else {
					i++
					j = 0
				}
			}
			else {
				$('.firstInput').html(firstString)
				$('.secondInput').html(secondString)
				clearInterval(time, sortResult() )
			}
		}, 1500)
	}

	function sortResult() {
		setTimeout( function() {
			alert('apurv')
		}, 1000 )
	}

	$('.buttonMul').click( function() {
		firstRoman = $('#firstInput').val()
		secondRoman = $('#secondInput').val()
		var isFirstValid = validateInput(firstRoman)
		var isSecondValid = validateInput(secondRoman)
		if ( isFirstValid && isSecondValid) {
			multiplyRomans()
		}
		else {
			alert('enter valid Roman Numbers!!')
			if ( !isFirstValid && !isSecondValid ) {
				$('#firstInput').val('')
				$('#secondInput').val('')
			}
			else if ( !isSecondValid )
				$('#secondInput').val('')
			else if ( !isFirstValid )
				$('#firstInput').val('')
		}
	})
})