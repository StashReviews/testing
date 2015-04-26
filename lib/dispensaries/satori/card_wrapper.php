<?php
    $dir = __DIR__;
    $file = basename($dir); // $file is set to the folder name
?>
<div class="cardwrapper">
    <a href=<?php echo "../www/" . $dir . ".php" ?>>
        <img src="http://placehold.it/100x100" class="cardlogo">
        <h1 class="dispensaryname"><?php echo file_get_contents ('../lib/dispensaries/' . $file . '/dispensary_name'); ?></h1>
        <h2 class="dispensaryaddress"><?php echo file_get_contents ('../lib/dispensaries/' . $file . '/address'); ?></h2>
            <div class="rating">    <!-- Begin rating system output -->
                                    <!-- Here should be the ratings system buds -->
                <p id="sativaRatings" class="ratingstext"></p><p id="sativaUsers" class="ratingstext"><p>
            </div>                  <!-- End of Rating output -->  
                <div class="distance"><!-- Begin distance output -->
                    <h4 class="number">
                        <div id=<?php $dir . "_key" ?>></div>
                    </h4> 
                    <h5 class="label">MILES<br>AWAY</h5>
                </div>              <!-- End distance output -->
    </a>
</div>