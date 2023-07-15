<?php

// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$loginData = json_decode($json, true);

// Retrieve the username and password from the decoded JSON data
$username = $loginData['username'];
$password = $loginData['password'];

// Prepare and execute the query to check if the user exists
$query = "SELECT * FROM users WHERE role = ?";
$parameters = array($username);
$result = $db->query($query, $parameters);

// Check if the user exists
if (count($result) === 1) {
    $storedPassword = $result[0]['password'];
    $role = $result[0]['role'];

    // Verify the password
    if (!empty($storedPassword) && $password === $storedPassword) {
        // Authentication successful
        $response = array(
            'success' => true,
            'message' => 'Login successful',
            'role' => $role
        );
        http_response_code(200);
    } else {
        // Invalid password
        $response = array(
            'success' => false,
            'message' => 'Invalid password',
        );
        http_response_code(401);
    }
} else {
    // User does not exist
    $response = array(
        'success' => false,
        'message' => 'User does not exist'
    );
    http_response_code(404);
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode($response);