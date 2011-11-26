<?php
 	$callback = $_GET["callback"];
	$query = $_GET["q"]; 
	
	if($query){
	   	preg_match('/url=\\\"https?:\/\/(.+\.\w{2,3})/', $query, $matches); 
	}   
	
    if($matches[1]){
		
	  	try{
		    $file = file_get_contents('./'.$matches[1].'.txt', true);
		} 
		catch(Exception $e){
			$file = file_get_contents('./error.txt', true); 
		}
	} 
	else{
	    $file = file_get_contents('./error.txt', true); 
	} 
	
	echo $callback."(".$file .")";
?>