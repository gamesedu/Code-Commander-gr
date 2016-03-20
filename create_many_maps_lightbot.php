<?php
/*
Code Commander Greek
-T: tree , R:rock , 
< > ^ tank heading&starting point
O : tower
dot (.) empty space
walls : - | +

*/
//include "map_create.php";
//to DO:
/*
* - use $_GET for parameters
* - 
* - 
*/

function getLight(){

	global $counter,$max_lights,$light_array,$debug;
	//$input = array("b", "l");

	$random=rand(0,4);

	$ret=$light_array[$random];

	if($ret=="l") $counter++;
	if($debug) echo "<h1>$counter :light:$ret ,random=$random</h1>";
	if ($counter>$max_lights) $ret="b";
	//getLight()
	return $ret;
}//function getLight(){ ///////////////////////////////

function getStep(){

	global $counter_steps,$max_steps,$steps_array,$debug;
	//$input = array("b", "l");

	$random=rand(0,4);

	$ret=$steps_array[$random];
	
	if($ret=="l") $counter_steps++;
	if($debug) echo "<h1>$counter_steps :light:$ret ,random=$random</h1>";
	if ($counter_steps>$max_steps) $ret="0";
	//getLight()
	return $ret;
}//function getStep(){ ////////////////////////////////////////////////////////////////


$total_levels=15;
echo '[';
for ($i=0;$i<$total_levels;$i++){

	$counter=0;
	$counter_steps=0;
	$max_lights=3;
	$max_steps=4;
	$debug=false;
	$board_size_x=8;
	$board_size_y=8;
	$start_x=$board_size_x-1; // initial robot x
	$start_y=$board_size_y-1; // initial robot y
	$light_array= array("T", "R","T","R","T"); //use for probabbility 
	$steps_array= array(0, 1,0,0,0);//use for probabbility 
	if($debug)print_r($light_array);

	echo '
	{"direction":0,"position": {"x": '.$start_x.', "y": '.$start_y.'},
	"map":
	[[
	';
	for($y=0;$y<$board_size_y;$y++){
		for($x=0;$x<$board_size_x;$x++){
			echo '{"h":'.getStep().', "t":"'.getLight().'"}';
			if($x<$board_size_x-1) echo',';
			
		}
		if($y<$board_size_y-1) {echo '],['; }else {echo ']],"medals":{"gold":5,"silver":10,"bronze":15}} ';}
			
	}

if($i<$total_levels-1){ echo "<BR> ,<BR>";} else echo '<BR>]';
} // END of for ($i=0;$i<15;$i++){

?>
<BR>
<HR size=5>
ORIGINAL LEVELS code commander:
<pre>
App.LEVELS = {
  
  intro: [
    {
      key: 'intro-0',
      name: 'Fire!',
      map: [
        '......T.',
        'T...B...',
        '........',
        '.....T..',
        '..T.....',
        '.T.....T',
        '....^...',
        '......T.'
      ]
    },

    {
      key: 'intro-1',
      name: 'Turn, Then Fire!',
      map: [
        '......T.',
        'T.......',
        '........',
        '.....T..',
        '..T.....',
        '.T.....T',
        '..^...B.',
        '......T.'
      ]
    },

    {
      key: 'intro-2',
      name: 'Moving Around',
      map: [
        '......T.',
        'R.......',
        '........',
        '.....T..',
        '..T.....',
        '.T....BT',
        '...R.T..',
        '..^T..T.'
      ]
    },
    
    {
      key: 'intro-3',
      name: 'Move A Lot',
      map: [
        '.....|..',
        '>....|R.',
        '...|.|..',
        '...|.|..',
        '...|...B',
        '.R.|R...',
        '...|.TT.',
        'T..|..T.'
      ]
    },
    
    {
      key: 'intro-4',
      name: 'Trees Go Boom',
      map: [
        '.R.TTTTT',
        '..TT.B.T',
        '...T...T',
        '.T.TTTTT',
        'R.......',
        '....T...',
        '..>.....',
        '.....R..'
      ]
    },
    
    {
      key: 'intro-5',
      name: 'Mines Go Boom, Too',
      map: [
        '........',
        '...|.*<*',
        '.B.|..*T',
        '...|....',
        '---+R...',
        '......T.',
        '.T......',
        '...RT...'
      ]
    }    
  
  ],
  
  beginner: [

    {
      key: 'beginner-0',
      name: 'Mines',
      map: [
        'R...T...',
        '.RTT....',
        'TB..*T..',
        '...|....',
        '.--+^...',
        '..T....T',
        '...T....',
        '.....R..'
      ]
    },

    {
      key: 'beginner-1',
      name: 'Secret Entrance',
      map: [
        '.RvR....',
        '......T.',
        '--*.....',
        '.T..*...',
        '..TR----',
        '......+.',
        '....+.B.',
        '......+.'
      ]
    },

    {
      key: 'beginner-2',
      name: 'Maze',
      map: [
        'R.......',
        '...T..<.',
        '........',
        '..R..T.R',
        'RT.R.RR.',
        '.RT.R...',
        'R.....T.',
        'TT..R.B.'
      ]
    },

    {
      key: 'beginner-3',
      name: 'Beam Towers Never Wait',
      map: [
        '....T...',
        '......T.',
        '.B....R.',
        '..TR..O.',
        '.T......',
        '..O...O.',
        'T.|...|.',
        '..|.^.|.'
      ]
    },

    {
      key: 'multi-tower',
      name: 'Tower Tangle',
      map: [
        '..OO.TRT',
        '>......R',
        'RROO..O.',
        '.TTO..O.',
        '.T......',
        '.....T..',
        'T...T.B.',
        '..R.....'
      ]
    }
    
  ]
  
}