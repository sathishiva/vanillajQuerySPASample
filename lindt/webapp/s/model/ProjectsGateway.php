<?php

/**
 * Table data gateway.
 * 
 *  OK I'm using old MySQL driver, so kill me ...
 *  This will do for simple apps but for serious apps you should use PDO.
 */
class ProjectsGateway {
    
    public function selectAll($order) {
        if ( !isset($order) ) {
            $order = "name";
        }
        $dbOrder =  mysql_real_escape_string($order);
        $dbres = mysql_query("SELECT * FROM projects ORDER BY $dbOrder ASC");
        
        $projects = array();
        while ( ($obj = mysql_fetch_object($dbres)) != NULL ) {
            $projects[] = $obj;
        }
        
        return $projects;
    }
    
    public function selectById($id) {
        $dbId = mysql_real_escape_string($id);
        
        $dbres = mysql_query("SELECT * FROM projects WHERE id=$dbId");
        
        return mysql_fetch_object($dbres);
		
    }
    
    public function insert( $name, $code, $description, $status ) {
        
        $dbName = ($name != NULL)?"'".mysql_real_escape_string($name)."'":'NULL';
        $dbCode = ($code != NULL)?"'".mysql_real_escape_string($code)."'":'NULL';
        $dbDescription = ($description != NULL)?"'".mysql_real_escape_string($description)."'":'NULL';
        $dbStatus = ($status != NULL)?"'".mysql_real_escape_string($status)."'":'NULL';
        
        mysql_query("INSERT INTO projects (code, name, description, active) VALUES ($dbCode, $dbName, $dbDescription, $dbStatus)");
        return mysql_insert_id();
    }
    
    public function delete($id) {
        $dbId = mysql_real_escape_string($id);
        mysql_query("DELETE FROM projects WHERE id=$dbId");
    }
    
}

?>
