const f = (x) => x + 2;
const g = (y) => y * 2;
const h = (z) => z / 2;
const k = (w) => w + 5;
const gf = ((...args) => { return f(g(...args)) });
const fg = ((...args) => { return g(f(...args)) });
const fgh = ((...args) => { return f(((...args) => { return g(h(...args)) })(...args)) });
const hgf = ((...args) => { return ((...args) => { return f(g(...args)) })(h(...args)) });
const fghk = ((...args) => { return f(((...args) => { return g(((...args) => { return h(k(...args)) })(...args)) })(...args)) });
const fghk2 = ((...args) => { return ((...args) => { return ((...args) => { return k(h(...args)) })(g(...args)) })(f(...args)) });
const khgf = ((...args) => { return ((...args) => { return ((...args) => { return f(g(...args)) })(h(...args)) })(k(...args)) });
fghk(10);
khgf(10);
const fac = (x) => (_ => { 
        const __val__ = x;
        switch(true){ case ((0) === __val__): return x;case ((1) === __val__): return x; default: return x * fac((x - 1)) }
    })();



    console.log(fac(4))