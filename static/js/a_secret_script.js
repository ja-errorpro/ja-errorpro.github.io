var encryptedflag = "9bd69bc521da9d77206b9cc613fea2ba";

function on_bt_clicked() {
	var input = document.getElementsByName("input")[0];
	let text = input.value;
	text = Base64.encode(text);
	text = md5(text);
	
	if(text==encryptedflag){
		
		alert("Cool! You find a flag!");
	}else{
		alert("no such file, directory, or command ...");
	}
	

}	