one = 1

three = one + 2

one + three

foo = { bar: { baz: 3 } }

foo.bar.baz

[1,2,3,4,5]

("x", "y")

identity = x -> x
add = x y -> x + y
mul = *

add 1 1



fac 
  | 0 -> 1
  | 0 y -> y
  | x 1 z -> x * z
  | 1 1 1 -> 0
  | x y z -> x + y + z
  | otherwise -> x * fac (x - 1)
