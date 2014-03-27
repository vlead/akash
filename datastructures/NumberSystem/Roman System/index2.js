var firstValue;
var secondValue;
var res1 = new Array();
var res2 = new Array();
var res3 = new Array();
var res4 = new Array();
var res5 = new Array();
var res6 = new Array();
var romanNumeral,decimal;
function add(firstValue,secondValue)
{
	firstValue = document.getElementById('first').value.toUpperCase();
	secondValue = document.getElementById('second').value.toUpperCase();
 	
	
	var resultf1 = firstValue.replace(/[I][V]/g,"IIII");
	var resultf2 = resultf1.replace(/[I][X]/g,"VIIII");
	document.getElementById('third').value = resultf2;
	
	var results1 = secondValue.replace(/[I][V]/g,"IIII");
	var results2 = results1.replace(/[I][X]/g,"VIIII");
	document.getElementById('fourth').value = results2;

		
	var res = resultf2.concat(results2);
	document.getElementById('fifth').value = res;
	for(i=0;i<res.length;i++)
	{
	 res1[i] = res.charAt(i);
	}	
	//alert(res1);
	 res2 = toDecimal(res1);
	//alert(res2);
	 res3 = res2.sort(function(a,b){return a-b});
	 //alert(res3);
	 res4 = res3.reverse();
	//alert(res4);
	var res5 = toRoman(res3);
	//alert(res5);
	var teststring = "";
	for(var i=0;i<res.length;i++)
	{
	 
	teststring +=res5[i];
	}
	res6 = teststring;
	//alert(res6);
	document.getElementById('sixth').value = res6;

	var pattn = /[I]{5}/g;
	var resn = res6.match(pattn);
	if(resn)
	{
	document.getElementById('seventh').value = resn;
	document.getElementById('eighth').value = "V";
	var resn1 = res6.replace(/[I]{5}/g,"V");
	alert(resn1);
	document.getElementById('ninth').value = resn1;
	}
	
	var res6 = resn1;
	var patt1 = /[VV]{2}/g;
	var result1 = res6.match(patt1);
	if(result1)
	{	
	document.getElementById('seventh').value = result1;
	document.getElementById('eighth').value = "X";
	var res7 = res6.replace(/[VV]{2}/g,"X");
	alert(res7);
	document.getElementById('ninth').value = res7;
	}

	var res7 = res6.replace(/[VV]{2}/g,"X");
	var patt2 = /[LL]{2}/g;
	var result2 = res7.match(patt2);
	if(result2)
	{
	document.getElementById('seventh').value = result2;
	document.getElementById('eighth').value = "C";
	var res8 = res7.replace(/[LL]{2}/g,"C");
	alert(res8);
	document.getElementById('ninth').value = res8;
	}

	var res8 = res7.replace(/[LL]{2}/g,"C");
	var patt3 = /[DD]{2}/g;
	var result3 = res8.match(patt3);
	if(result3)
	{
	document.getElementById('seventh').value = result3;
	document.getElementById('eighth').value = "M";
	var res9 = res8.replace(/[DD]{2}/g,"M");
	alert(res9);
	document.getElementById('ninth').value = res9;
	}

	/*var res9 = res8.replace(/[DD]{2}/g,"M");
	var patt4 = /[I]{5}/g;
	var result4 = res9.match(patt3);
	alert(res4)
	if(result4)
	{
	document.getElementById('seventh').value = result4;
	document.getElementById('eighth').value = "V";
	var res10 = res9.replace(/[I]{5}/g,"V");
	alert(res10);
	document.getElementById('ninth').value = res10;
	}*/
	
 }
function toDecimal(roman)
{
	var decimal = new Array();    
	//var decimal = 0;
    var romanNumeral = new String;

    romanNumeral = roman;
    for(var x = 0;x<romanNumeral.length;x++)
    {
       // var convertToDecimal = roman.charAt(x);
	var convertToDecimal = roman[x];
        switch (convertToDecimal)
        {
        case 'M':
            decimal[x] = 1000;
	
            break;

        case 'D':
            decimal[x] = 500;
		
            break;

        case 'C':
            decimal[x] = 100;
            break;

        case 'L':
            decimal[x] = 50;
            break;

        case 'X':
            decimal[x] = 10;
            break;

        case 'V':
            decimal[x] = 5;
		
            break;

        case 'I':
            decimal[x] = 1;
		
            break;
        }
	
    }
	return decimal;
}
   if (romanNumeral == "IV")
    {
        decimal[x] = "IIII"
    }
    if (romanNumeral == "IX")
    {
        decimal[x]= "VIIII";
    }
    if (romanNumeral == "XL")
    {
        decimal[x] = "XXXX";
    }
    if (romanNumeral == "XC")
    {
        decimal[x] = "LXXXX";
    }
    if (romanNumeral == "CD")
    {
        decimal[x] = "CCCC";
    }
    if (romanNumeral == "CM")
    {
        decimal[x] = "DCCCC";
    }
    //return decimal;

function toRoman(input) {       

	var roman = new Array();    
	//var decimal = 0;
    var decimal = new String;

    decimal = input;
    for(var x = 0;x<decimal.length;x++)
    {
       // var convertToDecimal = roman.charAt(x);
	var convertToRoman = input[x];
        switch (convertToRoman)
        {
        case 1000:
            roman[x] = 'M';
	
            break;

        case 500:
            roman[x] = 'D';
		
            break;

        case 100:
            roman[x] = 'C';
            break;

        case 50 :
            roman[x] = 'L';
            break;

        case 10:
            roman[x] = 'X';
            break;

        case  5:
            roman[x] = 'V';
		
            break;

        case 1:
            roman[x] = 'I' ;
		
            break;
	case 4:
            roman[x] = 'IIII' ;
		
            break;
	case 9:
            roman[x] = 'VIIII' ;
		
            break;
        }
    }
	return roman;
}
	if (decimal == 4)
    {
        roman[x]= "IIII";
    }
    if (decimal == 9)
    {
        roman[x]= "I";
    }
    if (decimal == 40)
    {
        roman[x] = "XL";
    }
    if (decimal == 90 )
    {
        roman[x] = "XC";
    }
    if (decimal == 400 )
    {
        roman[x] = "CD";
    }
    if (decimal == 900 )
    {
        roman[x] = "CM";
    }
   // return roman;

function romanConvert(roman)
{
    var decimal = 0;
    var romanNumeral = new String;

    romanNumeral = roman.toUpperCase();
    for(var x = 0;x<romanNumeral.length;x++)
    {
        var convertToDecimal = roman.charAt(x);

        switch (convertToDecimal)
        {
        case 'M':
            decimal += 1000;
            break;

        case 'D':
            decimal += 500;
            break;

        case 'C':
            decimal += 100;
            break;

        case 'L':
            decimal += 50;
            break;

        case 'X':
            decimal += 10;
            break;

        case 'V':
            decimal += 5;
            break;

        case 'I':
            decimal += 1;
            break;
        }
    }
    if (romanNumeral == "IV")
    {
        decimal-=2;
    }
    if (romanNumeral == "IX")
    {
        decimal-=2;
    }
    if (romanNumeral == "XL")
    {
        decimal-=10;
    }
    if (romanNumeral == "XC")
    {
        decimal-=10;
    }
    if (romanNumeral == "CD")
    {
        decimal-=100;
    }
    if (romanNumeral == "CM")
    {
        decimal-=100;
    }
    return decimal;
}
function IntegerToRomanNumeral(input) {
    var s = new String;
    if (input < 1 || input > 3999)
        return "Invalid Roman Number Value";
        s = "";
    while (input >= 1000) {
        s += "M";
        input -= 1000;        }
    while (input >= 900) {
        s += "CM";
        input -= 900;
    }
    while (input >= 500) {
        s += "D";
        input -= 500;
    }
    while (input >= 400) {
        s += "CD";
        input -= 400;
    }
    while (input >= 100) {
        s += "C";
        input -= 100;
    }
    while (input >= 90) {
        s += "XC";
        input -= 90;
    }
    while (input >= 50) {
        s += "L";
        input -= 50;
    }
    while (input >= 40) {
        s += "XL";
        input -= 40;
    }
    while (input >= 10) {
        s += "X";
        input -= 10;
    }
    while (input >= 9) {
        s += "IX";
        input -= 9;
    }
    while (input >= 5) {
        s += "V";
        input -= 5;
    }
    while (input >= 4) {
        s += "IV";
        input -= 4;
    }
    while (input >= 1) {
        s += "I";
        input -= 1;
    }    
    return s;
}


