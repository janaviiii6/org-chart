<?php

//Database connection details
$host = 'localhost';
$username = 'root';
$password = '';
$db = 'org_chart';


try{
    //Create new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$db",$username,$password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

?>