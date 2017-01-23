<?php
$postdata = json_decode(file_get_contents("php://input"));
$username = $postdata->username;
$password = $postdata->password;
$con = new mysqli("localhost", "root", "adsladsl", "user");
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = "SELECT userID FROM users WHERE  username='$username' AND password='$password'";
$result = mysqli_query($con, $sql);
$count = mysqli_num_rows($result);
if ($count > 0) {
    echo "1";
} else {
    echo "0";
}
?>