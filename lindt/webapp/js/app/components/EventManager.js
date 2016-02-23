/**
 * LINDT.manager.LindtEvents
 *
 * Lindt wrapper around custom events
 *
 * Usage:
 *   // In your render function (or init if render doesn't exists)
 *   self.events = LINDT.manager.LindtEvents.getInstance(self);
 *   // Anywhere in your class where needed
 *   self.events.trigger({ type: 'itemSelected', selection: self.selection });
 *------------------------------------------------------------------*/
$.namespace("LINDT.manager.LindtEvents");

LINDT.manager.LindtEvents = (function () {

    // Make sure a single instance of this is floating around
    var instance = null;

    function init() {
        var self = this;

        var debug = LINDT.utils.LindtConfig.mode === 'debug';

        var cfg = {},
            data = [];

        function prepareConfig(userConfig, userData) {
            var valid = true;

			// Doing deep copy of values copies all ancestral properties for objects and arrays,
			// which leads to undesirable effects in the handlers and breaks things like array size check.
			// Assess the need to deep copy for a new object from only one another object
            cfg = $.extend({}, userConfig); 

            data = userData;

            return valid;
        };

        // == Private methods == //
        function fire() {
            $.event.trigger(cfg, data);
        };

        return {
            /**
             * trigger
             *
             * Public method to trigger a custom event, wrapped by LINDT-specific logic
             * @userConfig Object containing custom event properties
             *------------------------------------------------------------------*/
            trigger: function(userConfig, userData) {
                // Type is mandatory
                if (!userConfig.type || !userConfig.source) {
                    if (LINDT.utils.LindtConfig.mode === 'debug') {
                        throw new Error("The source property wasn't set to the LINDT custom event");
                    }

                    //return false;
                }

                // If we're able to generate a proper config, proceed
                if (prepareConfig(userConfig, userData)) {
                    fire();
                }
            }
        };
    };

    /**
     * getInstance
     *
     * Public method, singleton to get the instance
     * if it exists, just return it, otherwise create it and return it
     *------------------------------------------------------------------*/
     return {
        getInstance: function() {
            if (!instance) {
                instance = init.call(this);
            }

            return instance;
        }
     };
})();


/**
 * JQuery Custom property
 *   Observer pattern to allow segmenting the custom event into "scopes"
 *   It has been proven to be faster than the standard JQuery custom events
 *   because the below pattern is not tied to the DOM
 *------------------------------------------------------------------*/

/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function($) {
 
  var o = $({});
 
  $.subscribe = function() {
    o.on.apply(o, arguments);
  };
 
  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };
 
  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
 
}(jQuery));
