import foreign 'lodash' as Lo


export (at map filter reduce) where


at = n array -> Lo.nth array n

map = f -> array -> Lo.map array f
filter = f -> array -> Lo.filter array f
reduce = f -> array -> accumulator -> Lo.reduce array f accumulator