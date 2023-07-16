<?php
require_once './middleware/authentication.php';

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

    $query = "SELECT * FROM vacationrequests WHERE user_id = ?";
    $parameters = array($userId);
    $result = $db->query($query, $parameters);

    header('Content-Type: application/json');

    echo json_encode($result);
}