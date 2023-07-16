<?php
// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$requestData = json_decode($json, true);

$decision = $requestData['managerDecision'];
$vacationRequestedId = $requestData['vacationRequestedId'];

// Prepare and execute the query to check if the user exists
$query = "UPDATE vacationrequests SET status = ? WHERE id = ?";
$parameters = array($decision, $vacationRequestedId);
$result = $db->query($query, $parameters);

header('Content-Type: application/json');

echo json_encode(['message' => 'User created successfully']);