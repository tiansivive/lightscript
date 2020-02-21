fac = x -> match x
  | 0 -> 1
  | otherwise -> x * fac (x - 1)

fac 0
fac 4
fac 5


graph = -< (a:Label)-[r]->(b:Some), (c)<-[r]-(d:Some) , (e:Label)-[r]-(f:Other), (g:Some)-[r]->(h) >- |- (x:Other)-[rel]-(y)

pat = (xx)-[rr]-(yy)

