$.namespace("LINDT.view.Inspector");

LINDT.view.Inspector = function () {
    this.el = {
        parent: null
    };

    this.selection = {};

    this.view = null;

    this.state = {
        displayMode: null
    };
};

LINDT.view.Inspector.prototype.init = function(params) {};