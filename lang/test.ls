one = 1

three = one + 2

one + three

foo = { bar: { baz: 3 } }

foo.bar.baz

[1,2,3,4,5]

("x", "y")

identity = x -> x
add = x y -> x + y

curryAdd = x -> y -> z -> x + y + z

add 1 1
curryAdd 1 2 3