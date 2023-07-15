<?php

// Prepare and execute the query to check if the user exists
$query = "SELECT username, email FROM users WHERE role = ?";
$parameters = array('employee');
$result = $db->query($query, $parameters);

// Create an array to store the rows
$rows = array();

// Loop through the result and create an object for each row
foreach ($result as $row) {
    $data = array(
        'name' => $row['username'],
        'email' => $row['email']
    );
    $rows[] = $data;
}

// header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode($result);