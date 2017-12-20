<?php

/* First, extract the GET arguments */
$code = $_GET['code'];

/* Next, compile the proper URL */
$url = 'https://foursquare.com/oauth2/access_token' .
    '?client_id=TK5IMOUDNNXXXO3SGTIQY5HUEHCFLWAFVH2SFPZ1IWE5GIQR' .
    '&client_secret=JOBVGABWPJGLQEWPWM4UKAMKFD5X52CBTC5VHG2TSOQPVQ5O' .
    '&grant_type=authorization_code' .
    '&redirect_uri=http://localhost/adyen/4sq/dist' .
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
