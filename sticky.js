
var app = new function() {
  this.el = document.getElementById('notes');
  this.notes = [];
  this.searchStr = '';
  this.searchArray = [];

  this.Count = function(data) {
    var el   = document.getElementById('counter');
    var name = 'note';
    if (data) {
      if (data > 1) {
        name = 'notes';
      }
      el.innerHTML = data + ' ' + name ;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };
  
  this.FetchAll = function() {
    var data = '';
    if (this.searchArray.length > 0) {
      for (i = 0; i < this.searchArray.length; i++) {
        data += '<tr>';
        data += '<td>' + this.searchArray[i] + '</td>';
        data += '<td><button class="button" onclick="app.Edit(' + i + ')">Edit</button></td>';
        data += '<td><button class="button" onclick="app.Delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
      }
    }
    this.Count(this.notes.length);
    return this.el.innerHTML = data;
  };
  this.Add = function () {
    el = document.getElementById('add-name');
    // Get the value
    var note = el.value;
    var el_search = document.getElementById('search-str');
    el_search.value = '';
    if (note) {
      // Add the new value
      this.notes.push(note.trim());
      // Reset input value
      el.value = '';
      // Dislay the new list
      this.Search();
    }
  };
  this.Edit = function (item) {
    var el = document.getElementById('edit-name');
    // Display value in the field
    el.value = this.notes[item];
    
    var el_search = document.getElementById('search-str');
    el_search.value = '';
    
    // Display fields
    document.getElementById('spoiler').style.display = 'block';
    self = this;
    document.getElementById('saveEdit').onsubmit = function() {
      // Get value
      var note = el.value;
      if (note) {
        // Edit value
        self.notes.splice(item, 1, note.trim());
        // Display the new list
        self.Search();
        // Hide fields
        CloseInput();
      }
    }
  };
  this.Delete = function (item) {

    var el_search = document.getElementById('search-str');
    el_search.value = '';

    // Delete the current row
    this.notes.splice(item, 1);
    // Display the new list
    this.Search();
  };

  this.Search = function () {
    el = document.getElementById('search-str');
    // Get the value
    searchStr = el.value;

    this.searchArray = [];

    if (this.notes.length > 0) {

        for (i = 0; i < this.notes.length; i++) {

          if(this.notes[i].includes(searchStr) || !searchStr){
            this.searchArray.push(this.notes[i]);
          }
        }
    }
  

    // Display the new list
    this.FetchAll();
  
  };
  
}
app.Search();
function CloseInput() {
  document.getElementById('spoiler').style.display = 'none';
}
