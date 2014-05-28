var textlist=null;
var divslist=null;
var list=null;
var dist=0;
var array_size=0;
var count=0;
$('#sortdiv').hide();
function init(){
	textlist=null;
	divslist=null;
	list=null;
	dist=0;
	array_size=0;
	count=0;
}

function inputboxes()
{ textlist=[];
  $("#getboxes").empty();
  array_size=$('#arraysize').val();
  for(var i=0;i<array_size;i++)
  {  
    var newbox = $('<input/>').attr({ type: 'text', name:'text', value:'',id: "textid"+(i+1)}).addClass("text");
    $("#getboxes").append(newbox);
	textlist.push(newbox);
  }
  return false;
 }

 var timer=[];
function sort(){
  stoptimer();
  var x=1, temp=null,  value=null; delay=1500;
  dist+=10;var si=1,sj=0,count=0;
  //createdivs();
  for(var si=1; si < list.length; si++)
   { 
     temp=list[si];
	 value=divslist[si];
     timer.push(setTimeout(function(i) {return function() {topdiv(i);};}(si), delay*(x++)));	 
	 
     for(var sj=si-1; sj >=0&&list[sj]>temp;sj--) 
      { 	    
	     timer.push(setTimeout(function(j) {return function() {shiftdivs(j);};}(sj), delay*(x++)));
			//timer.push(setTimeout(function(j) {return function() {shiftdivcolor(j);};}(sj), delay*(x++)));
        list[sj+1]=list[sj];
      }
	  list[sj+1]=temp;
      timer.push(setTimeout(function(j,v) {return function() {replacedivs(j,v);};}(sj,value), delay*(x++)));	  	
   }
 }
 
function stoptimer()
{
for(var k=0;k<timer.length;k++)
    clearTimeout(timer[k]);
} 
//function shiftdivcolor(b)
//{ divslist[b].css("background-color","yallow");}

function topdiv(a)
{       console.log("i:"+a);
        //console.log(sh()); 
        divslist[a].css("background-color","red");
        //divslist[b].css("background-color","red");
		divslist[a].animate({top:"-=50px"},1000);
}		
function shiftdivs(b)
{     count=count+1;
	  console.log(dist);
      //dist = divslist[b].width()+5;//adding width+margine
	  divslist[b].css("background-color","skyblue");
	  divslist[b].animate({left:"+="+dist+"px"},1000);
	  divslist[b+1]=divslist[b];
	  setTimeout(function(){
         divslist[b].css("background-color","yellow");	  
        },800);
}
function replacedivs(b,value)
{	  console.log(dist+'px');
      value.animate({top:"+=50",left:"-="+(count*(dist))+"px"},1000);
	  value.css("background-color","yellow"); 
	  divslist[b+1]=value;
	  count=0;
} 

function bestcase()
{  init();
   $('#myform').hide();
   $('#sortdiv').hide();
   $("#getboxes").hide();
   list=[1,2,3,4,5,6];
   divslist=[];
   $('#result').empty();
   var maxind=null;
   for(var i=0;i<list.length;i++){
     var newdiv=$('<div>').attr({"class":"box","position":"relative" }); 
	 if(maxind==null||list[i]>list[maxind]) maxind=i;
	 $('#result').append(newdiv);
     newdiv.html(list[i]);
	 divslist.push(newdiv);
	 }
	 dist=parseInt(divslist[maxind].css("width")); //divslist[maxind].width();
	 $(".box").css({width:dist});
	 sort();
} 
function worstcase()
{  init();
   $("#getboxes").hide();
   $('#myform').hide();
   $('#sortdiv').hide();
   list=[6,5,4,3,2,2,1];
   divslist=[];
   $('#result').empty();
   var maxind=null;
   for(var i=0;i<list.length;i++){
     var newdiv=$('<div>').attr({"class":"box","position":"relative" }); 
	 if(maxind==null||list[i]>list[maxind]) maxind=i;
	 $('#result').append(newdiv);
     newdiv.html(list[i]);
	 divslist.push(newdiv);
   }
   dist=parseInt(divslist[maxind].css("width")); //divslist[maxind].width();
   $(".box").css({width:dist});
   sort();
} 
//var p=[8,1,4,7];
 function createdivs()
 {  $('#myform').hide();
   $('#sortdiv').hide();
   list=[];
   divslist=[];
   $('#result').empty();
   var maxind=null;
   for(var i=0;i<textlist.length;i++){
     var newdiv=$('<div>').attr({"class":"box","position":"relative" }); 
	 var textvalue =parseInt(textlist[i].val());//p[i];
	 list.push(textvalue);
	 if(maxind==null||textvalue>list[maxind]) maxind=i;
	 $('#result').append(newdiv);
     newdiv.html(textvalue);
	 divslist.push(newdiv);
	 }
	 dist=parseInt(divslist[maxind].css("width")); //divslist[maxind].width();
	 $(".box").css({width:dist});
 }
  
function showdiv()
{ 
  init();
  stoptimer();
  //$("#getboxes").empty();
  $('#myform').show();
  $('#arraysize')[0].focus();
  $('#sortdiv').show();
  $('#result').empty();
  $("#getboxes").show();
}

function sortrandomdivs()
 {
  createdivs();
  sort();
 }


//$('#start').on('click',createdivs);  
$('#sort').on('click',sortrandomdivs);
$('#best').on('click',bestcase);
$('#worst').on('click',worstcase);
$('#random').on('click',showdiv);


