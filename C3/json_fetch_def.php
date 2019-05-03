<?php

//Recuperation des choix de l'utilisateur
//Ce script est prévu pour être envoyé au serveur en requête POST (plus safe que GET, qui passe par l'url (genre truc.php?nom=Jean))
//Les variables envoyées par la requête sont accessibles dans un array appelé $_POST

$insee = "'76110','76001'";


if(isset($_POST['insee'])){
    $insee_prov = explode(",",strip_tags($_POST['insee']));
    $insee_clean = array();
    for ($i=0; $i<count($insee_prov);$i++){
        array_push($insee_clean,"'".$insee_prov[$i]."',");
    }
    $insee_clean[count($insee_clean)-1] = substr($insee_clean[count($insee_clean)-1],0,-1);
    $insee = implode("",$insee_clean);
}

//Connexion à la base de données Citadia via le module pgsql (plus flexible que le module générique PDO)

try
{
    $bdd = pg_connect('host=citadia.c2l9xerfxhsl.eu-west-3.rds.amazonaws.com port=5432 dbname=CITADIA user=citadien password=citadiadigital');
}
catch(Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

pg_set_client_encoding($bdd,"UTF-8");

//Création d'une requête préparée ; il s'agi d'une requête dans laquelle on peut passer des valeurs en paramètres.
//A noter que j'emploie la fonction ST_AsGeoJSON pour renvoyer la géométrie en GeoJSON, plus simple comme ça que de devoir faire ça en php
$champs = [
    "ST_AsGeoJSON(ST_Transform(geom,4326)) as geom",
    "id_parc",
    "codgeo",
    "libgeo",
    "surf",
    "ces",
    "nature",
    "vocation",
    "info",
    "lib_op",
    "lib_oprt",
    "avncmt",
    "nbr_lgmt",
    "nbr_lls",
    "nbr_hbgmt",
    "nbr_acc_so",
    "proj",
    "comment"
];

$sql = "SELECT " . implode(",",$champs) . " FROM potentiel_foncier_ccry";

$prep = pg_prepare($bdd,"requete_type",$sql);

//Execution de la requete
$req_data = pg_execute($bdd,"requete_type",array());

//Recuperation des resultats : on itere sur chaque ligne renvoyee et on stocke le resultat dans un array
//(avec des arrays internes, pour reprendre la structure type d'un geojson)
$geojson = array(
    "type" => "FeatureCollection",
    "features" => array()
);

while($donnees = pg_fetch_row($req_data))
{
    $properties = array_fill_keys(array_slice($champs,1),'test');
    for($i=1;$i<count($champs);$i++){
        $properties[$champs[$i]] = utf8_encode($donnees[$i]);
    }
    $feature = array(
        "type" => "Feature",
        "properties" => $properties,
        "geometry" => json_decode($donnees[0]) //json_decode, pour ne pas sur-encoder la syntaxe json lors de l'encode final
    );
    array_push($geojson["features"],$feature); //On ajoute chaque feature au GeoJSON
}

pg_close($bdd); //On ferme la connexion a la BDD

$myJSON = json_encode($geojson, JSON_NUMERIC_CHECK);

echo $myJSON;

?>