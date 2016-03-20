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
$combo=;
<form>
<select id="myList" >
  <option value="." >.</option>
  <option value='>' > > </option>
  <option value='<' > < </option>  
  <option value="^" >^</option>
  <option value="R">R</option>
  <option value="T">T</option>
  <option value="." >.</option>
  <option value='O' >O</option>
  <option value='|' >|< </option>  
  <option value="-" >-</option>
  <option value="+">+</option>
  <option value="*">*</option>
  <option value="B">B</option>
  
</select>
<form>

echo 
"<form>
<table >
  <tr>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
  <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
    <td ></td>
  </tr>
</table>
</form>
";
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