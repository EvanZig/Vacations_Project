<?php

// Prepare and execute the query to check if the user exists
$query = "SELECT username, email FROM users WHERE role = ?";
$parameters = array('employee');
$result = $db->query($query, $parameters);

header('Content-Type: application/json');

echo json_encode($result);