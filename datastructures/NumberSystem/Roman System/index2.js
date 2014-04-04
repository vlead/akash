var res1 = new Array();
var res2 = new Array();
var res3 = new Array();
var res4 = new Array();
var res5 = new Array();
var res6 = new Array();
var res7 = new Array();
var res8 = new Array();
var romanNumeral,decimal;
function add(first,second)
{
	var firstValue = document.getElementById('first').value.toUpperCase();
	var secondValue = document.getElementById('second').value.toUpperCase();
	 	
	Subtractives(firstValue,secondValue);
	var thirdValue = document.getElementById('third').value;
	var fourthValue = document.getElementById('fourth').value;

	var res = thirdValue.concat(fourthValue);
	document.getElementById('fifth').value = res;//display's concatinated value.
	
	Sorting(res);
	var res6 = document.getElementById('sixth').value
	
	var partialresult1 = matching(res6);
	alert(partialresult1);
	var partialresult2 = matching(partialresult1);
	//alert(partialresult2);
	
	
 }
function mul(first,second)
{
	var firstValue = document.getElementById('first').value.toUpperCase();
	var secondValue = document.getElementById('second').value.toUpperCase();

	Subtractives(firstValue,secondValue);
	var thirdValue = document.getElementById('third').value;
	var fourthValue = document.getElementById('fourth').value;
	
	var res1 = thirdValue;
	var res2 = fourthValue;

	for(i=0;i<res1.length;i++)
	{
	 res3[i] = res1.charAt(i);
	}	
	res5 = toDecimal(res3);
	//alert(res5.length);
	for(i=0;i<res2.length;i++)
	{
	 res4[i] = res2.charAt(i);
	}	
	res6 = toDecimal(res4);
	//alert(res6.length);
	for(i=0;i<res5.length;i++)
	{
	for(j=0;j<res6.length;j++)
	{
	 res7[i] = res5[i]*res6[j];
	//alert(res7[i]);

	res8 += IntegerToRomanNumeral(res7[i]);
	}
	}
	document.getElementById('fifth').value = res8;

	Sorting(res8);
	var res6 = document.getElementById('sixth').value;

	var partialresult1 = matching(res6);
	alert(partialresult1);
	var partialresult2 = matching(partialresult1);
	//alert(partialresult2);

}
function matching(res6)
	{
		
	var pattn1 = /[VV]{2}/g;var result1 = res6.match(pattn1);var res7 = res6.replace(/[VV]{2}/g,"X");
	var pattn2 = /[LL]{2}/g;var result2 = res6.match(pattn2);var res8 = res7.replace(/[LL]{2}/g,"C");
	var pattn3 = /[DD]{2}/g;var result3 = res6.match(pattn3);var res9 = res8.replace(/[DD]{2}/g,"M");
	var pattn4 = /[I]{5}/g;var result4 = res6.match(pattn4);var res10 = res9.replace(/[I]{5}/g,"V");
	var pattn5 = /[I]{4}/g;var result5 = res6.match(pattn5);var res11 = res10.replace(/[I]{4}/g,"IV");
	var pattn6 = /[X]{5}/g;var result6 = res6.match(pattn6);var res12 = res11.replace(/[X]{5}/g,"L");
	var pattn7 = /[X]{4}/g;var result7 = res6.match(pattn7);var res13 = res12.replace(/[X]{4}/g,"XL");
	var pattn8 = /[C]{5}/g;var result8 = res6.match(pattn8);var res14 = res13.replace(/[C]{5}/g,"D");
	var pattn9 = /[C]{4}/g;var result9 = res6.match(pattn9);var res15 = res14.replace(/[C]{4}/g,"CD");
	var pattn10 = /[V][I]{4}/g;var result10 = res6.match(pattn10);var res16 = res15.replace(/[V][I]{4}/g,"IX");
	var pattn11 = /[L][X]{4}/g;var result11 = res6.match(pattn11);var res17 = res16.replace(/[L][X]{4}/g,"XC");
	var pattn12 =/[D][C]{4}/g;var result12 = res6.match(pattn12);var res18 = res17.replace(/[D][C]{4}/g,"CM"); 
	
		
	if(result1 || result2 || result3 || result4 || result6 || result8 || result10 || result11 || result12)
	{
		if(result1)
		{	
		document.getElementById('seventh').value = result1;
		document.getElementById('eighth').value = "X";
		var res7 = res6.replace(/[VV]{2}/g,"X");
		//alert(res7);
		document.getElementById('ninth').value = res7;
		return res7;
		}
		if(result2)
		{
		document.getElementById('seventh').value = result2;
		document.getElementById('eighth').value = "C";
		var res8 = res7.replace(/[LL]{2}/g,"C");
		//alert(res8);
		document.getElementById('ninth').value = res8;
		return res8;
		}
		if(result3)
		{
		document.getElementById('seventh').value = result3;
		document.getElementById('eighth').value = "M";
		var res9 = res8.replace(/[DD]{2}/g,"M");
		//alert(res9);
		document.getElementById('ninth').value = res9;
		return res9;
		}
		if(result4)
		{
		document.getElementById('seventh').value = result4;
		document.getElementById('eighth').value = "V";
		var res10 = res6.replace(/[I]{5}/g,"V");
		//alert(res10);
		document.getElementById('ninth').value = res10;
		return res10;
		}
		
		if(result6)
		{
		document.getElementById('seventh').value = result6;
		document.getElementById('eighth').value = "L";
		var res11 = res6.replace(/[X]{5}/g,"L");
		//alert(res10);
		document.getElementById('ninth').value = res11;
		return res11;
		}

		if(result8)
		{
		document.getElementById('seventh').value = result8;
		document.getElementById('eighth').value = "D";
		var res14 = res6.replace(/[C]{5}/g,"D");
		//alert(res10);
		document.getElementById('ninth').value = res14;
		return res14;
		}
		

		if(result10)
		{
		document.getElementById('seventh').value = result10;
		document.getElementById('eighth').value = "IX";
		var res16 = res6.replace(/[V][I]{4}/g,"IX");
		//alert(res10);
		document.getElementById('ninth').value = res16;
		return res16;
		}

				
		if(result11)
		{
		document.getElementById('seventh').value = result11;
		document.getElementById('eighth').value = "XC";
		var res17 = res6.replace(/[L][X]{4}/g,"XC");
		//alert(res10);
		document.getElementById('ninth').value = res17;
		return res17;
		}
		
		
		if(result12)
		{
		document.getElementById('seventh').value = result12;
		document.getElementById('eighth').value = "CM";
		var res18 = res6.replace(/[D][C]{4}/g,"CM");
		//alert(res10);
		document.getElementById('ninth').value = res18;
		return res18;
		}

		
	}

	else if(result5 || result7 || result9)
	{
		if(result5)
		{
		document.getElementById('seventh').value = result5;
		document.getElementById('eighth').value = "IV";
		var res11 = res6.replace(/[I]{4}/g,"IV");
		//alert(res10);
		document.getElementById('ninth').value = res11;
		return res11;
		}
		if(result7)
		{
		document.getElementById('seventh').value = result7;
		document.getElementById('eighth').value = "XL";
		var res13 = res6.replace(/[X]{4}/g,"XL");
		//alert(res10);
		document.getElementById('ninth').value = res13;
		return res13;
		}
		if(result9)
		{
		document.getElementById('seventh').value = result9;
		document.getElementById('eighth').value = "CD";
		var res15 = res6.replace(/[C]{4}/g,"CD");
		//alert(res10);
		document.getElementById('ninth').value = res15;
		return res15;
		}

	}
	else
	{
		document.getElementById('ninth').value = res6;
	}
	
	}
function Sorting(res)
{
	for(i=0;i<res.length;i++)
	{
	 res1[i] = res.charAt(i);
	}	
	res2 = toDecimal(res1);
	res3 = res2.sort(function(a,b){return a-b});
	res4 = res3.reverse();
	var res5 = toRoman(res3);
	var teststring = "";
	for(var i=0;i<res.length;i++)
	{
	teststring +=res5[i];
	}
	var res6 = teststring;
	//alert(res6);
	document.getElementById('sixth').value = res6;//display's sorted value.

}
function Subtractives(firstValue,secondValue)
{
	var patt1 = /[I][V]/g;var patt2 = /[I][X]/g;
	var cond1=firstValue.match(patt1);var cond3 = firstValue.match(patt2);
	var cond2=secondValue.match(patt1);var cond4 = secondValue.match(patt2);

	var patt3 = /[X][L]/g;var patt4 = /[X][C]/g;
	var cond5=firstValue.match(patt3);var cond7 = firstValue.match(patt4);
	var cond6=secondValue.match(patt3);var cond8 = secondValue.match(patt4);

	var patt5 = /[C][D]/g;var patt6 = /[C][M]/g;
	var cond9=firstValue.match(patt5);var cond11 = firstValue.match(patt6);
	var cond10=secondValue.match(patt5);var cond12 = secondValue.match(patt6);
	
	if(cond1 || cond3 || cond5 || cond7 || cond9  || cond11)
	{
		if(cond1)
		{	
		var resultf1 = firstValue.replace(/[I][V]/g,"IIII");	
		document.getElementById('third').value = resultf1;
		//alert(resultf1);
		}	
		if(cond3)
		{	
		var resultf1 = firstValue.replace(/[I][X]/g,"VIIII");
		document.getElementById('third').value = resultf1;
		}		
		if(cond5)
		{	
		var resultf1 = firstValue.replace(/[X][L]/g,"XXXX");	
		document.getElementById('third').value = resultf1;
		}	

		if(cond7)
		{	
		var resultf1 = firstValue.replace(/[X][C]/g,"LXXXX");
		document.getElementById('third').value = resultf1;
		}	
		if(cond9)
		{	
		var resultf1 = firstValue.replace(/[C][D]/g,"CCCC");	
		document.getElementById('third').value = resultf1;
		}	
		if(cond11)
		{	
		var resultf1 = firstValue.replace(/[C][M]/g,"DCCCC");
		document.getElementById('third').value = resultf1;
		}	
	}
	else
	{
		resultf1 = firstValue;
		document.getElementById('third').value = resultf1;
	}
	if(cond2 || cond4 || cond6 || cond8 || cond10 || cond12)
	{
		if(cond2)
		{
		var resultf2 = secondValue.replace(/[I][V]/g,"IIII");	
		document.getElementById('fourth').value = resultf2;
		}

		if(cond4)
		{
		var resultf2 = secondValue.replace(/[I][X]/g,"VIIII");
		document.getElementById('fourth').value = resultf2;
		}
		if(cond6)
		{
		var resultf2 = secondValue.replace(/[X][L]/g,"XXXX");
		document.getElementById('fourth').value = resultf2;
		}	
		if(cond8)
		{
		var resultf2 = secondValue.replace(/[X][C]/g,"LXXXX");
		document.getElementById('fourth').value = resultf2;	
		}
		if(cond10)
		{
		var resultf2 = secondValue.replace(/[C][D]/g,"CCCC");	
		document.getElementById('fourth').value = resultf2;
		}
		if(cond12)
		{
		var resultf2 = secondValue.replace(/[C][M]/g,"DCCCC");
		document.getElementById('fourth').value = resultf2;	
		}
	}
	else
	{
		resultf2 = secondValue;
		document.getElementById('fourth').value = resultf2;
	}


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



