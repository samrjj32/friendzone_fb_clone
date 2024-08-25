<?php


$servername = "katara.scam.keele.ac.uk"
$username = "y1a12";
$password ="y1a12y1a12";
$dbname = "y1a12";

$dsn = "mysql:host=$servername; dbname=$dbname; charset=utf8mb4"


try{
    $pdo = new PDO($dsn,$username,$password);
} catch(PDOExecption $e){
    echo 'Connection error!' . $e->getMessage();
}

?>
