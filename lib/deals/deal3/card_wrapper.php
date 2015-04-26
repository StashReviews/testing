<?php 
$folder = basename(dirname(__FILE__));
?>
<a class="cardwrapper" href=<?php 'index.php?category=../lib/deals/' . $folder . '&page=deal.php'?>>
  <img src="http://placehold.it/100x100" class="cardlogo">
  <h1 class="dealtitle"><?php echo file_get_contents('../lib/deals/' . $folder . '/title');?></h1>

  <h2 class="dealaddress">
    <span><?php echo file_get_contents('../lib/deals/' . $folder . '/business_name');?></span>
    <?php echo file_get_contents('../lib/deals/' . $folder . '/address');?>
  </h2>
  <div class="stats">
    <div class="statleft">
      <h4 class="number">9</h4>
      <h5 class="label">MILES<br>AWAY</h5>
    </div>
    <div class="statright">
      <h4 class="number"><?php include ('../lib/deals/' . $folder . '/days_left.php');?></h4>
      
    </div>
  </div>
</a>

