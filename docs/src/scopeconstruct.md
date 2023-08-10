
Referring [Scope of Variables](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#scope-of-variables)


All variable lives in the name space of a certain module.


## Global

Global variable lives in module scope and [there is no all-encompassing global scope](https://docs.julialang.org/en/v1/manual/variables-and-scoping/#Global-Scope).

## Soft and hard

### Case: `global x` not modified

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

### Case: `global x` modified

`x` is modified as `local` if ...

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


```@example a789
x
```