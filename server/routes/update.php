<?php
// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$updateData = json_decode($json, true);

$username = $updateData['name'];
$email = $updateData['email'];
$password = $updateData['password'];
$user = $updateData['user'];

// Prepare and execute the query to check if the user exists
$query = "UPDATE users SET username = ?, password = ?, email = ? WHERE email = ?";
$parameters = array($username, $password, $email, $user);
$result = $db->query($query, $parameters);

// header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($result) {
    // Return a success message
    echo json_encode(['message' => 'User updated successfully']);
} else {
    // Return an error message
    echo json_encode(['message' => 'Failed to update user']);
}