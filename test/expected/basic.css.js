define('undefined',[], function(){
	var style = document.createElement('style');
	style.appendChild(
		document.createTextNode('.myView {  padding: 5px;  color: #f0f;}.myView__foo {  border: 1px solid #0f0;}');
	});
	return style;
});
