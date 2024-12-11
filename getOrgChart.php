<?php

require_once 'config.php';


header('Content-Type: application/json');


try{
    //Fetch data from the employees table
    $query = "SELECT id, name, title, parent_id, photo_url FROM employees";
    $stmt = $pdo->query($query);

    //Fetch all results 
    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //Return Json Response
    echo json_encode($employees);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>