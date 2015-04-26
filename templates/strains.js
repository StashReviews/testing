var str = '<ul class='xbreadcrumbs' style='position:absolute; bottom:0px'>';

for(var i in $yourArray){
   str += '<li><a href="#">String 1</a></li>';
}

str += '</ul>';

$('body').append(str);