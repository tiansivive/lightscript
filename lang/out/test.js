const f = (x) => (y) => x + y;
const g = f(1);
const h = (f(1))(1);
export {h};