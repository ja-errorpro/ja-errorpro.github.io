var encryptedflag1 = "9bd69bc521da9d77206b9cc613fea2ba";
var encryptedflag2 = "8f6e10638e795ed1e58b19304fd0036a";
function on_bt_clicked() {
	var input = document.getElementsByName("input")[0];
	let text = input.value;
	text = Base64.encode(text);
	text = md5(text);
	console.log(text)
	if(text==encryptedflag1){
		alert("Cool! You find a flag!");
	}
	else if(text == encryptedflag2){
		alert("Yeah, but this is cooler!")
		var url =  "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		
		
		window.open(url)
	}
	else{
		alert("no such file, directory, or command ...");
	}
	

}	