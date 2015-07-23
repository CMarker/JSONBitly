var json = window.document.body.textContent;
var terminator = "}";
if (json[0] == "{")
    terminator = "}";
if (json[0] == "[")
    terminator = "]";
json = json.substr(0, json.lastIndexOf(terminator)+1);
window.json = json;
var val;
try {
    var o = JSON.parse(json);
    val = JSON.stringify(o, null, 4);
}
catch (err) {

}

if (val) {
    document.open();document.write(newhtml);document.close();window.json = json;
} else {
    var data = btoa(newhtml);
    var datauri = "data:text/html;base64," + data;
    var redirectWindow = window.open(datauri, '_blank');
    if (redirectWindow)
        redirectWindow.location;
}