String.prototype.getInitials = function(glue) {
  if (typeof glue == "undefined") {
    var glue = true;
  }

  var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);

  if (glue) {
    if (initials == null) {
      initials = ["-"];
    }
    return initials.join("");
  }

  return initials;
};

String.prototype.capitalize = function() {
  return this.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
  });
};
