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

        /*var redirectWindow = window.open(datauri, '_blank');
        if (redirectWindow)
            redirectWindow.location;*/

        //var string = doc.output(datauri);
        var iframe = "<iframe width='100%' height='100%' src='" + datauri + "'></iframe>";
        /*var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();*/

        document.open();
        document.write(iframe);
        document.close();
    }
})();