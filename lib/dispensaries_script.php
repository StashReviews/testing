<?php

$path = '../lib/dispensaries/' . $name[0];
$results = scandir($path);

foreach ($results as $result) {
    if ($result === '.' or $result === '..') continue;

    if (is_dir($path . '/' . $result)) {
        include ($path . '/' . $result . '/card_wrapper.php');
        //code to use if directory
    }
}

?>