//tips and notes
//exp., says that better to redraw the frames; even if it is just erasing an arrow and re-drawing it.
//for insert operation, i just attached the new node. Since tail arrow  had to be erased and re-drawn for every new node insertion, thought of clearing and re-drawing the entire canvas.



function drawArrow(ctx,x1, y1, x2, y2, x3, y3, x4, y4, str) {
	//ctx.fillText("Arrow", x1, y1);

	glbl_ctx.beginPath(); //Stroke, strokes from beginPath(). Make sure you call it, if the beginPath should be different.
	glbl_ctx. moveTo(x1, y1)
	glbl_ctx.lineTo(x2, y2);
	glbl_ctx.stroke();
	
	glbl_ctx.beginPath();
	glbl_ctx.moveTo(x2,y2);
	glbl_ctx.lineTo(x3,y3)
	glbl_ctx.stroke();

	glbl_ctx.beginPath();
	glbl_ctx.moveTo(x2,y2);
	glbl_ctx.lineTo(x4,y4)
	glbl_ctx.stroke();

	glbl_ctx.fillStyle = "black";
	glbl_ctx.font      = "20px courier";
    //ctx.style = "italic" 		;no effect
	//y1=y1-2;
	glbl_ctx.fillText(str, x1+5, y1+5);
}

//Essentially a Rectangle class; stores rect co-ords as well as color.
function Rect(x, y, w, h, color) {
	this.top_x = x
	this.top_y = y
	this.w = w
	this.h = h
	this.color = color
	return this
}

// the Rectangle class has a method called draw.
Rect.prototype.draw = function(ctx,val) {
	ctx.fillStyle = this.color;
						ctx.fillRect(this.top_x, this.top_y, this.w, this.h); // draw a rectangle
						ctx.fillStyle = "blue";
						ctx.font      = "25px Times";
						ctx.fillText(val,this.top_x+15, this.top_y+30); 

					}


view = { //you may even write window.view= ...
	
	NODE_COUNT: 0,

	NODE_INDEX: -1,

	count: 0,

	items: [],
	val_index: 0,

	MAX_NODES: 4,

	redRects: [  
	new Rect(0,   80,  75, 50, "#FF0000"), // An array of Rectangle objects
	new Rect(120, 80,  75, 50, "#FF0000"),
	new Rect(240, 80,  75, 50, "#FF0000"),
	new Rect(360, 80,  75, 50, "#FF0000"),
	new Rect(480, 80,  75, 50, "#FF0000"),
	new Rect(600, 80,  75, 50, "#FF0000"),
	new Rect(720, 80,  75, 50, "#FF0000"),
	new Rect(840, 80,  75, 50, "#FF0000"),
	new Rect(960, 80,  75, 50, "#FF0000"),

	],
	
	blackRects: 
	[ 
	new Rect(75,  80,  25, 50, "#000000"),
	new Rect(195, 80,  25, 50, "#000000"),
	new Rect(315, 80,  25, 50, "#000000"),
	new Rect(435, 80,  25, 50, "#000000"),
	new Rect(555, 80,  25, 50, "#000000"),
	new Rect(675, 80,  25, 50, "#000000"),
	new Rect(795, 80,  25, 50, "#000000"),
	new Rect(915, 80,  25, 50, "#000000"),
	new Rect(1035,80,  25, 50, "#000000"),
	],


	whiteRects: [ 
	new Rect(0,   10,  100, 50, "#FFFFFF"), // An array of Rectangle objects
	new Rect(120, 10,  100, 50, "#FFFFFF"),
	new Rect(240, 10,  100, 50, "#FFFFFF"),
	new Rect(360, 10,  100, 50, "#FFFFFF"),
	new Rect(480, 10,  100, 50, "#FFFFFF"),
	new Rect(600, 10,  100, 50, "#FFFFFF"),
	new Rect(720, 10,  100, 50, "#FFFFFF"),
	new Rect(840, 10,  100, 50, "#FFFFFF"),
	new Rect(960, 10,  100, 50, "#FFFFFF"),

	],

	addClickEvent: function (id, method) {
		var element = document.getElementById(id);
		element.addEventListener('click', method, false);
	},

	activateEvents: function() {
		this.addClickEvent('insertBtn', function() { view.insert() }); //'this' refers to view class here; invoke addClickEvent of view class.
		this.addClickEvent('deleteBtn', function()  { view.delete() });
		
	},

	displayStatus: function(id)
	{
		var statusDiv = document.getElementById(id);

		statusDiv.style.backgroundColor = "aliceblue";
		statusDiv.style.width = 100;
		statusDiv.font="Times 10px";
		

		//statusDiv.font.size= 20;
		if (this.NODE_COUNT == 0) 
			statusDiv.innerHTML = "Queue Status: EMPTY!"
		else if (this.NODE_COUNT == 1) 
			statusDiv.innerHTML =  "Queue Status: 1 Item."; //"Status: Queue has "+ (this.NODE_COUNT)-1; 
		else
			statusDiv.innerHTML =  "Queue Status: " + this.NODE_COUNT+ " Items.";
	},

	store: function(item){
		//store the item in the items array and increment the count.
		this.NODE_INDEX++;
		this.items[this.NODE_INDEX] = item;
		this.NODE_COUNT++;
			//console.log(items[val_index-1]);
		   //alert(this.NODE_INDEX);
		},

	insert: function() {  //inserting 1 node at a time

				//first check if queue is full
				if (this.NODE_COUNT == this.MAX_NODES) {
					alert("Sorry. Queue is FULL!");
					return;
				}

				else{
						//read the item
						var item = document.getElementById("input1").value;
						// store the item
						this.store(item); //maintaining the D.S: storing the new item to the items[] array.

						/*setTimeout(function()*/ { 
					        
					        //clearing the frame for re-drawing
					        glbl_ctx.clearRect(0,0, 1280, 720);
							//first, may draw head arrow, which will be present with all nodes
							drawArrow(glbl_ctx, 10, 10, 10, 80, 5, 65, 15, 65, "Head");
							
							//next, draw all the nodes
							for(var i = 0; i < this.NODE_COUNT; i++)
							{
								this.redRects[i].draw(glbl_ctx,this.items[i]);
								this.blackRects[i].draw(glbl_ctx,"");
							}

							//finally draw the tail
							if (this.NODE_COUNT == 1) {
								drawArrow(glbl_ctx,30,30,30,80,25,65,35,65,"Tail");
							}else if (this.NODE_COUNT == 2) {
								drawArrow(glbl_ctx,150,30,150,80,145,65,155,65,"Tail");
								drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
							}else if (this.NODE_COUNT == 3) {
								drawArrow(glbl_ctx,270,30,270,80,265,65,275,65,"Tail");
								drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
								drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
							}else if (this.NODE_COUNT == 4) {
								drawArrow(glbl_ctx, 390, 30, 390, 80, 385,65,395,65,"Tail");
								drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
								drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
								drawArrow(glbl_ctx,340,105,360,105,355,100, 355, 110,""); //horiz.arrow3
							}
						};//.bind(this), 300);

					this.displayStatus("statusId");
					} //end of else	


				},

	 delete: function() {

	 	if (this.NODE_COUNT == 0)
	 	{
	 		alert("Sorry, can't delete from an already EMPTY Queue!");
	 		return;
	 	}
	 	else 
	 	{

	 		/* show a frame with no node in the head area*/
	 		
	 				glbl_ctx.clearRect(0,0,1200,300);
		 			for(var i = 1; i < this.NODE_COUNT; i++)
							{
								this.redRects[i].draw(glbl_ctx,this.items[i]);
								this.blackRects[i].draw(glbl_ctx,"");
							};
					switch(this.NODE_COUNT)
						{
							//case 1: drawArrow(glbl_ctx,30,30,30,80,25,65,35,65,"Tail");
										//break;

							case 2: drawArrow(glbl_ctx,150,30,150,80,145,65,155,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
										break;

							case 3: drawArrow(glbl_ctx,270,30,270,80,265,65,275,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
									drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
										break;

							case 4: drawArrow(glbl_ctx,390,30,390,80,385,65,395,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
									drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
									drawArrow(glbl_ctx,340,105,360,105,355,100, 355, 110,""); //horiz.arrow3
										break;
							} //end of switch**/

			//re-storing the D.S items[] after imagined to have deleting the  head 
			for (var i = 1; i < this.NODE_COUNT; i++)
			{
				this.items[i-1] = this.items[i];
			}
			this.NODE_COUNT--; //decrementing the node counter by 1
			this.NODE_INDEX = this.NODE_COUNT - 1; //note, initial val of node_index is -1, node_count is 0

            //after restoring and making changes to the DS...
			if ( this.NODE_COUNT == 0 ){
				glbl_ctx.clearRect(0,0,1200,300);
				this.displayStatus("statusId");
				return;
			}
            else { //there is at least one node in the queue

            	   setTimeout(function() { //clearing the frame for re-drawing
	            	   	glbl_ctx.clearRect(0,0,1200,300);
						//draw head arrow
						
						drawArrow(glbl_ctx,10,10,10,80,5,65,15,65,"Head");
						
						//draw all the nodes
						for(var i = 0; i < this.NODE_COUNT; i++)
						{
							this.redRects[i].draw(glbl_ctx,this.items[i]);
							this.blackRects[i].draw(glbl_ctx,"");
						}

						switch(this.NODE_COUNT)
						{
							case 1: drawArrow(glbl_ctx,30,30,30,80,25,65,35,65,"Tail");
										break;

							case 2: drawArrow(glbl_ctx,150,30,150,80,145,65,155,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
										break;

							case 3: drawArrow(glbl_ctx,270,30,270,80,265,65,275,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
									drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
										break;

							case 4: a1.drawArrow(glbl_ctx,390,30,390,80,385,65,395,65,"Tail");
									drawArrow(glbl_ctx,100,105,120,105,115,100,115,110,""); //horiz.arrow1
									drawArrow(glbl_ctx,220,105,240,105,235,100, 235, 110,""); //horiz.arrow2
									drawArrow(glbl_ctx,340,105,360,105,355,100, 355, 110,""); //horiz.arrow3
										break;

							} //end of switch**/

				}.bind(this), 500);
			} //end of else
			
			this.displayStatus("statusId"); // Write the queue status on the canvas
		}

	},

	init: function () {
		glbl_ctx = document.getElementById('myCanvas').getContext('2d');
		this.activateEvents();


	}
}

window.onload =function () {
	view.init();
}




