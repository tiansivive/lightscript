import foreign 'lodash' as Lo


export (at head tail last flatten drop take map filter reduce append lmap) where

at = n -> array -> Lo.nth array n

head = Lo.head
tail = Lo.tail
last = Lo.last
flatten = Lo.flatten
length = Lo.size
empty = length >> (==0)

drop = n -> array -> Lo.drop array n
take = n -> array -> Lo.take array n


map = f -> array -> Lo.map array f
filter = f -> array -> Lo.filter array f
reduce = f -> array -> accumulator -> Lo.reduce array f accumulator

append = e -> array -> array <> [e]

@let (h = Lo.head collection, t = Lo.tail collection, x = f h, rest = lmap f tail)
lmap = f -> collection -> if empty t then collection else append x rest