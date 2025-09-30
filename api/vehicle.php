<?php
header('Content-Type: application/json');

$vehicle = isset($_GET['vehicleNumber']) ? urlencode($_GET['vehicleNumber']) : '';

if (empty($vehicle)) {
    echo json_encode(["error" => "Missing vehicleNumber parameter"]);
    exit;
}

$apiUrl = "http://67.205.160.206:5000/api/vehicle/searchvehicle?vehicleNumber={$vehicle}";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => [
        'Host: 67.205.160.206:5000',
        'User-Agent: PHP-cURL',
        'Content-Type: application/json',
        'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQ5MGNlZDUxZjk4MTBlNjEyOGM3Y2UiLCJ1c2VyVHlwZSI6IlVzZXIiLCJpYXQiOjE3NTkwNTUwODUsImV4cCI6MTc2NDIzOTA4NX0.uJV1jbFydJUtxBgH4B1yw73Zj2f520Xav85YJRpIMoY'
    ],
]);

$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

if ($error) {
    echo json_encode(["error" => $error]);
    exit;
}

echo $response;
