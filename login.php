<?php
require_once 'config.php';
$postdata = json_decode(file_get_contents("php://input"));
$username = $postdata->username;
$password = $postdata->password;
$con = new mysqli(DBHOST, DBUSER, DBPW, DBNAME);
if ($con->connect_error) {
    die("Connection failed: ");
}
if (!mysqli_select_db($con, DBNAME)) {
    trigger_error('Could not select DB' . mysqli_error($con));
    exit();
}
/*$sql2 = sprintf("SELECT 1 FROM users WHERE  username='$username' AND password = '$password'",
                    mysqli_real_escape_string($con,$username),
                    mysqli_real_escape_string($con,$password));*/
$sql = "SELECT userID FROM users WHERE  username = '$username' AND password = '$password'";
$result = mysqli_query($con, $sql);
$count = mysqli_num_rows($result);
if ($result === FALSE) {
    die("Could not query database");
}
if ($count > 0) {
    session_start();
    $_SESSION['authenticated'] = TRUE;
    $_SESSION['sid'] = session_id();
    //encryption
    $row = mysqli_fetch_array($result);
    setcookie('user_id', $row['userID'], time() + 60 * 60 * 24 * 30);
    echo $_COOKIE['user_id'];
}