
function create() {
  
  pid = document.getElementById("partner").value;
  time = document.getElementById("time").value;
  content = document.getElementById("content").value;

  var data = {pid: pid, time: time, content: content,createTime : new Date().getTime()}

 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:8888/ad", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


	 xhr.onreadystatechange = function () { 
	 
		if (xhr.readyState == 4 && xhr.status == 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.pid + ", " + json.content);
			alert("Success");
		}
		
		if(xhr.readyState == 4 && xhr.status == 500){
			
			alert(xhr.responseText);
		}
	}
	
	xhr.send(JSON.stringify(data));
};

function getAd(id){
	
  var url = "http://127.0.0.1:8888/ad";
  
  if(id == 'all')
  {
	  url += "/getAll";
	  
  }
  else{
	  
	  url += "/"+ id;
  }  
	
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


	 xhr.onreadystatechange = function () { 
	 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var json = JSON.parse(xhr.responseText);
			
			console.log(json);
			
			document.getElementById("display").innerHTML = JSON.stringify(json);
		}
		
		if(xhr.readyState == 4 && xhr.status == 500){
			
			alert(xhr.responseText);
		}
	}
	
	xhr.send();
};
	
