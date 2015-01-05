(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
/** 
 * Grab a package from GitHub with Duo. 
 */

var slide = require('michaeltroy/carousel-slide');

/** 
 * Simple module exports. 
 */

var Eric = {
  name: "my name is ..."
}

module.exports = {Boy: Eric};

/** 
 * Require React component. 
 * var myUi = require('./ui/hello-world.js');
*/
}, {"michaeltroy/carousel-slide":2}],
2: [function(require, module, exports) {
var Carousel = require('carousel')
  , inherit = require('inherit')
  , classes = require('classes');

module.exports = CarouselSlide;
inherit(CarouselSlide, Carousel);

function CarouselSlide(el, opts) {
  if (!(this instanceof CarouselSlide)) return new CarouselSlide(el, opts);
  Carousel.call(this, el, opts);

  this.forEach(function (item) {
    setTimeout(function () {
      classes(item).add('carousel-slide');
    }, 0);
  })
}

}, {"carousel":3,"inherit":4,"classes":5}],
3: [function(require, module, exports) {
var classes = require('classes');

module.exports = Carousel;

function isCarouselItem(elem) {
  return elem && elem.nodeName === 'DIV';
}

function nextSibling(item) {
  do {
    item = item.nextSibling;
  } while (item && !isCarouselItem(item));

  return item;
}

function prevSibling(item) {
  do {
    item = item.previousSibling;
  } while (item && !isCarouselItem(item))

  return item;
}

function Carousel(el, opts) {
  if (!(this instanceof Carousel)) return new Carousel(el, opts);
  opts = opts || {};
  this.el = el;
  classes(el).add('carousel');

  this._show(this.el.querySelector('.carousel > div'));
}

Carousel.prototype.forEach = function (cb) {
  var item = this.el.querySelector('div');
  while (item) {
    cb(item);
    item = nextSibling(item);
  }
}

Carousel.prototype.next = function () {
  var current = this.el.querySelector('.carousel-visible');
  var next = nextSibling(current);
  this._show(next);

  return next;
}

Carousel.prototype.prev = function () {
  var current = this.el.querySelector('.carousel-visible');
  var prev = prevSibling(current);
  this._show(prev);

  return prev;
}

Carousel.prototype._show = function (item) {
  if (!item) return;
  var next = nextSibling(item);
  var prev = prevSibling(item);

  this.forEach(function (ci) {
    classes(ci)
      .remove('carousel-next')
      .remove('carousel-prev')
      .remove('carousel-visible');
  });

  if (next) classes(next).add('carousel-next');
  if (prev) classes(prev).add('carousel-prev');
  classes(item).add('carousel-visible');
}


}, {"classes":5}],
5: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el) throw new Error('A DOM element reference is required');
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

}, {"indexof":6}],
6: [function(require, module, exports) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
}, {}],
4: [function(require, module, exports) {

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
}, {}]}, {}, {"1":"app"})
