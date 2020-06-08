import foreign 'lodash' as Lo


export (at head tail last flatten drop take map filter reduce append) where

at = n -> array -> Lo.nth array n

head = Lo.head
tail = Lo.tail
last = Lo.last
flatten = Lo.flatten

drop = n -> array -> Lo.drop array n
take = n -> array -> Lo.take array n


map = f -> array -> Lo.map array f
filter = f -> array -> Lo.filter array f
reduce = f -> array -> accumulator -> Lo.reduce array f accumulator

append = arr1 -> arr2 -> arr1 <> arr2