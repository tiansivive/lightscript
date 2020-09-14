"use strict";

var _readline = _interopRequireDefault(require("readline"));

var _nearley = require("nearley");

var _evaluation = require("./evaluation/evaluation");

var _lightscript = _interopRequireDefault(require("../bin/lightscript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const grammar = _nearley.Grammar.fromCompiled(_lightscript.default);

let scope = {
  identifiers: []
};
let parser = new _nearley.Parser(grammar);

const rl = _readline.default.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let input = '';
rl.prompt();
rl.on('line', line => {
  if (line.startsWith('@')) {
    input += line + '\n';
    rl.prompt();
    return;
  }

  input += line;
  parser = new _nearley.Parser(grammar);
  parser.feed(input);
  const ast = parser.results[0];
  const ambiguity = parser.results.length;

  try {
    const res = (0, _evaluation.evaluate)(ast, scope);
    scope = res.scope;
    process.env.DEBUG ? console.log('\nEval:\n', res.value[0]) : console.log(res.value[0]);
    if (process.env.DEBUG) console.log('scope:', res.scope, '\n-------------------\n');
  } catch (err) {
    console.error(err.message);
  } finally {
    input = '';
    rl.prompt();
  }
});