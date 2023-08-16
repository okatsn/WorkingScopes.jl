
Referring [Scope of Variables](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#scope-of-variables)


All variable lives in the name space of a certain module.


## Keynotes

- Global variable lives in module scope and [there is no all-encompassing global scope](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#Global-Scope).
- "in a scope, each variable can only have one meaning, and that meaning is determined regardless of the order of expressions"

## Examples

### Variable is not available in a parent-level scope 

`x` is created/modified as `local` if ...

```@repl

try
    x = 1
    @assert x == 1
catch e
    throw(e)
end

x

```


```@repl
for a = 1:3
    println("a is ", a)
end

a

```

### Can variable in a parent-level scope be modified? It depends.
#### In interactive context: `x` is modified


```@repl
x = "unmodified"

try
    x = 1
    @assert x == 1
catch e
    throw(e)
end

x
```

This feature allows [moving code back and forth between a function body and REPL when trying to debug](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#on-soft-scope).

#### In non-interactive context: you get a warning and `x` is not modified


```@repl
code = """
x = "unmodified"

try
    x = 1
    @assert x == 1
catch e
    throw(e)
end

println("x is ", x)
""";

include_string(@__MODULE__, code)
```

Noted that `x` remains `"unmodified"`; it is safe in non-interactive mode.


```@repl
code = """
x = "unmodified"

try
    println("x is ", x)
catch e
    throw(e)
end

""";

include_string(@__MODULE__, code)
```

You can see it.


#### Function "see" variable at where the function is defined

```@repl
use_a() = println("I'm inside `use_a`\n a + 0.1 = ", a + 0.1)

function mod_a()
    println("I'm inside `mod_a`")
    a = a + 0.1
    println("a = ", a)
end

a = 1

for a = 8:8
    println("a in for loop is ", a)
    use_a()
    mod_a()
end

a

```




## Soft scope

- `for`, `while`, `try` are soft. See [Scope constructs](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#man-scope-table).
- You can "see" variable outside the current soft scope; you can use it's value but assignment to it (the outsider) is not allowed, unless you are in a interactive context.

## Hard scope

Rules for hard scope is simple. Please refer to julia's documentation [variables and scoping/local scope](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#local-scope).
Here I'm showing some surprising examples:

```@repl b49w5d
module Hello
    function brutalredef(y)
        Hello.x = y
        return nothing
    end
    Hello.x = 4.99
end

using .Hello

Hello.x

Hello.brutalredef(12)

Hello.x
```

You can redefine variables/functions this way.

### Hard in hard

- *"the local scope of a for loop body is no different from the local scope of an inner function"*
- *"you can generally move code in or out of an inner function without changing its meaning"*
- `x = <value>` in hard scope: *"If `x` is not already a local variable and assignment occurs inside of any hard scope construct (i.e. within a let block, function or macro body, comprehension, or generator), a new local named x is created in the scope of the assignment"*



```@example
function sum_to_def_closure(n)
    function loop_body(i)
        t = s + i # new local `t`
        s = t # assign same local `s` as below
    end
    s = 0 # new local
    for i = 1:n
        loop_body(i)
    end
    return s, @isdefined(t)
end

sum_to_def_closure(10)
```



```@example
let n=10
    function loop_body(i)
        t = s + i # new local `t`
        s = t # assign same local `s` as below
    end
    s = 0 # new local
    for i = 1:n
        loop_body(i)
    end
    (s, @isdefined(t))
end
```



```@example
function sum_to_def_closure(n)
    s = 0
    let
      for i = 1:n
          t = s + i # new local `t`
          s = t # assign same local `s` as below
      end
    end
    return s, @isdefined(t)
end

sum_to_def_closure(10)
```

### Hard in soft

You should be ware of the warning!

```@example
code = """
s = try 
    n = 10
    s = 0 # new local
    function loop_body(i)
        t = s + i # new local `t`
        s = t # assign same local `s` as below
    end
    for i = 1:n
        loop_body(i)
    end
    s
catch e
    throw(e)
end

show(s)
"""

include_string(@__MODULE__, code)
```


!!! note "Explain"
    



### Hard in Module


```@repl
module SumDef
    s = 0
    function loop_body(i)
        t = s + i # new local `t`
        s = t # assign same local `s` as below
    end
    for i = 1:10
        loop_body(i)
    end
end

using .SumDef

SumDef.s
```

