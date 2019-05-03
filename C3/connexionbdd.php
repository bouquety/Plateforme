<?php
try
{
    $bdd = pg_connect('host=citadia.c2l9xerfxhsl.eu-west-3.rds.amazonaws.com port=5432 dbname=CITADIA user=citadien password=citadiadigital');
}
catch(Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

pg_set_client_encoding($bdd,"UTF-8");

echo "naruto";

?>