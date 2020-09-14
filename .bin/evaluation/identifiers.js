"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = void 0;

const find = (identifier, scope) => {
  const found = scope.identifiers.find(({
    id
  }) => id === identifier);
  if (!found) throw new Error(`Undefined identifier ${identifier}`);
  return found;
};

exports.find = find;