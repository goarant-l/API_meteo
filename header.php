<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API météo - Châteaulin</title>
    <link rel="stylesheet" href="mesStyles.css">
</head>

<?php
session_save_path(__DIR__ . '/tmp');
// session_start();
$connecte = isset($_SESSION['user']);
?>

<body>

    <nav class="meteo-nav">
        <a class="brand" href="index.php?page=accueil">⛅ Météo</a>
    </nav>
