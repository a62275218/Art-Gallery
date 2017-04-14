<?php
require_once 'config.php';

$postdata = json_decode(file_get_contents("php://input"));
$uid = intval($_COOKIE['user_id']);
$content = strval($postdata->content);

$con = new mysqli(DBHOST, DBUSER, DBPW, DBNAME);
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = "INSERT messages (uid,content) VALUES('$uid','$content')";
if ($con->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();