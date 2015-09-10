
function ScrollSynchronizer() {
  this.elems = []
  var j = 0;
  for(var i = 0; i < arguments.length; i++) {
    this.addElem(arguments[i]);
  }
}

ScrollSynchronizer.prototype = {
  addElem: function(elem) {
    var self = this;

    if (elem instanceof jQuery) {
      elem = elem[0];
    }

    if (elem.nodeType == 1) { // element node
      var elem_idx = this.elems.length;
      this.elems[elem_idx] = elem;
      elem.self_idx = elem_idx;

      $(elem).on("scroll", function(){
        if (self.scroll_master == null ||
            self.scroll_master == elem.self_idx) {
          self.scroll_master = elem.self_idx;
          self.scrollOthers(elem_idx);
          window.setTimeout(100, function(){
            self.scroll_master = null;
          });
        }
      });
    }
  },
  scrollOthers: function(elem_idx) {
    var elem = this.elems[elem_idx];
    var scroll_frac = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);

    for (var i = 0; i < this.elems.length; i++) {
      if (i == elem_idx) continue;
      elem = this.elems[i];
      elem.scrollTop = (elem.scrollHeight - elem.clientHeight) * scroll_frac;
    }
  }
}
