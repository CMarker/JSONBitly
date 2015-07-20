var data = btoa(newhtml);
var datauri = "data:text/html;base64," + data;
var redirectWindow = window.open(datauri, '_blank');
if (redirectWindow)
    redirectWindow.location;