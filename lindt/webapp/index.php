<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>::LINDT - Demo Project Management Application::</title>
	   <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.bootstrapvalidator/0.5.1/css/bootstrapValidator.min.css"/>

    <!-- App Styles -->
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">LINDT - Project Management Tool</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">Dashboard</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Export</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Dashboard - Projects</h1>

          <div class="row placeholders">
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Graph Placeholder</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Graph Placeholder</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Graph Placeholder</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>Label</h4>
              <span class="text-muted">Graph Placeholder</span>
            </div>
          </div>
            <div class="table-responsive">
            </div>
            </div>
          </div>
        </div>    
        <!-- include common javascript files -->
        <?php
        require_once('common/common_js_includes.php');
        ?>
        <!-- app javascripts -->
        <script src="js/app/views/dashboard/project.js"></script>
        <script src="js/app/controllers/projectController.js"></script>
        <script src="js/app/views/project_home.js"></script>
        <script type="text/javascript">
            var dashboard;
            $(document).ready(function () {
                dashboard = new LINDT.view.project();
                dashboard.init();
            });
        </script>
        <!-- include template files -->
        <?php
        require_once('templates/project-home-mustache.html');
        ?>
            
</body>
</html>