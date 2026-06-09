<?php
// 1. Tell the browser/JavaScript to expect JSON data, not HTML
header('Content-Type: application/json');

use App\Database;
use App\Gateway;
use PHPMailer\PHPMailer\PHPMailer;

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
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

$validationReport = [
    'first_name' => ['icon' => 'done_outline', 'status' => 'success', 'msg' => ''],
    'last_name'  => ['icon' => 'done_outline', 'status' => 'success', 'msg' => ''],
    'email'      => ['icon' => 'done_outline', 'status' => 'success', 'msg' => ''],
    'subject'    => ['icon' => 'done_outline', 'status' => 'success', 'msg' => ''],
    'message'    => ['icon' => 'done_outline', 'status' => 'success', 'msg' => '']
];

$hasErrors = false;
$validLength = 3;

// 4. Server-Side Validation Rules: caught by JS->displayed to user.
// ? https://packagist.org/packages/symfony/validator mb?

// 1. First Name Validation
if (empty($firstName)) {
    $validationReport['first_name'] = ['icon' => 'error', 'status' => 'error', 'msg' => "First name required"];
    $hasErrors = true;
} elseif (strlen($firstName) < $validLength) {
    $validationReport['first_name'] = ['icon' => 'fmd_bad', 'status' => 'warning', 'msg' => "Min characters of $validLength"];
    $hasErrors = true;
}

// 2. Last Name Validation
if (empty($lastName)) {
    $validationReport['last_name'] = ['icon' => 'error', 'status' => 'error', 'msg' => "Last name required"];
    $hasErrors = true;
}

// 3. Email Validation
if (empty($email)) {
    $validationReport['email'] = ['icon' => 'error', 'status' => 'error', 'msg' => "Email is required."];
    $hasErrors = true;
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validationReport['email'] = ['icon' => 'fmd_bad', 'status' => 'warning', 'msg' => "Please enter a valid email address."];
    $hasErrors = true;
}

// 4. Subject Validation
if (empty($subject)) {
    $validationReport['subject'] = ['icon' => 'error', 'status' => 'error', 'msg' => "Message subject required."];
    $hasErrors = true;
} elseif (strlen($subject) < $validLength) {
    $validationReport['subject'] = ['icon' => 'fmd_bad', 'status' => 'warning', 'msg' => "Must be at least $validLength characters."];
    $hasErrors = true;
}

// 5. Message Validation
if (empty($message)) {
    $validationReport['message'] = ['icon' => 'error', 'status' => 'error', 'msg' => "Message is required."];
    $hasErrors = true;
} elseif (strlen($message) < $validLength) {
    $validationReport['message'] = ['icon' => 'fmd_bad', 'status' => 'warning', 'msg' => "Must be at least $validLength characters."];
    $hasErrors = true;
}

// Check validation results using our flag
if ($hasErrors) {
    http_response_code(400); 
    echo json_encode([
        'status' => 'error',
        'fields' => $validationReport
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

// 7. SMTP PHPMail logic
// ! put SMTP config values in .env
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'sandbox.smtp.mailtrap.io';
    $mail->Port = 2525;
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME'];
    $mail->Password = $_ENV['MAIL_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    // ! remove before uploading to cPanel => ssl will be auto handled.
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('system@local.test'); // ! configure
    $mail->addAddress('David.Mackie@netmatters-scs.com'); // .env

    $mail->addReplyTo($email, $firstName . ' ' . $lastName);

    $mail->isHTML(true);
    $mail->Subject = 'Form Submission';
    $mail->Body = "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";

    $mail->send();
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message successfully sent, $firstName!"]);
} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "error" => "server error",
        "php_error" => $th->getMessage()
    ]);
}

exit;

