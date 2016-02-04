$(document).ready(function() {
  $('#number-form').submit(function(event) {
    event.preventDefault();
    var number = $("input:first").val();
    $('#log').text('Making call...');

    $.post('/phonebuzz/call', {number: number})
      .done(function() {
        // update div to notify user of success
        $('#log').text('Call succeeded!');
      }.bind(this))
      .fail(function() {
        // update div to notify user of failure
        $('#log').text('Call failed');
      }.bind(this));
  })
});
