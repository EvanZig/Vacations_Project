<?php
// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$createData = json_decode($json, true);

$username = $createData['name'];
$email = $createData['email'];
$password = $createData['password'];
$role = 'employee';

// Prepare and execute the query to check if the user exists
$query = "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)";
$parameters = array($username, $password, $email, $role);
$result = $db->query($query, $parameters);

header('Content-Type: application/json');

echo json_encode(['message' => 'User created successfully']);