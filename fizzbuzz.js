function FizzBuzz() {
  var history = {};

  this.createString = function(num) {
    var result = '';
    for (var i = 1; i <= num; i++) {
      if (!history[i]) {
        if (i % 15 === 0) history[i] = 'fizzbuzz';
        else if (i % 3 === 0) history[i] = 'fizz';
        else if (i % 5 === 0) history[i] = 'buzz';
        else history[i] = '' + i;
      }
      result += history[i]+', ';
    }
    console.log(result);
    return result;
  }
}

module.exports = new FizzBuzz();
