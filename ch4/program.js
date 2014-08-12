var add = function (a, b) {
  console.log(this);
  console.log(arguments);
  return a + b;
};

console.log(add(3,4));


var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3

myObject.double = function() {
  var that = this; // Workaround

  var helper = function() {
    console.log("this", this);
    console.log("that", that);
    that.value = add(that.value, that.value);
  };

  helper();
};

// Invoke double as a method

myObject.double();
document.writeln(myObject.value);

// Create a constructor function called Quo.
// It makes an object with a status property

var Quo = function(string) {
  this.status = string;
};

// Give all instances of Quo a public method
// called get_status.

Quo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status());

// Make an array of 2 numbers and add them.

var array = [3,4];
var sum = add.apply(null, array);  // sum is 7
console.log("sum", sum);

// Make an object with a status member.

var statusObject = {
  status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

// var status = Quo.prototype.get_status.apply(statusObject);

// console.log("status", status);

// Make a function that adds up a lot of stuff.

// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.

var sum = function () {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }

  return sum;
}

document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108

// Exceptions

var add = function(a,b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}

// Make a try_it function that calls the new add
// function incorrectly.

var try_it = function() {
  try {
    add("seven");
  } catch (e) {
    document.writeln(e.name + ':' + e.message);
  }
}

try_it();

// Augmentation

Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

var x = Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor' ](this);
});

console.log('method returns', x);

document.writeln((-10 / 3).integer()); // -3
document.writeln((10 / 3).integer()); // -3

String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "      neat      ".trim() + '"');

// Recursion

var hanoi = function hanoi(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

// Define a getElementsByAttribute funcion. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function (att,value) {
  var results = [];

  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' &&
      (actual === value || typeof value !== 'string')) {
        results.push(node);
      }
  });
  return results;
};

// Scope

var foo = function () {
  var a = 3, b = 5;
  console.log('a:', a, 'b:', b);

  var bar = function () {
    var b = 7, c = 11;
    // At this point, a is 21, b is 7, and c is 11
    console.log('a:', a, 'b:', b, 'c:', c);
    a += b + c;

    // At this point, a is 21, b is 7, and c is 11
    console.log('a:', a, 'b:', b, 'c:', c);
  };

  // At this point a is 3, b is 5, and c is not defined
  console.log('a:', a, 'b:', b);

  bar();

  // At this point, a is 21, b is 5
  console.log('a:', a, 'b:', b);
}();

var myObject = (function() {
  var value = 0;

  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  };
}());

document.writeln('myObject.getValue():   ', myObject.getValue());
document.writeln('myObject.increment(3): ', myObject.increment(3));
document.writeln('myObject.getValue():   ', myObject.getValue());
document.writeln('myObject.value:        ', myObject.value);

// Create a maker function called quo. It makes an object with a get_status
// method and a private status property.
var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  };
};

// Make an instance of quo.

var myQuo = quo("amazed");
document.writeln('myQuo.get_status(): ', myQuo.get_status());
document.writeln('myQuo.status:       ', myQuo.status);

// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level +=1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

// BAD EXAMPLE

// Make a function that assigns event handler functios to an array of nodes
// the wrong way. When you click on a node, an alert box is supposed to
// display the ordinal of the node. But it always displays the number of nodes
// instead.

// var add_the_handlers = function(nodes) {
//   console.log('Node count', nodes.length);
//   var i;
//   for (i = 0; i < nodes.length; i += 1) {
//     nodes[i].onclick = function(e) {
//       alert(i);
//     };
//   }
// };

// NOTE: This is the same structure as the fade function above:
// As with the 'level' var, the var 'i' from the outer context
// is being accessed by the inner one. The 'i' value accessed by
// alert(i) is the same for all nodes.

// add_the_handlers(document.getElementsByTagName('li'));

// END BAD EXAMPLE

// BETTER EXAMPLE

// Make a function that assigns evern handler functions to an array of nodes.
// When you click on a node, an alert by will display the ordinal of the node.

// var add_the_handlers = function(nodes) {
//   var helper = function(i) {
//     return function(e) {
//       alert(i);
//     };
//   };
//   var i;
//   for (i = 0; i < nodes.length; i += 1) {
//     nodes[i].onclick = helper(i);
//   }
// };

// add_the_handlers(document.getElementsByTagName('li'));

// Here the helper function is given a specific value of 'i' and
// alert(i) in the returned function is accessing that specific 'i' value.

// Consider this equivalent version where we change the name of the var in the
// helper definition to 'posn':

var add_the_handlers = function(nodes) {
  var helper = function(posn) {
    return function(e) {
      alert(posn);
    };
  };
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = helper(i);
  }
};

add_the_handlers(document.getElementsByTagName('li'));

// CALLBACKS

// MODULES

String.method('denentityify', function() {
  // The entity table. It maps entity names to characters.

  var entity = {
    quot: '"',
    lt: '<',
    gt: '>',
    amp: '&',
  };
  //Return the denentityify method.
  return function() {
    // This is the denentityify method. It calls the string
    // replace method, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table. It uses
    // a reqular expression (Chapter 7).
    return this.replace(/&([^&;]+);/g,
      function (a,b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());

document.writeln("'&amp;lt;&amp;quot;&amp;gt;'.denentityify(): ",'&lt;&quot;&gt;'.denentityify()); // <">

var serial_maker = function() {
  // Produce and object that produces unique strings. A
  // unique string is made up of two parts: a prefix
  // and a sequence number. The object comes with
  // methods for setting the prefix and sequence
  // number, and a gensym method that produces unique
  // strings.

  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym(); // unique is 'Q1000'
document.writeln('unique ', unique);
document.writeln('seqer.gensym() again ', seqer.gensym());

Function.method('curry', function () {
  var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

// Curry
var add = function (a, b) {
  return a + b;
};
var add1 = add.curry(1);
document.writeln('add1(6): ', add1(6));

// Memoization
document.writeln("\nW/O Memoization\n===");
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i < 10; i++) {
  document.writeln('// ' + i + ': ' + fibonacci(i));
};


document.writeln("\nWith Memoization\n===");
var fibonacci = (function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n-1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}());

for (var i = 0; i < 10; i++) {
  document.writeln('// ' + i + ': ' + fibonacci(i));
};

document.writeln("\nUsing memoizer\n===");
var memoizer = function(memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
}

var fibonacci = memoizer([0,1], function(recur, n) {
  return recur(n - 1) + recur(n - 2);
});

for (var i = 0; i < 10; i++) {
  document.writeln('// ' + i + ': ' + fibonacci(i));
};

document.writeln('\nFactorial\n===');
var factorial = memoizer([1,1], function(recur, n) {
  return n * recur(n - 1);
});

for (var i = 1; i < 10; i++) {
  document.writeln('// ' + i + ': ' + factorial(i));
}

