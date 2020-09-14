"use strict";

var _nearley = require("nearley");

var _fs = require("fs");

var _evaluation = require("./evaluation");

var _lightscript = _interopRequireDefault(require("../bin/lightscript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a Parser object from our grammar.
const parser = new _nearley.Parser(_nearley.Grammar.fromCompiled(_lightscript.default));
const code = (0, _fs.readFileSync)('lang/test.ls').toString();
parser.feed(code);
const ast = parser.results[0];
const ambiguity = parser.results.length;
const res = (0, _evaluation.evaluate)(ast, {
  identifiers: []
});
console.log('Ambiguity:', ambiguity);
console.log('AST');
console.log(ast);
console.log('Evaluated:');
console.log('scope:', res.scope);
console.log('results:', res.value);
if (ambiguity > 1) console.log('Parsing is ambiguous, make sure everything is OK! maybe throw some errors?');