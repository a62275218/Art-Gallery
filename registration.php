<?php
require_once 'config.php';
$postdata = json_decode(file_get_contents("php://input"));
$username = $postdata->username;
$password = $postdata->password;
$email = $postdata->email;


$con = new mysqli(DBHOST, DBUSER, DBPW, DBNAME);
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}


$sql = "INSERT users (username,password,email) VALUES('$username', '$password', '$email')";
if ($con->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}
$con->close();
