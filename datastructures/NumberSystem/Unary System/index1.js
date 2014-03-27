var a;
var b;

function add(a,b)
{
 a = document.getElementById('first').value;
 b = document.getElementById('second').value;

 var res = a.concat(b);
 document.getElementById('sixth').value = res;

 
}

function mul(a,b)
{

 a = document.getElementById('first').value;
 b = document.getElementById('second').value;

 

 document.getElementById('third').value = a.length;
 document.getElementById('fourth').value = b.length;
 
 if(a.length > b.length)
  {
    var count = b.length - 1;
    document.getElementById('fifth').value = count;
     var res = ' ';
     while(count)
     {
        res += a.concat(a);
        //alert(res);
      count--;
     }
     document.getElementById('seventh').value = res;

 }
  else
  { 
    var count = a.length - 1;
    document.getElementById('fifth').value = count;
	var res = ' ';
     while(count)
     {
        res += a.concat(a);
        //alert(res);
      count--;
     }
     document.getElementById('seventh').value = res;
  }
}


