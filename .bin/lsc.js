"use strict";

var _glob = _interopRequireDefault(require("glob"));

var _fs = require("fs");

var _nearley = require("nearley");

var _index = require("./compilation/index");

var _lightscript = _interopRequireDefault(require("../bin/lightscript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a Parser object from our grammar.
const parser = new _nearley.Parser(_nearley.Grammar.fromCompiled(_lightscript.default));
const initialScope = {
  identifiers: []
};
process.argv.forEach(a => console.log(a));
const directory = process.cwd() + '/' + process.argv[2];

const outputDir = (_ => {
  const i = process.argv.findIndex(arg => arg.match('-o'));
  if (i < 0) return directory;
  return process.cwd() + '/' + process.argv[i + 1];
})();

console.log('dir', directory);
console.log('outDir', outputDir);

const replaceExtension = file => file.replace('.ls', '.js');

(0, _glob.default)(`**/*.ls`, {
  cwd: directory
}, (e, files) => {
  console.log('files', files);
  const promises = files.map(file => {
    console.log('compiling', file);
    return new Promise((resolve, reject) => (0, _fs.readFile)(directory + '/' + file, (err, data) => {
      if (err) return reject(err);
      const code = data.toString();
      parser.feed(code);
      const ast = parser.results[0];
      const generate = (0, _index.compile)(initialScope);
      const js = generate(ast);
      (0, _fs.writeFile)(outputDir + '/' + replaceExtension(file), js.join(';\n') + ';', err => err ? reject(err) : resolve(true));
    }));
  });
  Promise.all(promises).then(_ => console.log('FINISHED COMPILING!'));
});