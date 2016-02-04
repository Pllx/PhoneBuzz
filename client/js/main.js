$(document).ready(function() {
  $('#number-form').submit(function(event) {
    event.preventDefault();
    var number = $("input:first").val();
    $('#log').text('Making call...');

    $.post('/phonebuzz/call', {number: number})
      .done(function() {
        $('#log').text('Call succeeded!');
      }.bind(this))
      .fail(function() {
        $('#log').text('Call failed');
      }.bind(this));
  })
});
