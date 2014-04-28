window.onload=function(){
	window.view.init();
}

window.model={
	New_Array: new Array(),
	div_id: new Array(),
	a: 0,
	b: 0,
	start: 0,
	end: 0,
	start1: 0,
	end1: 0, 
	result: 0,
	partition_index: 0,
	pivot_element: 0,
	
	quicksort: function(A,start,end) {
	
		if(start<end){

			partition_index=model.partitionFunction(A,start,end);
			model.quicksort(A,start,partition_index-1);
			model.quicksort(A,partition_index+1,end);			
	}
	return A;
	},
	
	partitionFunction: function(A1,start1,end1){
		partition_index = start1;
		pivot_element = end1;

		for(var i = start1; i < end1 ; i++ )
		{
			if(A1[i]<=A1[pivot_element])
			{
				model.swapArrayElements(A1,i,partition_index);
				partition_index++;	
			}
		}

		model.swapArrayElements(A1,i,partition_index);
		
		return partition_index;
	},

	swapArrayElements: function(array_object, index_a, index_b) {
   		var temp = array_object[index_a];
    	array_object[index_a] = array_object[index_b];
    	array_object[index_b] = temp;
    }

}

window.view={

	arrayString: "Enter the size of array :",
	text_id:"array_sizeId",
	setButtonId:"displayId",

	activateEvents: function() {
		//this.addClickEvent('best_case', function() { view. });
		//this.addClickEvent('worest_case', function() { view. });
		this.addClickEvent('random_input', function() { view.arrayField() });

	},

	addClickEvent: function(id,method){
		var element=document.getElementById(id);
		element.addEventListener('click', method, false);
	},

	arrayField: function(){
		this.setString("arrayStringId",this.arrayString);
		this.setInnerElements("array_size_textbox","text","",view.text_id,"");
		this.setInnerElements("display_button","button","Display",view.setButtonId,"buttonStyle");
		// this.addClickEvent('display_button', function() { view.vadilateInput();
		// event.stopPropagation(); });
		console.log("set button");

		var myButton = element.querySelector(".buttonStyle");
		//consloe.log(myButton);
		//var example=document.getElementById("display_button");
		myButton.addEventListener('click',function(event){
		console.log('invoked all click events attached, but cancel capture and bubble event phases');
		event.stopPropagation();view.vadilateInput();},false);
	},
	
	setInnerElements: function(id,type,value,set_id,className){
		var create=document.getElementById(id);
		var ele=document.createElement("input");
		ele.setAttribute("type",type);
		ele.setAttribute("value",value);
		ele.setAttribute("id",set_id);
		ele.setAttribute("style",className);
		create.appendChild(ele);
	},

	setString: function(id,displayString){
		document.getElementById(id).innerHTML=displayString;
	},

	vadilateInput:function(){
/*
		document.getElementById("display_button").onclick = function(event) {
		//event = event || window.event // cross-browser event
		if (event.stopPropagation()) {
        // W3C standard variant
        event.stopPropagation()
    	} 
    	else {
        // IE variant
        event.cancelBubble = true;
    	}
	}
*/

		var array_size = document.getElementById("array_size_textbox").childNodes[0].value;
		var element_value = parseInt(array_size);
		if (element_value === '') {
			alert('Enter the size of array');
			return false;
		}
		else if ( isNaN(element_value)) {
			alert('Enter numeric value');
			return false;
		} 
		else if (element_value < 2 || element_value > 10) {
			alert('size of array ranges from 2 to 10');
			return false;
		}
		else {
			this.setInnerDivElements("display_textfields",element_value);
			//this.disableElement("display_button");
		}
	},

	disableElement: function(Id) {
		document.getElementById(Id).disabled = true;
	},

	setInnerDivElements: function(parentNodeId,array_Size){
		var parentNode=document.getElementById(parentNodeId);
		for(var i=0;i<array_Size; i++)
			{
			var iDiv = document.createElement("div");
			iDiv.id = ("child_element"+i);
			iDiv.value="";
			iDiv.className = iDiv.className + " " +"test_style";
			parentNode.appendChild(iDiv);
			}
		this.setInnerElements("callingQuicksort","button","Quicksort function","quicksort_function");
		this.addClickEvent('quicksort_function', function() { view.arrayInput() });
	},
	
	arrayInput: function(){
		var childElementObject=document.getElementById("display_textfields").childNodes;
		console.log(childElementObject.length);
		for(var i=0;i<childElementObject.length; i++)
		{
			// var new_element=document.getElementById("child_element"+i).innerHTML;
			// console.log(new_element);
			console.log(childElementObject[i].value);
			var new_element=childElementObject[i];
			console.log(new_element);
			model.New_Array.push(new_element);
		}
		console.log(model.New_Array);
		//var x = model.quicksort(model.New_Array,0,childElementObject.length-1);
		//document.getElementById("result").innerHTML=x;
	},	

/*var element=document.getElementById("parentDiv").childNodes;

	//console.log(element.length);
	for(var i=0;i<element.length;i++)
	{
		var ele1=element[i].value;
		New_Array.push(ele1);
	}
*/


	init: function () {
		this.activateEvents();
		}	
}