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


result = do
  error <- do
    val <- asyncRequest data 
    log val
    list <- getItems val
    stringify list
  log error
  stringify error





#@ is basically this: f -> args -> fn -> f (...(concat args (fn f args)))  
# it's an aliased ehaviour because we want to inject some behaviour into a function without altering its signature

@let (h = head collection, t = tail collection, x = f h, rest = map f tail)
map = f -> collection -> if empty t then collection else x <> rest


@let constant = 2
model = x + constant


let = _ -> [2] 
@let x = 1
add1 = y -> y + x


actor editableInput = model -> do
  :READ -> model.display

  @display
    :EDIT -> @editing

  @editing
    :CLEAR -> @ { content: '' }
    :SAVE -> @display { display: model.content }


       
    
  
    