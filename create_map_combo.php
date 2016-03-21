<?php
/*
Code Commander Greek
-T: tree , R:rock , 
< > ^ tank heading&starting point
tower : O.O O..O O...O and vertical 
dot (.) empty space
walls : - | + 
mine: *
Target: B

*/
//include "map_create.php";
//to DO:
/*
* - use $_GET for parameters
* - 
* - 
*/
//print_r($_POST);
//if(isSet($_POST)){print_r($_POST);}

if ($_POST!=null){
echo "<BR>    {<BR>
      key: 'newlevel-0'<BR>,
      name: 'new001!',<BR>";
echo "map: [";
for( $y=1;$y<9;$y++)
{
	echo "'";
	for( $x=1;$x<9;$x++){
		echo $_POST["combo$x-$y"] ;
		
	}
	
	if($y<8)echo "',<BR>\n";
}

echo " ]
 },
";

}

function getComboBox( $x, $y){

$combo='

<select id="myList'.$x.'-'.$y.'" name="combo'.$x.'-'.$y.'" >
  <option value="." >.</option>
  <option value=">" > > </option>
  <option value="<" > < </option>  
  <option value="^" >^</option>
  <option value="R">R</option>
  <option value="T">T</option>
  <option value="." >.</option>
  <option value="O" >O</option>
  <option value="|" >|< </option>  
  <option value="-">-</option>
  <option value="+">+</option>
  <option value="*">*</option>
  <option value="B">B</option>
  
</select>';

return $combo;
}

echo " <form method=post ><table border=1>";

for( $y=1;$y<9;$y++)
{
	echo "<tr>";
	for( $x=1;$x<9;$x++){
		echo "<td >".getComboBox($x,$y)."</td>";
		
	}
	
	echo "</tr>";
}
echo "</table>
<input type=submit></form>";



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
      name: 'Turn, tden Fire!',
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
