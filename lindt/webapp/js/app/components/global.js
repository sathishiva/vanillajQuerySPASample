jQuery.namespace = function () {
    var win = null, index1, index2, item;
    for (index1 = 0; index1 < arguments.length; index1 = index1 + 1) {
        item = arguments[index1].split(".");
        win = window;
        for (index2 = 0; index2 < item.length; index2 = index2 + 1) {
            win[item[index2]] = win[item[index2]] || {};
            win = win[item[index2]];
        }
    }
    return win;
};



//==========================================//
//      global utility library
//==========================================//
function Global() {

    var self = this;

    this.prototypes = {
        mustacheHelper: function (templateId, data) {
            var template = $(templateId).html();
            var html = Mustache.render(template, data);
            return html;
        }
    };

    // matches letters and numbers
    this.re_alphaNum = /[^a-z0-9]/gi;

    // return first non-empty variable
    // currently only accepts 2 variables
    // [ ] unit test
    this.coalesce = function (var1, var2) {
        if (var1 && var1 !== "") {
            return var1;
        }
        else {
            return var2;
        }
    };

    // convert array to object with properties
    // keyName : name of unique field in each array object
    // arrayData : the array
    // optKeyPrefix : an optional key prefix (useful for numeric keys)
    this.arrayToObject = function (keyName, arrayData, optKeyPrefix) {

        var obj = {};
        var prefix = optKeyPrefix || "";

        for (var index = 0; index < arrayData.length; index++) {
            var key = arrayData[index][keyName].toString().replace(this.re_alphaNum, "");
            obj[prefix + key.toString()] = arrayData[index];
        }
        return obj;

    };

    // search for objects within an object by key/val
    this.getObjects = function (obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) {
                continue;
            }
            if (typeof obj[i] == 'object') {
                objects = objects.concat(self.getObjects(obj[i], key, val));
            }
            else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    };

    this.formatDate = function (date) {
        if (date) {
            var dateObj = new Date(date);
            var month = (dateObj.getMonth() + 1).toString();
            if (month.length == 1) {
                month = '0' + month;
            }
            var day = dateObj.getDate().toString();
            if (day.length == 1) {
                day = '0' + day;
            }
            var year = dateObj.getFullYear().toString().substring(2);
            return month + '/' + day + '/' + year;
        }
        return '';
    };

    this.setupPrototypes = function () {

        /*String.prototype.newLineToBreak = function () {
         return this.replace(/\n/g, "<br />");
         };

         String.prototype.breakToNewLine = function () {
         return this.replace(/<br ?\/?>/g, "\n");
         };*/

        Array.prototype.sortObjectArray = function (propertyName, compareType, compareOrder) {
            this.sort(function (item1, item2) {
                //return 0; // HACK - sorting disabled until we can resolve issue
                var property1, property2;
                if (compareType === "string") {
                    property1 = item1[propertyName].toString().toLowerCase();
                    property2 = item2[propertyName].toString().toLowerCase();
                }
                else {
                    property1 = item1[propertyName];
                    property2 = item2[propertyName];
                }
                if ("desc" != compareOrder) {
                    return (property1 === property2) ? 0 : (property1 > property2) ? 1 : -1;
                } else {
                    return (property1 === property2) ? 0 : (property1 > property2) ? -1 : 1;
                }
            });
        };
        Array.prototype.sortUniqueObjectArray = function (propertyName, compareType, compareOrder) {
            this.sort(function (item1, item2) {
                //return 0;// HACK - sorting disabled until we can resolve issue
                if ("desc" != compareOrder) {
                    if (compareType === "string") {
                        return (item1[propertyName].toString().toLowerCase() > item2[propertyName].toString().toLowerCase()) ? 1 : -1;
                    }
                    else {
                        return (item1[propertyName] > item2[propertyName]) ? 1 : -1;
                    }
                } else {
                    if (compareType === "string") {
                        return (item1[propertyName].toString().toLowerCase() > item2[propertyName].toString().toLowerCase()) ? -1 : 1;
                    }
                    else {
                        return (item1[propertyName] > item2[propertyName]) ? -1 : 1;
                    }
                }
            });
        };
        // borrowed code
        // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
        Array.prototype.unique = function () {
            var o = {}, i, l = this.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[this[i]] = this[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };

        Mustache.helper = self.prototypes.mustacheHelper;
    };

    // Determine the next available name in a list of objects
    this.findNextAvailableName = function (param) {
        var arg = $.extend({
                name: '',               // Base item (page, section, content, etc) name
                objList: [],            // List of existing items (sections, contents, etc) in the target context
                nameSpec: ['name'],     // Path in each object in the above list to find its name
                skipOne: false,          // Skip number 1 in the name, i.e. copy, copy2, copy3, etc
                increment: false        // Check from the current number (i.e., start with 'Section 6' if passed 'Section 5')
            }, param),
            re = /^(.*[^\d]+)(\d+)$/i,
            parsed = arg.name.match(re),
            newNumber, newName, candidate, matches;

        if (parsed && arg.increment) {
            newName = parsed[1];
            newNumber = parseInt(parsed[2], 10);
        } else {
            newName = arg.name;
            newNumber = -1;
        }

        do {
            newNumber += 1;
            if (newNumber === 1 && arg.skipOne) {
                newNumber++;
            }
            candidate = newName.toLowerCase() + (newNumber || '');
            matches = $.map(arg.objList, function (obj) {
                return ((global.getPathValue(obj, arg.nameSpec).toLowerCase() === candidate) ? true : null);
            });
        } while (matches.length > 0);

        return $.trim(newName + (newNumber || ''));
    };

    this.objFromArray = function (arr, key) {
        var obj = {};

        key = key || 'id';

        for (var i = 0, len = arr.length; i < len; i++) {
            obj[ arr[i][key].toString() ] = arr[i];
        }

        return obj;
    };

    this.filterObjectToKeys = function (srcObj, keys) {
        var obj = {};

        $.each(keys, function (idx, key) {
            obj[key] = ((key in srcObj) ? srcObj[key] : null);
        });

        return obj;
    };

    this.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };

    this.initCap = function (str) {
        return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
            return m.toUpperCase();
        });
    };

    this.getSelectionExtent = function (selection) {
        var segments = ["derivative", "localized", "content", "buildAssets", "sourceAssets", "folder", "section", "page", "project"];
        return _.find(segments, function (val) {
            return !!selection[val];
        });
    };

    this.getPathValue = (function () {
        function f(obj, arr) {
            var idx = arr.shift();
            return ((arr.length) ? f(obj[idx], arr) : obj[idx]);
        }

        return function (obj, path) {
            if ($.isArray(path)) {
                if (path.length) {
                    return f(obj, _.rest(path, 0));
                } else {
                    return obj;
                }
            } else {
                return path;
            }
        };
    })();

    this.setPathValue = (function () {
        function f(obj, arr, val) {
            var idx = arr.shift();
            if (arr.length) {
                if (typeof obj[idx] === 'undefined') obj[idx] = {};
                f(obj[idx], arr, val);
            } else {
                obj[idx] = val;
            }
        }

        return function (obj, path, val) {
            if ($.isArray(path)) {
                if (path.length) {
                    f(obj, _.rest(path, 0), val);
                } else {
                    obj = val;
                }
            } else if ($.type(path) == 'string') {
                obj[path] = val;
            }
        };
    })();

    this.init = function () {
        self.setupPrototypes();
    };

    self.init();
}
