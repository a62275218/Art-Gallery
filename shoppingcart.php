<?php
//get the posted parameters
$productid = intval($_POST['productid']);
$num = intval($_POST['num']);
//prepare shopping cart data
session_start();
