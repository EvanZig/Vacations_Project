<?php

require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verifyJwtToken($jwt)
{
    // Your secret key used to sign the JWT
    $secretKey = 'a_secret_key';

    try {
        $allowedAlgs = array('HS256');
        // Verify and decode the JWT
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));

        // The decoded JWT contains user information
        $userId = $decoded->id;
        $username = $decoded->username;
        $userRole = $decoded->role;

        // Return the decoded user information
        return [
            'id' => $userId,
            'username' => $username,
            'role' => $userRole
        ];
    } catch (Exception $e) {
        // Invalid or expired token
        return null;
    }
}