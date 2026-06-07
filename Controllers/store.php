<?php
// 1. Tell the browser/JavaScript to expect JSON data, not HTML
header('Content-Type: application/json');

use App\Database;
use App\Gateway;

$db = Gateway::resolve(Database::class);


// 2. Ensure the request is actually a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Invalid request method.']);
    exit;
}

// 3. Gather and sanitize inputs
//! Could probably do with some actual validation logic/class/something->anything
$firstName = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$lastName = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

$errors = [];

// 4. Server-Side Validation Rules
if (empty($message)) {
    $errors[] = "Message is required.";
} elseif (strlen($message) < 3) {
    $errors[] = "Message must be at least 3 characters long.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}

// ! Validate rest of inputs

// 5. Check validation results
if (!empty($errors)) {
    // Something failed validation! 
    http_response_code(400); // 400 Bad Request
    echo json_encode([
        'status' => 'error',
        'messages' => $errors
    ]);
    exit;
}

// 6. Success Logic (Where you would normally run SQL / PDO inserts)

$db->query('INSERT INTO contact(first_name, last_name, email, phone, subject, message) VALUES(:firstName, :lastName, :email, :phone, :subject, :message)', [
  'firstName' => $firstName,
  'lastName' => $lastName,
  'email' => $email,
  'phone' => $phone,
  'subject' => $subject,
  'message' => $message
]);

// If it gets here, validation passed perfectly.
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => "Message successfully Sent, " . htmlspecialchars($firstName) . "!"
]);
exit;

