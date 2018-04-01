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

//debugger;
var newline = "window.json=unescape('"+escape(json)+"');";
//console.log("newline: ", newline);
embeddedScript+=newline;

var newhtml = '<!DOCTYPE html><html lang="en" style="height: 100%;"><head><title>EZJson</title>' +
    ' <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/ace.js" type="text/javascript" charset="utf-8"></script> ' +
    ' <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" type="text/javascript" charset="utf-8"></script> ' +
    '<link  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.js"></script>' +
    //'<script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js"></script>' +
    '<script>' + embeddedScript + '</script> ' +
    '</head> ' + embeddedBody + '</html>';