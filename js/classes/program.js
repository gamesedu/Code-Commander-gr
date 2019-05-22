Class.subclass('Program', {
  
  // List of valid commands
  CODES: ['fire', 'left', 'move', 'right', 'wait'],
  
  // Parse a command into the command plus optional amount, ie "cmd(amt)"
  //COMMAND_REGEX: /^\s*([a-z]+)(?:\(([0-9]+)\))?\s*$/
  COMMAND_REGEX: /^\s*([a-zα-ωΑ-Ω]+)(?:\(([0-9]+)\))?\s*$/
}, {
  
  init: function(level) {
    this.level = level;
    this.map = level.map;
    this.key = level.key;
    this.tank = this.map.getTank();
    this.reset();
    this.reload();
  },

  reset: function() {
    this.locks = 0;
    this.ok = true;
    this.running = false;
    this.errors = {};
    this.commands = [];
  },
  
  lock: function() {
    this.locks += 1;
  },
  
  unlock: function() {
    this.locks -= 1;
    if (this.locks == 0) {
      this.cycle();
    }
  },
  
  reload: function() {
    var state = Level.getState(this.key);
    $('#program').val(state.program || '');
    $('#program').focus();
  },
  
  save: function() {
    var state = Level.getState(this.key);
    state.program = $('#program').val();
    Level.setState(this.key, state);
  },
  
  run: function() {
    this.save();
    this.reset();
    this.parse();
    if (this.ok) {
      this.execute();
    }
  },
  
//++++++++++greek repeat_command+++++++
repeat_command: function (commands,repeats) { 
    //alert ('repeat command');

    var str = '\n';
	
    for (var i=0; i<repeats-1; i++) { 
         str += commands+'\n';
    } 
	//str += '\n';
    return str; 
} ,  
//-----------------------

  //++++++++++greek uppercase+++++++
replace_greek: function (str) { 
    //alert ('replace_greek(str)');
    //++++++++++greek uppercase+++++++
    var search  = new Array("Ά", "Έ", "Ή", "Ί", "Ϊ", "ΐ", "Ό", "Ύ", "Ϋ", "ΰ", "Ώ","ά", "έ", "ή", "ί", "ϊ",  "ό", "ύ", "ϋ", "ΰ", "ώ"); 
    var replace_with = new Array("Α", "Ε", "Η", "Ι", "Ι", "Ι", "Ο", "Υ", "Υ", "Υ", "Ω","Α", "Ε", "Η", "Ι", "Ι",  "Ο", "Υ", "Υ", "Υ", "Ω"); 
    for (var i=0; i<search.length; i++) { 
         str = str.replace(search[i], replace_with [i]); 
    } 
    return str; 
} ,  
//-----------------------
  //+++++++++++++translate function
  
  translate_source: function(source) {
		var degug1=false;
  		//alert("not tranlasted: "+source);
		source=this.replace_greek(source);
		source=source.replace(/ΔΕΞΙΑ/gi,"right");
		source=source.replace(/ΑΡΙΣΤΕΡΑ/gi, "left");  
		source=source.replace(/ΜΠΡΟΣΤΑ/gi, "move");
		source=source.replace(/μπροστα/gi,"move");
		source=source.replace(/ΠΕΡΙΜΕΝΕ/gi, "wait");
		
		source=source.replace(/ΣΤΟΠ/gi, "wait");
		source=source.replace(/ΕΠΙΘΕΣΗ/gi, "fire");
		source=source.replace(/ΠΥΡ/gi, "fire");
		source=source.replace(/ΜΠΑΜ/gi, "fire");
		source=source.replace(/ΜΠΟΥΜ/gi, "fire");
		source=source.replace(/ΔΕ/gi,"right");
		source=source.replace(/ΑΡ/gi, "left");
		source=source.replace(/ΜΠ/gi, "move");	
		source=source.replace(/\s+\(/g, '(');//replace all spaces before '(' //20160407
		source=source.replace(/\s+\[/g, '[');//replace all spaces before '[' //20160407 FOR REPEAT
	
		//try to implement repeat:
		source=source.replace(/ΞΑΝΑ/gi, "repeat");	
		source=source.replace(/ΕΠΑΝΑΛΑΒΕ/gi, "repeat");	
		source=source.replace(/ΕΠΑΝΕΛΑΒΕ/gi, "repeat");	
		source=source.replace(/REPEAT/gi, "repeat"); //convert to lower case
		source=source.replace(/repeat\s*/gi, "repeat"); //remove spaces after repeat
		//source=source.replace(/\s*\[/gi, "[");// replace "6  [" with "6["  -remove spaces
		
		//search number between repeat 
		//var repeats=source.match(/repeat.*?\[/); //get the command repeat6 [dothis //we just want the 6
		var repeats=source.match(/repeat([0-9]+)\[/g); //ok works get the command repeat6[dothis //we just want the 6
		if(degug1)alert ("repeats:"+repeats);//-

		
		//var text_in_brackets=source.match(/[^[\]]+(?=])/g); //ORIG ok working
		var text_in_brackets=source.match(/[^[\]]+(?=])/g);
		if(degug1)alert ("text_in_brackets :"+text_in_brackets);//-
		
		//+++++++++++++++++added if when not using repeat20160323
		if(repeats!=null){
		var index;
		for (index = 0; index < repeats.length; ++index) {
			if(degug1)alert ("repeats[index]:"+repeats[index]);//-
			var repeats_just_number=Array();
			repeats_just_number[index]=repeats[index].replace("repeat", "");
			//repeats_just_number[index]=repeats[index].replace("[", "");
			//if(degug1)alert ("repeats:"+repeats);//-
			//if(degug1)alert ("repeats parseInt:"+parseInt(repeats_just_number[index]));//-
			var replace_repeat_with=this.repeat_command(text_in_brackets[index],parseInt(repeats_just_number[index]));
			if(degug1)alert ("repeat_command repeats_just_number : "+this.repeat_command(text_in_brackets,parseInt(repeats_just_number[index])));
			source=source.replace(repeats[index], replace_repeat_with); // remove repeat (we are interested only in brackets)

		} // END of for (index = 0; index < repeats.length; ++index) {
		}// END of if(repeats!=null){		
		if(degug1)alert ("repeats:"+repeats);//-
		
		source=source.replace(/repeat\[/gi, "["); // remove repeat (we are interested only in brackets)
		
		//if(degug1)alert ("repeats:"+repeats[0]);
		
		//var re = new RegExp(repeats[0],"gi");
		
		
		//source.match(/\[(.*?)\]/g);
		//var reg_expre_brackets="/[^[\]]+(?=])/g";
		//var reg_expre_brackets="/[^[\]]+(?=])/g";
		
		//alert (source.match(/[^[\]]+(?=])/g)); //ok gets inside of brackets
		
		//if(degug1)alert("tranlasted with brackets: "+source);
		source=source.replace(/\[/gi, ""); // remove brackets in the end
		source=source.replace(/\]/gi, ""); // remove brackets in the end
		if(degug1)alert("tranlasted: "+source);
		return source;
  },
  //------------------------------
  
  
  //jon : should translate this
  parse: function() {
    var self = this;
    var source = $('#program').val();
	//alert("not tranlasted: "+source);
	source=this.translate_source(source);//jon 160320
    var lines = source.split(/\r?\n/);
    $.each(lines, function(i, line) {
      self.parseLine(i, line);
    });
  },
  
  parseLine: function(lineNum, line) {
	//line=this.translate_source(line);//jon 160320
    var match = Program.COMMAND_REGEX.exec(line);
    if (match) {
      var code = match[1];
      var amt = match[2];
      if (this.validCommand(code)) {
        if (!amt || amt < 1) { amt = 1; }
        for (var i = 0; i < amt; i++) {
          this.commands.push({code: code, line: lineNum});
        }
      } else {
        this.addBug(lineNum, 'unknown command');
      }

    } else {
      if (/^\s*$/.exec(line)) {
        // Skip, just a blank line...
      } else {
        // Got an error!
        this.addBug(lineNum, 'invalid');
      }
    }
  },    

  addBug: function(lineNum, msg) {
    this.ok = false;
    this.errors[lineNum] = msg;
    document.getElementById("run-button").disabled = false; //jon 190519 re-enable run-button in case of error
    document.getElementById("program").disabled = false; //jon 190522 re-enable program textarea in case of error
  },

  validCommand: function(code) {
    return $.inArray(code, Program.CODES) >= 0;
  },
  
  execute: function() {
    this.running = true;
    this.currentCommand = null;
    this.cycle();
  },
  
  cycle: function() {
    if (!this.running) { return; }
    if (this.currentCommand === null) {
      // First cycle, begin iteration
      this.currentCommand = 0;
    } else {
      // Iteration
      this.currentCommand += 1;      
      // Let everything update as needed
      this.map.each(function(obj) {
        obj.onCycle();
      });
    }
    
    if (!this.running) { return; }

    // Check for just running out of commands
    if (this.currentCommand >= this.commands.length) {
      app.level.lose();
      return;
    }
      
    // Get command and run it!
    if (!this.running) { return; }
    var cmd = this.commands[this.currentCommand];
    var amt = cmd.amt;
    if (amt == null) { amt = 1; }
    // for (var times=0;times < amt; times++) {
    this.executeCommand(cmd.code);
    // }
  },
  
  executeCommand: function(code) {
  //alert(code);//###############
    var program = this;
    var tank = this.tank;
    var map = this.map;
    
    // Lock for initial command, more locks may be applied by animations, etc.
    program.lock();
    
    switch(code) {
      
      case 'move':
        // Move forward
        var newPos = tank.getMapPos().addDir(tank.getDir(), 1);
        if (map.isPassable(newPos)) {
          // Do the move!
          app.audio.play('move-tank');
          tank.tween({x: newPos.x*64, y: newPos.y*64}, 45, function() {
            app.audio.stop('move-tank');
            tank.setMapPos(newPos);
            program.unlock();
          });
        } else {
          // Bump!
          var curPos = tank.getScreenPos();
          var newPos = curPos.dup().addDir(tank.getDir(), 8);
          tank.tween({x: newPos.x, y: newPos.y}, 3, function() {
            tank.tween({x: curPos.x, y: curPos.y}, 3, function() {
              setTimeout(function() {program.unlock();}, 800);
            });
          });
        }
        break;
        
      case 'right':
        // Turn right
        app.audio.play('move-tank');
        var newDir = Dir.right(tank.getDir());
        tank.tween({rotation: tank.getRotation() + 90}, 35, function() {
          app.audio.stop('move-tank');
          tank.setDir(newDir);
          program.unlock();
        });
        break;
        
      case 'left': 
        // Turn left
        app.audio.play('move-tank');
        var newDir = Dir.left(tank.getDir());
        tank.tween({rotation: tank.getRotation() - 90}, 35, function() {
          app.audio.stop('move-tank');
          tank.setDir(newDir);
          program.unlock();
        });
        break;
        
      case 'wait':
        // Wait one cycle
        setTimeout(function() {program.unlock();}, 1000);
        break;
        
      case 'fire':
        // Fire the cannon
        app.audio.play('fire');
        tank.playAnimation('fire');
        setTimeout(function() {
          var bullet = new Bullet(map);
          var startPos = tank.getScreenPos();
          startPos.addDir(tank.getDir(), 32);
          bullet.setScreenPos(startPos);
          bullet.setDir(tank.getDir());
          var endMapPos = tank.getMapPos().addDir(tank.getDir(), 1);
          while (map.isPassable(endMapPos)) {
            endMapPos.addDir(tank.getDir(), 1);
          }
          var endPos = endMapPos.toScreenPos();
          endPos.addDir(tank.getDir(), -22);
          if (map.onMap(endMapPos)) {
            // Hit!
            var target = null;
            map.each(endMapPos.x, endMapPos.y, function(obj) {
              if (!obj.isPassable()) { target = obj; }
            });
          }
          var duration = Math.floor((Math.abs(startPos.x - endPos.x) + Math.abs(startPos.y - endPos.y))/10);
          bullet.tween({x: endPos.x, y: endPos.y}, duration, function() {
            bullet.destroy();
            //bullet.entity.alpha = 0;
            if (target) {
              target.takeDamage(1);
            }
            setTimeout(function() { program.unlock(); }, 500);
          });
        }, 50);
        break;
        
    }
  }
  
});
