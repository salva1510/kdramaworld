<?php
$apiKey = "YOUR_API_KEY";
$title = urlencode("Vincenzo");

$url = "https://www.omdbapi.com/?apikey=$apiKey&t=$title&type=series";
$response = file_get_contents($url);
$data = json_decode($response, true);

echo "<h1>{$data['Title']}</h1>";
echo "<img src='{$data['Poster']}' width='200'>";
echo "<p>{$data['Plot']}</p>";
?>
