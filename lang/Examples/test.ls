

f = x -> x + 2
g = y -> y * 2
h = z -> z / 2
k = w -> w + 5

gf = f << g
fg = f >> g

fgh = f << g << h
hgf = h >> g >> f

fghk = f << g << h << k
fghk2 = f >> g >> h >> k

khgf = k >> h >> g >> f


fghk 10

khgf 10

fac = x -> match x
    | 0 -> x
    | 1 -> x
    | otherwise -> x * fac (x - 1)