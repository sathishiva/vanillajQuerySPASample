<?php

require_once 'model/ProjectsGateway.php';
require_once 'model/ValidationException.php';


class ProjectsService {
    
    private $projectsGateway    = NULL;
    
    private function openDb() {
        if (!mysql_connect("localhost", "root", "")) {
            throw new Exception("Connection to the database server failed!");
        }
        if (!mysql_select_db("lindt")) {
            throw new Exception("No lindt database found on database server.");
        }
    }
    
    private function closeDb() {
        mysql_close();
    }
  
    public function __construct() {
        $this->projectsGateway = new ProjectsGateway();
    }
    
    public function getAllProjects($order) {
        try {
            $this->openDb();
            $res = $this->projectsGateway->selectAll($order);
            $this->closeDb();
            return $res;
        } catch (Exception $e) {
            $this->closeDb();
            throw $e;
        }
    }
    
    public function getProject($id) {
        try {
            $this->openDb();
            $res = $this->projectsGateway->selectById($id);
            $this->closeDb();
            return $res;
        } catch (Exception $e) {
            $this->closeDb();
            throw $e;
        }
        return $this->projectsGateway->find($id);
    }
    
    private function validateProjectParams( $name, $phone, $email, $address ) {
        $errors = array();
        if ( !isset($name) || empty($name) ) {
            $errors[] = 'Name is required';
        }
        if ( empty($errors) ) {
            return;
        }
        throw new ValidationException($errors);
    }
    
    public function createNewProject( $name, $code, $description, $status ) {
        try {
            $this->openDb();
            // $this->validateProjectParams($name, $phone, $email, $address);
            $res = $this->projectsGateway->insert($name, $code, $description, $status);
            $this->closeDb();
            return $res;
        } catch (Exception $e) {
            $this->closeDb();
            throw $e;
        }
    }
    
    public function deleteProject( $id ) {
        try {
            $this->openDb();
            $res = $this->projectsGateway->delete($id);
            $this->closeDb();
        } catch (Exception $e) {
            $this->closeDb();
            throw $e;
        }
    }
    
    
}

?>
