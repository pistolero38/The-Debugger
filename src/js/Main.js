const Main = (function() {
	
	const my = {};
	
	let scene; 
	
	my.init = function(pWidth, pHeight) {
		scene = new SceneView(pWidth, pHeight);
	}
	
	return my;
	
}());


document.addEventListener("DOMContentLoaded", function() {
  Main.init(1000, 800);
});
