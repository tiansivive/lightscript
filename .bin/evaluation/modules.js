"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importer = void 0;

var _evaluation = require("./evaluation");

var _ffi = require("./ffi");

var _nearley = require("nearley");

var _fs = require("fs");

var _lightscript = _interopRequireDefault(require("../bin/lightscript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseFile = (file, scope) => {
  const parser = new _nearley.Parser(_nearley.Grammar.fromCompiled(_lightscript.default));
  const code = (0, _fs.readFileSync)(file).toString();
  parser.feed(code);
  const ast = parser.results[0];
  const ambiguity = parser.results.length;
  const res = (0, _evaluation.evaluate)(ast, scope);

  if (process.env.DEBUG) {
    console.log(`-------------- BEGIN DEBUG FILE PARSING: ${file} --------------`);
    console.log('Ambiguity:', ambiguity);
    console.log('AST');
    console.log(ast);
    console.log('Evaluated:');
    console.log('scope:', res.scope);
    console.log('results:', res.value);
    if (ambiguity > 1) console.log('Parsing is ambiguous, make sure everything is OK! maybe throw some errors?');
    console.log(`-------------- END DEBUG FILE PARSING: ${file} --------------`);
  }

  return res;
};

const importFromJS = (id, path, scope) => {
  const module = require(process.cwd() + '/' + path);

  const value = Object.keys(module).reduce((obj, key) => ({ ...obj,
    [key]: {
      jsVal: module[key],
      ..._ffi.transforms.fromJS(module[key])
    }
  }), {});
  return {
    value,
    scope: {
      identifiers: scope.identifiers.concat([{
        id: id.value,
        value,
        foreign: true
      }])
    }
  };
};

const importer = ({
  id,
  path,
  foreign
}, scope) => {
  if (foreign) return importFromJS(id, path, scope);
  const imported = parseFile(path, scope);
  const alias = imported.scope.identifiers.reduce((a, {
    id,
    value
  }) => ({ ...a,
    [id]: value
  }), {});
  return {
    value: imported.value,
    scope: {
      identifiers: scope.identifiers.concat([{
        id: id.value,
        value: alias
      }])
    }
  };
};

exports.importer = importer;