$.namespace("LINDT.controller.project");
LINDT.controller.project = function () {
    var self = this;

    this._sanitize = LINDT.utils.LindtSanitize.clean;

    this.cache = {
        projectList: null,
        projectNames: null,
        projectDetails: {},
        locales: null,
        copyTypes: null,
        projectPermissions: {},
        userPermissions: null,
        workspaceList: null
    };

    this.selection = null;

    this.init = function () {
        self.initAppEvents();
        // Custom events
        self.events = LINDT.manager.LindtEvents.getInstance();
    };

    this.initAppEvents = function () {
        
    };

    /* Get project detail and associated page list */
    this.getProjectList = (function () {

        function processResponse(response) {

            var cacheObj = {
                projectList: [],
                projectIndex: {}
            };
            response = JSON.parse(response);
            try {
                cacheObj.projectList = response.data.project;
                cacheObj.projectList.sortUniqueObjectArray('name');

                $.each(cacheObj.projectList, function (idx, obj) {
                    cacheObj.projectIndex[obj.id] = obj;
                    cacheObj.projectList[idx].active = (cacheObj.projectList[idx].active == "1")? true : false;
                });
                cacheObj.projectList = _.sortBy(cacheObj.projectList, function (obj) {
                    return obj.id * -1;
                });
                cacheObj.status = 'SUCCESS';
            } catch (err) {
                cacheObj.status = 'ERROR';
                cacheObj.errorString = 'Error processing Response';
                cacheObj.error = err;
            }

            return cacheObj;
        }

        return function getProjectList(selection) {
            var dfr, pr = self.cache.projectList;

            if (!pr || (selection)) {
                dfr = new $.Deferred();
                self.cache.projectList = pr = dfr.promise();
                $.when(
                    $.ajax({ url: "s?op=list"})
                ).then(
                    function onAjaxSuccess(response) {
                        var processed = processResponse(response);
                        if (processed.status === 'SUCCESS') {
                            self.cache.projectList = processed;
                            dfr.resolve(processed);
                        } else {
                            dfr.reject(processed);
                        }
                    },
                    function onAjaxFailure(jqXHR, textStatus, errorString) {
                        dfr.reject({
                            status: textStatus,
                            error: errorString,
                            xhr: jqXHR
                        });
                    }
                );
            }
            return pr;
        };
    })();

    this.createProject = (function () {
        // var p = projectData;
        return function createProject(projectData) {
            var dfr = new $.Deferred();
            $.when(
                $.ajax({
                    url: "s?op=new&"+projectData,
                    type: "POST"
                })
            ).then(
                function onSuccess(response) {
                    response = JSON.parse(response);
                    if (response.status === 'SUCCESS') {
                        dfr.resolve(response);
                    } else {
                        dfr.reject(response);
                    }
                },
                function onFailure(jqXHR, textStatus, errorString) {
                    dfr.reject({
                        status: textStatus,
                        error: errorString,
                        xhr: jqXHR
                    });
                }
            );

            return dfr.promise();
        };
    })();

    this.deleteProject = (function () {
        return function deleteProject(projectId) {
            var dfr = new $.Deferred();
            $.when(
                $.ajax({
                    url: "s?op=delete&id="+projectId,
                    type: "DELETE"
                })
            ).then(
                function onSuccess(response) {
                    response = JSON.parse(response);
                    if (response.status === 'SUCCESS') {
                        dfr.resolve(response);
                    } else {
                        dfr.reject(response);
                    }
                },
                function onFailure(jqXHR, textStatus, errorString) {
                    dfr.reject({
                        status: textStatus,
                        error: errorString,
                        xhr: jqXHR
                    });
                }
            );

            return dfr.promise();
        };
    })();
};    