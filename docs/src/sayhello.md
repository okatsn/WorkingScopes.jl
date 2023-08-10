

## Introduction

[`macro` returns *expression*](https://docs.julialang.org/en/v1/manual/metaprogramming/#man-macros), and the `ex::Expr` is executed in the scope just like `@eval(mod::Module, ex)` (`mod` can be `Main`).

```@example a789
macro f45()
    return quote
        x = 5 
        f(45)
    end
end
```

```@example a789
f = sin
@f45
```

```@example a789
f = tan
@f45
```

Although the returned expression can "see" the scope where the macro is defined, variable defined in expression won't contaminate the surrounded scope,
```@repl a789
@f45

x
```



## Use `macro` or `@eval`uate an *expression*

### *expression* is executed in the scope where the macro is defined

Execution of `macro` are isolated in the `module` where it is defined, just like a `function`.

As a consequence, [macro hygiene](https://docs.julialang.org/en/v1/manual/metaprogramming/#Hygiene) is easy to maintain, that 
it is generally safe to use macro defined in a clean `module`.

The *expression* returned by macro can "see" the surrounding scope (e.g., `Main`)

In this example, 
You can redefine variables in `HelloWorld`, and 

```@example cx7d
module HelloWorld
    f = sin

    macro definex(x)
        return quote
            HelloWorld.x = $x # This is the `x` in `definex(x)`
            HelloWorld.f = f
        end
    end

    macro f(x)
        return :(f($x))
    end

    HelloWorld.x = 5.99
end
```

```@example cx7d
using .HelloWorld

x = π/2
f = cos
```

`@f` takes `HelloWorld.f` (which is `sin`), not `f` of `Main` (`f = cos`):

```@example cx7d
HelloWorld.@f π/2
```

`@definex 0` redefine `HelloWorld.x = 0` and `HelloWorld.f` as the global `f` of `HelloWorld`:

```@example cx7d
HelloWorld.@definex 0
HelloWorld.x
```

```@example cx7d
HelloWorld.f
```

They are not interacted with the `x` and `f` of the scope that calls the macro at all.

```@example cx7d
(x, f)
```

No matter whether `@definex` is `export`ed or not:

```@repl 
module HelloWorld
    f = sin

    macro definex(x)
        return quote
            HelloWorld.x = $x # This is the `x` in `definex(x)`
            HelloWorld.f = f
            f2($x)
        end
    end

    macro f(x)
        return :(f($x))
    end

    HelloWorld.x = 5.99
    export @definex
end

using .HelloWorld

x = π/2; f = cos; f2 = tan;

HelloWorld.@f π/2

@definex 0

HelloWorld.x

HelloWorld.f

(x, f)
```

!!! tip "Summary"
    - Expression returned by `macro` is executed in the scope where the `macro` is defined, **NOT** where the the `macro` is called.
    - This is evident as `@definex` use `f` defined in `module HelloWorld ... end`, and `f2` is unseen.


Use `esc` to escape the expression from the scope of `HelloWorld`, that `f2` can thus be seen:

```@repl 
module HelloWorld
    macro f(x)
        return :(f($x))
    end
    export @f
end

using .HelloWorld

f = sin

@f 5
```

```@repl 
module HelloWorld
    macro f(x)
        expr = :(f($x))
        return :($(esc(expr)))
    end
    export @f
end

using .HelloWorld

f = sin

@f 5
```

### The same result/utility can be achieved with `function` using `@eval`:

```@example as5w
module HelloWorld
    f = sin

    function definex(x)
        ex = quote
            HelloWorld.x = $x
            HelloWorld.sinx = f($x)
        end
        @eval $ex
    end

    HelloWorld.x = 5.99
    HelloWorld.sinx = f(x)
end
HelloWorld.sinx
```

```@example as5w
HelloWorld.definex(0)
x = 5
HelloWorld.x
```

```@example as5w
HelloWorld.sinx
```


### Be ware of the difference between `@eval ex` and `@eval $ex`

```@example afd8s
f = sin
x = 0
ex = quote
    x = $x
    sinx = f($x)
end
```



```@repl afd8s
@eval ex
@macroexpand @eval ex
sinx
```

The `ERROR: UndefVarError: 'sinx' not defined` occurred since `ex` is passed to `@eval` as `Symbol`; thus, nothing executed. 
Noted that `ERROR: UndefVarError: 'ex' not defined` won't be raised when `ex` is not defined!


```@repl afd8s
@eval $ex
@macroexpand @eval $ex
sinx
```



## Reference

[Emma Boudreau - Metaprogramming in Julia: A Full Overview](https://towardsdatascience.com/metaprogramming-in-julia-a-full-overview-2b4e811f1f77)

## Tips

!!! tip "Tips"
    - Multiline `quote ... end` is in fact `Expr(:block, ex1, ex2, ...)`
    - `esc` escape `ex::Expr` from macro expansion; it is used to "violate" macro hygiene when necessary. See [Metaprogramming/#Hygiene](https://docs.julialang.org/en/v1/manual/metaprogramming/#Hygiene).
    - `macroexpand` and `@macroexpand` is very useful in debugging. See [metaprogramming/#Hold-up:-why-macros?](https://docs.julialang.org/en/v1/manual/metaprogramming/#Hold-up:-why-macros?)

## Example 

### Say Hello
#### the say-hello function
```@docs
WorkingScopes.sayhello3
```

#### The say-hello macro built upon
```@docs
WorkingScopes.@sayhello3
```
