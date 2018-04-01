(function() {
    if (val) {
        window.json = json;
        console.log("Valid json: - ", json.length);
        document.open();
        document.write(newhtml);
        document.close();
        window.json = json;
    } else {
        console.log("Invalid json");
        var data = btoa(newhtml);
        var datauri = "data:text/html;base64," + data;
        var redirectWindow = window.open(datauri, '_blank');
        if (redirectWindow)
            redirectWindow.location;
    }
})();