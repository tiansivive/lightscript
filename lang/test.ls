

@derive Nat from Int 
: x -> x > 0

@type Nat -> Nat
fac = x -> match x
  | 0 -> 1
  | otherwise -> x * fac (x - 1)

fac 0
fac 4
fac 5


graph = -< (x)-[r]-(y) >-