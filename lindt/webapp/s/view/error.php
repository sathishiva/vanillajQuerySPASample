<?php
error_reporting(0);
$responseStatus = array(
                    'status' => 'ERROR',
                    'data' => '',
                    'errorDetails' => array('msg'=>'Project creation error!')
                ); 
echo json_encode($responseStatus);
?>