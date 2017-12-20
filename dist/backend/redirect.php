<?php

$newURL = 'https://foursquare.com/oauth2/authenticate' .
  '?client_id=TK5IMOUDNNXXXO3SGTIQY5HUEHCFLWAFVH2SFPZ1IWE5GIQR' .
  '&response_type=code' .
  '&redirect_uri=http://localhost/adyen/4sq/dist';

header('Location: ' . $newURL);

?>
