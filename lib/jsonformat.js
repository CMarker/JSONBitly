window.json = window.document.body.textContent;
window.json = window.json.substr(0, window.json.lastIndexOf("}")+1);
var json = window.json;
document.open();document.write(newhtml);document.close();window.json = json;