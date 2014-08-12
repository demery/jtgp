var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard",
  "middle-name": "Lester",
  nickname: "Curly",
}

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

debug(another_stooge['last-name']);

stooge.profession = 'actor';
debug(another_stooge.profession);