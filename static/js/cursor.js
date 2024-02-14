let cursor = document.getElementById("Cursor")

window.addEventListener("mousemove",function(e){
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.left = x-0+"px"; 
  cursor.style.top = y-0+"px";
  if(e.target.closest('a') || e.target.closest('[class*="button"]') || e.target.closest('[class*="code-copy-btn"]')  ){
	onPointer();
  }
  else if(e.target.closest('code')){
	onText();
  }
  else{
	onDefault();
  }
});

const onPointer = () =>{
	cursor.src = "/images/cursor/silverwolf/02-Link.gif";
}

const onDefault = () =>{
	cursor.src = "/images/cursor/silverwolf/01-Normal.gif";
}

const onText = () =>{
	cursor.src = "/images/cursor/silverwolf/05-Text Select.gif";
}