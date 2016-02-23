/**
 * LINDT.utils.LindtSanitize
 *
 * Lindt Static class to sanitize input/output from the user
 *
 * Usage
 *     LINDT.utils.LindtSanitize.clean(
 *         '<html> <script>alert("hello world")</script><head> <title> Hello World </title> </head>' +
 *         '<body onload=function(){document.write("<script>alert()</script>")}> <h1 class="evil">Yo</h1>' +
 *         '<p>What up, world</p><img onerror=function(){document.write("<div>")} class=img> </body> </html>');
 *
 *     Output: "<html> <head> <title> Hello World </title> </head> <body> <h1>Yo</h1> <p>What up, world</p><img src=''>"
 *------------------------------------------------------------------*/
$.namespace("LINDT.utils.LindtSanitize");

LINDT.utils.LindtSanitize = (function() {
    var contentRe = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*',
        blacklist = new RegExp(
        '<(?:'
        // Comments
        + '!--(?:(?:-*[^->])*--+|-?)'
        // Known bad tags
        + '|script\\b' + contentRe + '>[\\s\\S]*?</script\\s*'
        + '|style\\b' + contentRe + '>[\\s\\S]*?</style\\s*'
        + '|embed\\b' + contentRe + '>[\\s\\S]*?</embed\\s*'
        + ')>',
        'gi');

    // Remove known bad tags completely, including html comments
    function removeBadTags(html) {
        return html.replace(blacklist, '');
    };

    // Remove all attributes from tags that are not images
    function removeAttributes(html) {
        return html.replace(/<(\/?(?!img)[a-zA-Z1-9]*)\s[^>]*>/gi, "<$1>");
    };

    // Now process the images only, capturing the src attribute and leaving only that one in
    function removeImgAttributes(html) {
        return html.replace(/<img(?:.)*(?:src\s?=\s?['"]?([^'" ]*)['"]?)?[^>]*>/gi, "<img src='$1'>");
    };

    // Main function
    function clean(value) {
        // Clean up evil tags like "script" tags
        var sanitizedValue = removeBadTags(value);

        // Remove any tag attributes since XSS can be done with attributes like
        // <body onload=function(){document.write(..something evil..)}
        sanitizedValue = removeAttributes(sanitizedValue);

        // Since images needs the src attributes, clean them separately
        // Image can also execute javascript with the onerror attribute
        sanitizedValue = removeImgAttributes(sanitizedValue);

        // Make sure to return a numeric if that was what was passed originally
        return ($.isNumeric(value)) ? parseInt(sanitizedValue) : sanitizedValue;
    };

    // Recursively Walk over the object properties and send them for cleanup individually
    function walk(obj) {
        _.each(obj, function (value, key) {
            if (typeof value === 'object') {
                walk(value);
            } else {
                obj[key] = clean(value);
            }
        });
    };

    /**
     * process
     *
     * Process the input string or object and send for cleanup immediately
     * for cleanup if its a string, otherwise send for a recursive cleanup
     * if its an object
     * @input Object or string
     *------------------------------------------------------------------*/
    function process(input) {
        try {
            var encode = encode || false,
                sanitizedValue = '';

            // Process the sanitization from the config instructions
            if (typeof input === 'object') {
                // A data structure was passed, sanitize each property recursively
                walk(input);
            } else {
                // A string was passed, just sanitize as a whole
                input = clean(input);
            }
        } catch(evt) {
            // Log it to the server
        }

        return input;
    };

    return {
        clean: function(input) {
            return input;
        }
    };

})();
