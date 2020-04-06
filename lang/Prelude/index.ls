

export (apply, flip, map, fold, flap, filter) where






apply = x -> f -> f x
flip = f -> y x -> f x y
flipCurried = f -> y -> x -> f x y

@let h::tail = collection, x = f h, rest = map f tail
map = f -> collection -> if empty tail then collection else x::rest


@let h::tail = collection, value = f start h
fold = f -> start -> collection -> if empty tail then start else fold f value tail

@let fn = apply x
flap = x -> collection -> map fn collection


@let h::tail = collection, rest = filter predicate tail
filter = predicate -> collection -> if predicate h then h::rest else rest