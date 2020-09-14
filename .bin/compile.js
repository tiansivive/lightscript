"use strict";

var _fs = require("fs");

var _nearley = require("nearley");

var _index = require("./compilation/index");

var _lightscript = _interopRequireDefault(require("../bin/lightscript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a Parser object from our grammar.
const parser = new _nearley.Parser(_nearley.Grammar.fromCompiled(_lightscript.default));
const code = (0, _fs.readFileSync)('lang/Examples/test.ls').toString();
parser.feed(code);
const ast = parser.results[0];
const ambiguity = parser.results.length;
const initialScope = {
  identifiers: []
};
const generate = (0, _index.compile)(initialScope);
const js = generate(ast);
console.log('Ambiguity:', ambiguity);
console.log('AST');
console.log(ast);
console.log('Compiled:');
(0, _fs.writeFileSync)('lang/out/test.js', js.join(';\n') + ';');
console.log('Finished Compiling JS!');
if (ambiguity > 1) console.log('Parsing is ambiguous, make sure everything is OK! maybe throw some errors?');