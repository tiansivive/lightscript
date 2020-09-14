"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationship = exports.node = exports.create = void 0;

var _evaluation = require("../evaluation");

const create = ({
  type,
  value
}, scope) => ({
  type,
  value: value.map(({
    first,
    second,
    edge
  }, i) => `${node(first)}${relationship(edge)}${i === value.length - 1 ? node(second) : ''}`).join(''),
  subPatterns: value.map(({
    first,
    second,
    edge
  }, i) => ({
    value: `${node(first)}${relationship(edge)}${node(second)}`,
    first,
    second,
    edge
  })),
  closure: scope
});

exports.create = create;

const node = ({
  value,
  labels
}, scope) => {
  if (value.type !== 'identifier') throw new Error('Node in pattern is not an Identifier.');
  return `(${[value.value, ...labels].join(':')})`;
};

exports.node = node;

const relationship = ({
  direction,
  value,
  labels
}, scope) => {
  if (value.type !== 'identifier') throw new Error('Relationship in pattern is not an Identifier.');

  switch (direction) {
    case 'outgoing':
      return `-[${[value.value, ...labels].join(':')}]->`;

    case 'incoming':
      return `<-[${[value.value, ...labels].join(':')}]-`;

    case 'bilateral':
      return `-[${[value.value, ...labels].join(':')}]-`;
  }
};

exports.relationship = relationship;