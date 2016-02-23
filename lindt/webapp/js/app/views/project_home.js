$.namespace("LINDT.view.projectHome");
LINDT.view.projectHome = function () {
    var self = this;

	this.el = {
        parent: null,
        panel: null,
        title: null,
        content: null,
        projectList: null,
        inlineEditor: null
    };

    this.template = {
        frame: null,
        contentList: null,
        projectModal: null
    };
        
    this.selection = {};
    this.state = {};
    this.data = {};

    this.init = function (param) {
        self.el.parent = $(param.parentEl);

        self.template.frame = $("#project-home-template").html();
        self.template.contentList = $("#project-list-template").html();
        self.template.projectModal = $("#project-modal-template").html();

        self.el.parent.append(Mustache.render(self.template.projectModal));
        // Custom events
        self.events = LINDT.manager.LindtEvents.getInstance();

        self.initAppEvents();
        self.events.trigger({ source: self, type: "reloadData", dataType: 'project'});
        self.render();
    };
    
    this.render = function () {
        var panel = $($.trim(Mustache.render(self.template.frame, {})));
        self.el.panel = panel;
        
        self.el.projectList = panel.find(".projects-list");
        
        self.el.parent.append(self.el.panel);
        
        self.initDOMEvents();
    };

    this.updateContentList = function (selection) {
        $.when(
            dashboard.controller.project.getProjectList(selection)
        ).then(
            function onSuccess (projectListData) {
                self.data = projectListData;
                self.renderProjectList(self.data);
            },
            function onFailure (response) {
                self.el.projectList.html('<span class="error">Error Loading Projects</span>');
            }
        );
    };

    this.renderProjectList = function (data) {
        self.el.projectList.empty();

        if (data.projectList.length) {
            self.el.projectList.html(Mustache.render(self.template.contentList, data));
        } else {
            self.el.projectList.html('<div class="noProjects"><div class="noProjects-text">You currently have no active projects.</div></div>');
        }
    };

    this.createNewProject = function (evt, target) {
        var projectData = {};
        if(!self.validateProject(target)) {
            projectData = target.closest('form').serialize();
            $.when(
                dashboard.controller.project.createProject(projectData)
            ).then(
                function onSuccess (response) {
                    self.resetForm();
                    self.updateContentList(true);
                },
                function onFailure (response) {
                    // self.updateContentList(true);
                    // self.el.projectList.html('<span class="error">Error Loading Projects</span>');
                }
            );
        }
    };

    this.resetForm = function() {
        $("#newProjectModal").modal('hide');
        $("#newProjectModal").on('hidden.bs.modal', function () {
            $(this).find('input, textarea').val('');
            if($(this).find('form').data('bootstrapValidator')){
                $(this).find('form').data('bootstrapValidator').destroy();
            }
        });
    }

    this.validateProject = function (target) {
        $('#createProjectForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                code: {
                    validators: {
                        notEmpty: {
                            message: 'The project code is required',
                        }
                    }
                },
                name: {
                    validators: {
                        notEmpty: {
                            message: 'The project name is required'
                        },
                        stringLength: {
                            min: 6,
                            max: 50,
                            message: 'The project name must be more than 6 and less than 50 characters'
                        }
                    }
                },
                description: {
                    validators: {
                        notEmpty: {
                            message: 'The project description is required'
                        },
                        stringLength: {
                            min: 6,
                            max: 50,
                            message: 'The project description must be less than 200 characters'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
        });
        return false;
    };

    this.deleteProject = function (target) {
       var projectId = target.attr("data-key");
       $.when(
            dashboard.controller.project.deleteProject(projectId)
        ).then(
            function onSuccess (projectListData) {
                self.updateContentList(true);
            },
            function onFailure (response) {
                self.el.projectList.html('<span class="error">Error Loading Projects</span>');
            }
        );
    };

    this.initAppEvents = function () {
        $(document).on('reloadData', function (e) {
            if (e.dataType === 'project') {
                self.updateContentList(e.selection);
            }
        });
    };

    this.initDOMEvents = function () {
        self.el.parent.on('click', function (e) {
            var target = $(e.target), row;
            switch (true) {
                case target.is('a.delete-project'):
                    self.deleteProject(target);
                    break;
                case target.is('#createProject'):
                    self.createNewProject(e, target);
                    break;    
                default:
                    row = target.closest('tr');
            }
        });
    };

};