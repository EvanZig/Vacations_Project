<?php
// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$deleteData = json_decode($json, true);

$email = $deleteData['email'];

// Prepare and execute the query to check if the user exists
$query = "DELETE FROM users WHERE email = ?";
$parameters = array($email);
$result = $db->query($query, $parameters);

header('Content-Type: application/json');

echo json_encode(['message' => 'User deleted successfully']);