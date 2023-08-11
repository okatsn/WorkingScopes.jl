
Referring [Scope of Variables](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#scope-of-variables)


All variable lives in the name space of a certain module.


## Keynotes

- Global variable lives in module scope and [there is no all-encompassing global scope](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#Global-Scope).
- "in a scope, each variable can only have one meaning, and that meaning is determined regardless of the order of expressions"


## Soft scope

`for`, `while`, `try` are soft.

### Cases where `global x` will not modified

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
x = 5

try
    x = 1
    @assert x == 1
catch e
    throw(e)
end

x

```

### Will `global x` will be modified?

#### In interactive context: global `x` is modified

Global `x` (the `x=5` one) **is** assigned. 
This feature allows [moving code back and forth between a function body and REPL when trying to debug](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#on-soft-scope).


```@repl
x = 5

try
    x = 1
    x = x + 1
    @assert x == 2
catch e
    throw(e)
end

x

```

#### In non-interactive context: you get a warning

Global `x` (the `x=5` one) **is NOT** assigned!

```@example a789
code = """
x = 5

try
    x = 1
    x = x + 1
    @assert x == 2
catch e
    throw(e)
end
"""

include_string(@__MODULE__, code)

```

The `x` of `x = 5`  remains safe!

```@repl a789
x 
```

You can disambiguate by using `local x = 1` to suppress this warning.


### Brief summary

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

