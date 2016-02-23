<?php

require_once 'model/ProjectsService.php';

class ProjectsController {
    
    private $projectsService = NULL;
    
    public function __construct() {
        $this->projectsService = new ProjectsService();
    }
    
    public function redirect($location) {
        header('Location: '.$location);
    }
    
    public function handleRequest() {
        $op = isset($_GET['op'])?$_GET['op']:NULL;
        try {
            if ( !$op || $op == 'list' ) {
                $this->listProjects();
            } elseif ( $op == 'new' ) {
                $this->saveProject();
            } elseif ( $op == 'delete' ) {
                $this->deleteProject();
            } elseif ( $op == 'show' ) {
                $this->showProject();
            } else {
                $this->showError("Page not found", "Page for operation ".$op." was not found!");
            }
        } catch ( Exception $e ) {
            // some unknown Exception got through here, use application error page to display it
            $this->showError("Application error", $e->getMessage());
        }
    }
    
    public function processResponse($data) {
        $responseStatus = array(
                    'status' => 'SUCCESS',
                    'data' => '',
                    'errorDetails' => array()
                ); 
        if(array_key_exists('data', $responseStatus)) {
            $responseStatus['data']['project'] = $data;
        }
        return $responseStatus;
    } 

    public function listProjects() {
        $orderby = isset($_GET['orderby'])?$_GET['orderby']:NULL;
        $projects = $this->projectsService->getAllProjects($orderby);

        $projects = $this->processResponse($projects);

        include 'view/projects.php';
    }
    
    public function saveProject() {
        // print_r($_REQUEST);

        $title = 'Add new project';
        
        $name = '';
        $code = '';
        $description = '';
        $status = '';
       
        $errors = array();
        
        // if ( isset($_POST['form-submitted']) ) {
            
            $name       = isset($_REQUEST['name']) ?   $_REQUEST['name']  :NULL;
            $code      = isset($_REQUEST['code'])?   $_REQUEST['code'] :NULL;
            $description      = isset($_REQUEST['description'])?   $_REQUEST['description'] :NULL;
            $status    = isset($_REQUEST['active'])? $_REQUEST['active']:"1";
            
            // echo $name.' = '.$code.'= '.$description.' = '.$status;
            try {
                $res = $this->projectsService->createNewProject($name, $code, $description, $status);
                // $this->redirect('index.php');
                if($res) {
                    $this->listProjects();
                } else {
                    include 'view/error.php';
                }
            } catch (ValidationException $e) {
                $errors = $e->getErrors();
            }
        // }
        
        // include 'view/project-form.php';
    }
    
    public function deleteProject() {
        $id = isset($_GET['id'])?$_GET['id']:NULL;
        if ( !$id ) {
            throw new Exception('Internal error.');
        }
        
        $this->projectsService->deleteProject($id);
        
        $this->listProjects();
    }
    
    public function showProject() {
        $id = isset($_GET['id'])?$_GET['id']:NULL;
        if ( !$id ) {
            throw new Exception('Internal error.');
        }
        $project = $this->projectsService->getProject($id);
        
        include 'view/project.php';
    }
    
    public function showError($title, $message) {
        include 'view/error.php';
    }
    
}
?>
