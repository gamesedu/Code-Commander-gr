Class.subclass('Overlay', {
  
  init: function() {
    this.bgNode = $('#overlay');
    this.contentNode = $('#overlay-contents'); 
  },
  
  display: function(html, stack) {
    this.contentNode.html(html);
    this.show();
  },
  
  show: function() {
    this.bgNode.show();
    this.contentNode.show();
  },
  
  hide: function() {
    this.contentNode.hide();
    this.bgNode.hide();
  },
  
  displayPage: function(name) {
    var builder = new OverlayBuilder();
    Overlay.PAGES[name].call(this, builder);
    var html = builder.render();
    this.display(html);
  }
  
});

Class.subclass('OverlayBuilder', {
  
  init: function() {
    this.buffer = '';
  },
  
  render: function() {
    return this.buffer;
  },
  
  h1: function(txt) {
    return this.html("<h1>" + txt + "</h1>\n");
  },
  
  p: function(txt) {
    return this.html("<p>" + txt + "</p>\n");
  },
  
  indent: function(txt) {
    return this.html('<p style="margin-left:20px;">' + txt + '</p>');
  },

  text: function(name, value) {
    var html = '<input type="text" id="'+name+'" name="'+name+'"';
    if (value) { html += ' value="' + value + '"'; }
    html += '></input>';
    return this.html(html);
  },
  
  button: function(name, onclick, icon) {
    return this.html('<button onclick="'+onclick+'">'+name+'</button>');
  },
  
  html: function(txt) {
    this.buffer += txt;
    return this; 
  }
  
});

Overlay.PAGES = {
  'enter-name': function(p) {
    var saveCmd = "app.settings.set('name', $('#name').val());app.overlay.displayPage('welcome');";
    
    p.h1('Welcome Commander')
      .p('Enter your name to begin your tests:')
      .text('name')
      .p('Click "Save" when you are done.')
      .button('Save', saveCmd);
  },
  
  'welcome': function(p) {
    p.h1('Welcome ' + app.settings.get('name') + '!')
      .p('Σε αυτό το παιχνίδι ελέγχετε ένα τανκ και πρέπει να καταστρέψετε την βάση του αντιπάλου.')
      .p('Για να το πετύχετε αυτό πρέπει να γράψετε ένα πρόγραμμα που να σας επιτρέψει να κερδίσετε την κάθε αποστολή.') //To do this, you must write a program to move and shoot your way through each level
      .p('Οι εντολές που μπορείτε να χρησιμοποιήσετε είναι οι παρακάτω (μια εντολή ανα σειρά):')
      .indent('<b>ΜΠΡΟΣΤΑ,ΑΡΙΣΤΕΡΑ,ΔΕΞΙΑ,ΠΥΡ,ΣΤΟΠ/ΠΕΡΙΜΕΝΕ</b>')
      .indent('<b>ΕΠΑΝΑΛΑΒΕ 5 [<BR>ΜΠΡΟΣΤΑ<BR>ΠΥΡ<BR>],</b>: ΘΑ ΕΚΤΕΛΕΣΕΙ ΤΙΣ ΕΝΤΟΛΕΣ ΜΠΡΟΣΤΑ ΚΑΙ ΠΥΡ 5 ΦΟΡΕΣ')
      .p('Μόλις γράψετε το πρόγραμμα πατήστε το κουμπί "Εκτέλεση" για να δείτε εαν δουλεύει σωστά.')//Once you have written your program, click the "Run Program" button to see if it works!
      .p('Υπάρχουν διάφορες αποστολές.Μπορείτε να επιλέξετε όποια αποστολή θέλετε πατώντας το κουμπί "Επιλογή επιπέδου".')
      .button('Επιλογή επιπέδου', "app.overlay.displayPage('select-level');");
  },
  
  'select-level': function(p) {
    var diffs = Level.difficulties();
    var levels = '<table class="indent">';
    for (var d = 0; d < diffs.length; d++) {
      var diff = diffs[d];
      var count = Level.levelCount(diff);
      levels += '<tr>';
      levels += '<td style="vertical-align: middle;width: 100px;">' + diff.toUpperCase() + '</td>';
      levels += '<td>';
      for (var num = 0; num < count; num++) {
        var klass = 'level';
        if (Level.isCompleted(Level.key(diff, num))) {
          klass += ' completed'; 
        }
        levels += '<div class="'+klass+'" onclick="app.loadLevel(\''+diff+'\', '+num+')">' + (num + 1) + '</div>'; 
      }
      levels += '</td>';
      levels += '</tr>'; 
    }
    levels += '</table>';
    
    p.h1('ΕΠΙΛΕΞΤΕ ΑΠΟΣΤΟΛΗ :')
      .p('Επιλέξτε αριθμό αποστολής/επιπέδου για να ξεκινήσετε.')
      .html(levels)
      .p('<i>Οι πίο μεγάλοι αριθμοί είναι δυσκολότεροι</i>');
  },
  
  'win': function(p) {
    p.h1('ΚΕΡΔΙΣΑΤΕ !!!')
      .p('Συγχαρητήρια! Δοκιμάστε να κερδίσετε και την επόμενη αποστολή !')
      .button('Επόμενη αποστολή', "app.overlay.displayPage('select-level');");
  },
  
  'lose': function(p) {
    p.h1('ΔΟΚΙΜΑΣΤΕ ΞΑΝΑ !')
      .p('Δεν καταστράφηκε η βάση. Το πρόγραμμα σας χρειάζεται αλλαγές!')
      .button('ΔΟΚΙΜΑΣΕ ΞΑΝΑ', 'app.resetLevel()')
      .button('ΕΠΙΛΟΓΗ ΕΠΙΠΕΔΟΥ', "app.overlay.displayPage('select-level');");
  },
  
  'help-programming': function(p) {
    p.h1('Programming Help')
      .p('Για να προγραμματίσετε το τανκ σας, πρέπει να δώσετε μια σειρα εντολών, μια σε κάθε γραμμη, στο παράθυρο με το όνομα "ΠΡΟΓΡΑΜΜΑ".')
      .p('Μπορείτε να χρησιμοποιήσετε τις παρακάτω εντολές:')
      .indent('<b>ΜΠΡΟΣΤΑ, ΜΠ ,move</b>: Το τανκ κινείται 1 τετράγωνο μπροστά. moves the tank forward one square')
      .indent('<b>ΔΕΞΙΑ ,ΔΕ ,right</b>: Δεξιά στροφή 90μοίρες / turn right 90 degrees')
      .indent('<b>ΑΡΙΣΤΕΡΑ , ΑΡ, left</b>: αριστερή στροφή 90μοίρες / turn left 90 degrees')
      .indent('<b>ΣΤΟΠ, ΠΕΡΙΜΕΝΕ, wait</b>: Περίμενε ένα γύρο / wait a turn')
      .indent('<b>ΠΥΡ,ΕΠΙΘΕΣΗ,ΜΠΑΜ, fire</b>: fire your gun - the bullet will travel until it hits something')
      .indent('<b>ΕΠΑΝΑΛΑΒΕ 5 [<BR>ΜΠΡΟΣΤΑ<BR>ΠΥΡ<BR>],</b>: ΘΑ ΕΚΤΕΛΕΣΕΙ ΤΙΣ ΕΝΤΟΛΕΣ ΜΠΡΟΣΤΑ ΚΑΙ ΠΥΡ 5 ΦΟΡΕΣ')
      .p('Μπορείτε επίσης να γράψετε ΜΠΡΟΣΤΑ(5).Αυτό είναι το ίδιο με το να γράψετε 5 φορές το ΜΠΡΟΣΤΑ')
      .button('ΚΛΕΙΣΙΜΟ', "app.overlay.hide();");
  },
  
  'about': function(p) {
    p.h1('About Code Commander')
      .p('This program is the personal project of Rob Morris of <a href="http://irongaze.com" target="_blank">Irongaze Consulting</a>.')
      .p('It is written in pure Javascript, using <a href="http://jquery.com" target="_blank">jQuery</a>, <a href="http://craftyjs.com" target="_blank">CraftyJS</a> ' +
         'and <a href="http://schillmania.com/projects/soundmanager2/" target="_blank">SoundManager 2</a>.')
      .p('Source code for the project is hosted on <a href="https://github.com/irongaze/Code-Commander" target="_blank">GitHub</a>, and is licensed under the MIT license.')
      .p('Sprites, fonts, icons, sounds and music (where not originally created) have been sourced from numerous generous contributors, and are all free for commercial use in one form or another.')
      .p('Questions, comments or suggestions may be directed to <a href="mailto:codecommander@irongaze.com">codecommander@irongaze.com</a>.')
      .button('Close', "app.overlay.hide();");
  }
}
