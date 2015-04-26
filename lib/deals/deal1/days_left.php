<?php
$folder = basename(dirname(__FILE__));
date_default_timezone_set('America/Los_Angeles');

ob_start();                      // start capturing output
include('../lib/deals/' . $folder . '/end_date');   // execute the file
   // execute the file
$content = ob_get_contents();    // get the contents from the buffer
ob_end_clean();   

$current_date = new DateTime(date('Y-m-d'), new DateTimeZone('America/Los_Angeles'));
$end_date = new DateTime("$content", new DateTimeZone('America/Los_Angeles'));
$interval = $current_date->diff($end_date);

if ($interval->format('%a') >= 2) {
	echo $interval->format('%a');
	echo '<h5 class="label">DAYS<br>LEFT</h5>';

} else {
	echo "Expires at Closing";
}
?>
