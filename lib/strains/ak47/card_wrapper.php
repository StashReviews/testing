<?php
    $dir = __DIR__;
    $file = basename($dir); // $file is set to the folder name
?>
<div class="cardwrapper">           <!-- Cardwrapper begin -->
    <?php $link_address = '../www/' . $file . '.php' ?>
    <a href="<?php echo $link_address;?>">
        <img src="http://placehold.it/100x100" class="cardlogo">
        <h1 class="strainname"><?php echo file_get_contents('../lib/strains/' . $file . '/strain_name');?></h1>
        <h2 class="producer">PRODUCED BY<br><span><?php echo file_get_contents('../lib/strains/' . $file . '/producer_name');?></span></h2>
        <div class="rating">
            <!-- Change the below data attribute for the rating -->
            <div class="ratingwrap">
              <div class="progress-wrap green progress" data-progress-percent="3.5">
                <div class="progress-bar progress"></div>
              </div>
            </div>
            <img src="http://deviine.com/deviine/beta/img/BudBoxWHITE.png" class="budbox">
            <div class="ratingstext">
                <p id="<?php echo ($dir . 'Ratings');?>" class="ratingstext"></p><p id="<?php echo ($dir . 'Users');?>" class="ratingstext"><p>
            </div> 
        </div><!--End of the rating div-->
        <div class="stats">
            <div class="statleft">
                <h5 class="label"><?php echo file_get_contents('../lib/strains/' . $file . '/sativa');?>% INDICA</h5>
            </div>
            <div class="statright">
                <h5 class="label"><?php echo file_get_contents('../lib/strains/' . $file . '/indica');?>% SATIVA</h5>
            </div>
        </div>
    </a>
</div>                              <!--Cardwrapper end-->