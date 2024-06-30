var encryptedflag1 = "9bd69bc521da9d77206b9cc613fea2ba";
var encryptedflag2 = "8f6e10638e795ed1e58b19304fd0036a";
var encryptedflag3 = "66b061cd04b2063ad75f5b613afbcf01";
var encryptedflag4 = "024563d70a2607fb06499fb68482d720";
var encryptedflag5 = "28e6896d057b97f27806242066373f7c";


function on_bt_clicked() {
	var input = document.getElementsByName("input")[0];
	let text = input.value.replace(/\s/g, '');
	text = Base64.encode(text);
	text = md5(text);
	console.log(text);
	if(text==encryptedflag1){
		alert("Cool! You find a flag!");
	}
	else if(text == encryptedflag2){
		alert("Yeah, but this is cooler!")
		var url =  "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		window.open(url);
	}
	else if(text == encryptedflag3){
		
		window.location.assign("/");
	}
	else if(text == encryptedflag4){
		input.value = "你沒有老婆!!!";
	}
	else if(text == encryptedflag5){
		alert("你是在SQL Injection嗎?\n笑死這又不能拿來登入");
	}
	else{
		alert("no such file, directory, or command ...");
	}
	

}	