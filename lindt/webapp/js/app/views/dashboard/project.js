$.namespace("LINDT.view.project");

LINDT.view.project = function () {
    var self = this;
    
    this._static = LINDT.view.project._static;
    
    this.apps = {};
    // this.selection = {};
    
    this.view = {
        projectHome: new LINDT.view.projectHome()
    };

    // this.mockObj = {};

    this.controller = {
        project: new LINDT.controller.project()
    };

    // this.manager = {
    //     dialog: LINDT.manager.dialog.getDialog(),
    //     error: new LINDT.manager.error()
    // };

    this.init = function () {
        // TODO: Temporary mocking object, remove when the services are available
        // this.mockObj = new LINDT.utils.mockajax();
        // this.mockObj.mock();

        // Custom events
        // self.events = LINDT.manager.LindtEvents.getInstance();

        // Start up error handling
        // self.manager.error.init();

        self.selection = {
            app : {
                type: 'projectdash',
                viewMode: 'projectdash'
            }
        };

        self.controller.project.init();
        self.initModal();
        
        self.view.projectHome.init({ parentEl: $('div.table-responsive') });
        // self.view.inspector.init({ parentEl: $('#inspector') });

        // self.initDOMEvents();
        // self.initAppEvents();

    };

    this.initModal = function () {
        $('#newProjectModal').modal();
    };
};

LINDT.view.project._static = {
};
