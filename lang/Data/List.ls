

export (
  empty, length, head, tail, init, last, elemAt, indexOf, exists,
  take, drop, slice, append, insertAt, delete, deleteAt, replace, replaceAt,
  map, fold, filter, flatten, flatMap, find, every, some, 
  dedup, reverse, sort, sortBy,
  union, difference, intersect, intersectBy, zip, zipWith,
  replicate, range
) where


empty = a -> a == []


log = f collection h tail x rest -> print <| "logging params:" <> f <> collection 


$with
  { h::tail = collection
  , x = f h
  , rest = map f tail
  }
@log
map = f -> collection -> if empty tail then collection else x::rest


@with h::tail = collection, value = f start h
fold = f -> start -> collection -> if empty tail then start else fold f value tail

@with fn = apply x
flap = x -> collection -> map fn collection


@with h::tail = collection, rest = filter predicate tail
filter = predicate -> collection -> if predicate h then h::rest else rest