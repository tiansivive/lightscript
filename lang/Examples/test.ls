import 'lang/Data/List.ls' as List

export (one f g fg) where


one = 1

f = x -> x + one

g = y -> y * 2

fg = f << g