# import foreign (map, fold, filter) 'lodash' as Lo
import foreign 'lodash' as Lo


export (map, fold, filter)


at = index -> array -> Lo.nth array n

map = f -> array -> Lo.map array f
filter = f -> array -> Lo.filter array f
reduce = f -> array -> accumulator -> Lo.reduce array f accumulator