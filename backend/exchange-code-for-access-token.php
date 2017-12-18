<?php

/* First, extract the GET arguments */
$client_id = $_GET['client_id'];
$client_secret = $_GET['client_secret'];
$grant_type = $_GET['grant_type'];
$redirect_uri = $_GET['redirect_uri'];
$code = $_GET['code'];

/* Next, compile the proper URL */
$url = 'https://foursquare.com/oauth2/access_token' .
    '?client_id=' . $client_id .
    '&client_secret=' . $client_secret .
    '&grant_type=authorization_code' .
    '&redirect_uri=' . $redirect_uri .
    '&code=' . $code;

/* Then, exchange the code for an authorization code */
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);

/* Finally, return the authorization code */
echo $result;

?>
