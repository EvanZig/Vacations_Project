<?php
require_once './middleware/authentication.php';
// Retrieve the raw JSON payload
$json = file_get_contents('php://input');

// Decode the JSON data into an associative array
$createData = json_decode($json, true);

// Get the authorization header from the request
$authHeader = apache_request_headers()['Authorization'];

// Extract the token from the header
list($jwt) = sscanf($authHeader, 'Bearer %s');

// Verify and decode the JWT using the middleware
$userInfo = verifyJwtToken($jwt);

if ($userInfo === null) {
    // Invalid or expired token
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized']);
} else {
    $userId = $userInfo['id'];
    $status = 'pending';

    $currentDate = $createData['currentDate'];
    $dateFrom = $createData['dateFrom'];
    $dateTo = $createData['dateTo'];
    $reason = $createData['reason'];

    $query = "INSERT INTO vacationrequests (user_id,submissionDate, vacation_date_from, vacation_date_to, reason,status) VALUES (?, ?, ?, ?, ?, ?)";
    $parameters = array($userId, $currentDate, $dateFrom, $dateTo, $reason, $status);
    $result = $db->query($query, $parameters);

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode(['message' => 'Request created succesfully']);
}