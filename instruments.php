<?php
header('Access-Control-Allow-Origin: http://localhost', false);
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$instruments = [
    "instruments" => [
        ["dispCode" => "EUR/USD", "sentiment" => "41"],
        ["dispCode" => "UKOil0717", "sentiment" => "40"],
        ["dispCode" => "UKOil0717", "sentiment" => "71"],
        ["dispCode" => "GBP/USD", "sentiment" => "31"],
        ["dispCode" => "EUGERMANY30", "sentiment" => "0"],
        ["dispCode" => "USD/JPY", "sentiment" => "48"],
        ["dispCode" => "SILVER", "sentiment" => "86"],
        ["dispCode" => "EUR/AUD", "sentiment" => "67"],
        ["dispCode" => "USTECH100", "sentiment" => "0"],
        ["dispCode" => "USD/CAD", "sentiment" => "15"]
        ]
    ];


echo json_encode($instruments);

