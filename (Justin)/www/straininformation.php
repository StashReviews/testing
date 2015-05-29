<?php include(dirname(__FILE__) . "/../lib/classes/header.php"); ?>

<?php
	$page = $_GET['strain'];	/* gets the variable $page */
	if (!empty($page)) {
		include($page);
	} 	/* if $page has a value, include it */
	else {
		include('strain1.php');
	} 	/* otherwise, include the default page */
?>

<?php include(dirname(__FILE__) . "/../lib/classes/footer.php"); ?>      