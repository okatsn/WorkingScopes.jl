
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

