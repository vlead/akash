window.onload=function(){
	window.view.init();
}

window.model={
	New_Array: new Array(),
	div_id: new Array(),
	sub_ArrayList: new Array(),
	get_ArrayList: new Array(),
	inputArray:new Array(),
	child_ele:new Array(),
	a: 0,one:'',two:'',
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
			model.inputArray=model.partitionFunction(A,start,end);
			alert("model.inputArray.one :"+model.inputArray.one+"model.inputArray.two :"+model.inputArray.two);
			var parentId=view.getParentNodeId(document.getElementById(model.inputArray.one[0]).id);
			alert("parentId :"+parentId);
			
			
			get_ArrayList=view.getSubArrayList(model.inputArray.one,model.inputArray.two)
			alert("var get_sub_array :"+get_ArrayList);
			var childObjectId=view.setInnerDivElements(parentId,get_ArrayList,get_ArrayList.length);
			alert(childObjectId);
			var sub=view.setArrayElements(childObjectId,get_ArrayList);
			console.log("sub :"+sub);
			console.log("view.getParentNodeId(childObjectId) :"+view.getParentNodeId(childObjectId));
			//view.positioningElement(view.getParentNodeId(childObjectId));
		 
		// model.quicksort(returnParentObject,0,returnParentObject.length-1);
		//model.quicksort(A,start,partition_index-1);
		//model.quicksort(A,partition_index+1,end);			
	}
	return A;
	},
	
	partitionFunction: function(A1,start1,end1){
		
		partition_index = start1;
		pivot_element = end1;

		for(var i = start1; i < end1 ; i++ )
		{
			console.log("if for :"+document.getElementById(A1[i]).innerHTML+" and :"+document.getElementById(A1[pivot_element]).innerHTML);	

			if(document.getElementById(A1[i]).innerHTML<=document.getElementById(A1[pivot_element]).innerHTML)
			{	
				console.log("true");
				// alert(A1[i]);
				// alert(A1[partition_index]);
				// alert(A1[pivot_element]);
				setTimeout(function(x) {return function() { view.addColorClass(A1[x],"yellow");}; }(i), 2000*i);
				setTimeout(function(x) {return function() { view.addColorClass(A1[partition_index],"yellow");}; }(i), 2000*i);	
				setTimeout(function(x) {return function() { view.addColorClass(A1[pivot_element],"red");}; }(i), 2000*i);
				model.swapArrayElements(A1,i,partition_index);
				partition_index++;	
			}
			else{
				console.log("false");	
			}
			
		}
		model.swapArrayElements(A1,i,partition_index);
		setTimeout(function(x) {return function() { view.addColorClass(A1[partition_index],"green");}; }(i), 2000*i);
		//model.New_Array=view.getSwappedElementsList(A1);
		//alert("A1,partition_index :"+A1+','+A1[partition_index]);
		return{
        one: A1,
        two: partition_index,
    };  
	},

	swapArrayElements: function(array_object, index_a, index_b) {
		console.log("Have to swap A[i] to :"+document.getElementById(array_object[index_a]).innerHTML+" and partition_index to :"+document.getElementById(array_object[index_b]).innerHTML);
   		
   		var previousInnerHTML1=document.getElementById(array_object[index_a]).innerHTML;
   		var previousInnerHTML2=document.getElementById(array_object[index_b]).innerHTML;
  
   		document.getElementById(array_object[index_a]).innerHTML=previousInnerHTML2;
    	document.getElementById(array_object[index_b]).innerHTML=previousInnerHTML1;

		console.log("Swapped A[i] to :"+document.getElementById(array_object[index_a]).innerHTML+" and partition_index to :"+document.getElementById(array_object[index_b]).innerHTML);
   		
    }
     

}

window.view={

	arrayString: "Enter the size of array :",
	text_id:"array_sizeId",
	setButtonId:"displayId",
	set_textId:"child_TextNodes",
	set_extDivId:"externalDivElement",
	count:0,count1:1,count2:1,
	Internal_Div_Id:'Internal_Div_Id',
	Internal_Child_DId:'Internal_Child_DId',
	activateEvents: function() {
		
		//this.addClickEvent('best_case', function() { view. });
		//this.addClickEvent('worest_case', function() { view. });
		this.addClickEvent('random_input', function() { view.arrayField() })
		//this.addClickEvent('random_input', function() { view.buttonStopPropagation() });
	},

	addClickEvent: function(id,method){
		var element=document.getElementById(id);
		element.addEventListener('click', method, false);
	},

	buttonEventHandler: function(event){
			view.arrayField();
		},

	buttonStopPropagation:function(event){
			event.stopPropagation();
		},

	arrayField: function(){
		this.disableElement("random_input");
		this.setString("arrayStringId",this.arrayString);
		this.setInnerElements("array_size_textbox","text","",view.text_id,"");
		this.setInnerElements("display_button","button","Display",view.setButtonId,"buttonStyle");
		this.addClickEvent('displayId', function() { view.vadilateInput() })
		},

	setString: function(id,displayString){
		document.getElementById(id).innerHTML=displayString;
	},



	vadilateInput:function(){
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
			this.disableElement("displayId");
			this.setInnerTextElements("display_textfields",element_value);
			this.setInnerElements("callingQuicksort","button","Quicksort function","quicksort_function");
			this.addClickEvent('quicksort_function', function() { view.startFunction()});		
		}
	},

	disableElement: function(Id) {
		document.getElementById(Id).disabled = true;
	},

	setInnerTextElements: function(parentNodeId,array_Size){
		for(var i=0;i<array_Size; i++){
			this.setInnerElements(parentNodeId,"text","",view.set_textId+i,"input");
		}
	},

	setInnerElements: function(id,type,value,set_id,className){
		var create=document.getElementById(id);
		var ele=document.createElement("input");
		ele.setAttribute("type",type);
		ele.setAttribute("value",value);
		ele.setAttribute("id",set_id);
		ele.setAttribute("style",className);
		create.appendChild(ele);
		//console.log(ele.typeparentNodeObject,arraySize,ele.value,ele.id,ele.clasName);
	},

	setExternalDivProperties: function(divClass){
		this.setAttribute("id","set_extDivId"+view.count);
		console.log(divClass.id);
	},

	changeClass: function(id, className) {
		//setTimeout(console.log("adding yellow color"),5000);
		document.getElementById(id).className = className;
	},


	getInnerHTML: function(elementId){
		for(var i=0;i<elementId.length;i++){
			//alert("elementId.length :"+elementId.innerHTML);
		}
		var ele_value=document.getElementById(elementId).innerHTML;
		return ele_value;
	},

	addStyleToParentDiv:function(object){
		object.style.position = 'absolute';
		object.style.marginLeft='30%';
		object.style.marginRight = '20%';
		object.style.display = 'block';
		//object.style.backgroundColor = "#FFFF66";
		object.style.height = "auto";
		object.style.width = "auto";
		//createExternalDiv.style.float="left";  
	},
	addStyleToChildDiv: function(object){
		object.style.display = 'block';
		object.style.position="relative";
		object.style.margin="1px";
		object.style.width="30px";
		object.style.height="30px";
		object.style.border="4px solid #29293D";
			//iDiv.style.backgroundColor="#29293D";
		object.style.float="left";
	},

	getParentNodeId: function(childNodeId){
		//alert("childNodeId :"+childNodeId);
		parentNodeEle=document.getElementById(childNodeId).parentNode.id;
		return parentNodeEle;
	},

	setParentDivElements:function(parentId){
		var parentNode=document.getElementById(parentId);
		var createExternalDiv=document.createElement("div");
		createExternalDiv.id = view.createParentNodeId();
		view.addStyleToParentDiv(createExternalDiv);		
		//view.count++;
		//alert(view.count);
		//alert(createExternalDiv.id+" is appended to parent :"+parentNode.id);
		parentNode.appendChild(createExternalDiv);
		return createExternalDiv;
	},

	setChildDivElements:function(parentNodeObject,arraySize){
		for(var i=0;i<arraySize; i++)
			{
			var iDiv = document.createElement("div");
			//iDiv.id = view.createChildNodeId();
			iDiv.id= ("child_element"+i);
			iDiv.value="";
			view.addStyleToChildDiv(iDiv);
			console.log("iDiv.id :"+iDiv.id);
			model.div_id[i]=iDiv.id;
			console.log("model.div_id[i] :"+model.div_id[i]);
			parentNodeObject.appendChild(iDiv);

			}
		//console.log(" DIsplaying div id's :"+model.div_id);
		return model.div_id;
	},

	createChildNodeId:function(){
		view.Internal_Child_DId+=view.count2;
		view.count2++;
		//alert(view.Internal_Div_Id);
		return view.Internal_Div_Id;
	},

	createParentNodeId:function(){
		view.Internal_Div_Id+=view.count1;
		view.count1++;
		//alert(view.Internal_Div_Id);
		return view.Internal_Div_Id;
	},

	setInnerDivElements: function(parentNodeId,array,array_length){
		for(var i=0;i<arraySize; i++)
		{
			console.log("setInnerDivElements: function :::::::::::::::::::::::::::: "+i);
		}
		//alert("setInnerDivElements: function is "+parentNodeId);
		var parentObject=this.setParentDivElements(parentNodeId);
		var childNodeId=this.setChildDivElements(parentObject,array_length);
		//alert("This is childNodeId :"+childNodeId);
		var childObjectId=this.setArrayElements(childNodeId,array);
		//alert("childObjectId at the end :"+childObjectId);
		return childObjectId;
	},

	

	setArrayElements: function (id, string) {
		//alert("setArrayElements "+id+" , "+string);
		for (var i = 0; i < string.length; i++) {
			console.log("Id's of child elements :"+id[i]);
			//console.log("assigning values to id "+id[i]+"as "+document.getElementById(id[i]).innerHTML=parseInt(string[i]));
			document.getElementById(id[i]).innerHTML=parseInt(string[i]);
			console.log("Passing value of "+parseInt(string[i])+"to :"+document.getElementById(id[i]));
			
		}
		return id;
	},

	getSubArrayList:function(ele_id,index)
	{
		alert("parentid :"+ele_id+' , '+"index :"+' , '+index);
		for(var i=0;i<index; i++){

			var element=document.getElementById(ele_id[i]);
			model.sub_ArrayList.push(element.innerHTML);
			//alert("arrayList :"+model.sub_ArrayList);
		}
		return model.sub_ArrayList;
	},
	
	startFunction: function(){
		this.disableElement("quicksort_function");
		var inputValues=this.arrayInput("display_textfields");
		var element_Id=this.setInnerDivElements("outputDivision",inputValues,inputValues.length);
		model.quicksort(element_Id,0,element_Id.length-1);
	},

	arrayInput: function(id){
		var childNodes=document.getElementById(id).childNodes;
		alert("childNodes.length :"+childNodes.length);
		for(var i=0;i<childNodes.length; i++){
			var ele1=childNodes[i].value;
			model.New_Array.push(ele1);
		}
		alert("model.New_Array :"+model.New_Array);
		return model.New_Array;
	},



	positioningElement: function(id){
		alert("PositioningElement");
	document.getElementById(id).style.top = 50 + "%";
	document.getElementById(id).style.left = 20 + "%";
	},

	getSwappedElementsList: function(id,index){
		//alert("Display Array"+A1);
		//alert("Display array length"+A1.length);
		for(var i=0;i<A1.length;i++){
			model.New_Array[i]=document.getElementById(A1[i]).innerHTML;
			//alert(model.New_Array[i]);
		}
		return model.New_Array;
	},

    addColorClass: function(id,color){
    	document.getElementById(id).style.backgroundColor = color;
    },


	init: function () {
		this.activateEvents();
		}	
}

/*
	generateBlocks: function(childElement){	
		var partition_indexValue=view.getInnerHTML(childElement);
		var parentNodeId=view.getParentNodeId(childElement);
	},

	createLevelsOfDivElements: function(){
		alert("entered ; createLevelsOfDivElements");
		var createDivAtLevels=document.createElement("div");
		//createExternalDiv.style.position = 'absolute';
		createDivAtLevels.style.marginLeft='30%';
		createDivAtLevels.style.marginRight = '20%';
		createDivAtLevels.style.display = 'block';
		createDivAtLevels.style.backgroundColor = "#FFFF66";
		createDivAtLevels.style.height = "auto";
		createDivAtLevels.style.width = "auto";
		//createExternalDiv.style.float="left";  
		view.count++;
		//alert(view.count);
		//alert(createExternalDiv.id+" is appended to parent :"+parentNode.id);
		//parentNode.appendChild(createExternalDiv);
		alert("createLevelsOfDivElements.id :"+createDivAtLevels.id);
		return createDivAtLevels;
	},

*/