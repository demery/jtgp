var empty_object = {};
var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard",
}


var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09/23 10:42",
    city: "Los Angeles"
  }
};


console.log(stooge["first-name"]);
console.log(flight.departure.IATA);

console.log(stooge["middle-name"]);
console.log(flight.status);
console.log(stooge["FIRST-NAME"]);

var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

console.log(middle);
console.log(status);

console.log(flight.equipment);
console.log(flight.equipment && flight.equipment.model);

stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
console.log(JSON.stringify(stooge));

flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';
console.log(JSON.stringify(flight));

var x = stooge;
console.log(x.nickname);

var a = { 'a': 1 }, b = { 'b': 2 }, c = { 'c': 3 };
console.log(JSON.stringify([a,b,c]));

var a = b = c = { 'a': 1 };
console.log(JSON.stringify([a,b,c]));

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

console.log(another_stooge['last-name']);

stooge.profession = 'actor';
console.log(another_stooge.profession);

console.log(typeof flight.number);
console.log(typeof flight.status);
console.log(typeof flight.arrival);
console.log(typeof flight.manifest);

console.log(typeof flight.toString);
console.log(typeof flight.constructor);

console.log(flight.hasOwnProperty('number'));       // true
console.log(flight.hasOwnProperty('constructor'));  // false

var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') {
    document.writeln(name + ':' + another_stooge[name]);
  }
}

document.writeln('');

var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];

for(i = 0; i < properties.length; i += 1) {
  document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}

another_stooge.nickname // 'Moe'

// Remove nickname from another_stooge, revealing
// the nickname of the prototype.

delete another_stooge.nickname;

console.log(another_stooge.nickname); // 'Curly'

// GLOBAL ABATEMENT

var MYAPP = {};

MYAPP.stooge = {
  'first-name': 'Joe',
  'last-name': 'Howard'
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09/23 10:42",
    city: "Los Angeles"
  }
};
