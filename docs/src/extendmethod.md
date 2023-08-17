
## Extend methods

### Example

```@repl
module Foo
    hello() = "Hello!"
end

module Bar
    using ..Foo
    Foo.hello(name) = "Hello, $name."
    println(Foo.hello())
end

using .Bar
using .Foo
methods(Foo.hello)
```


### Example2

```@repl
module Foo
    hello() = "Hello!"
end

module Bar
    using ..Foo
    hello = Foo.hello
    Bar.hello(name) = "Hello, $name."
end

using .Bar
methods(Bar.hello)

using .Foo
methods(Foo.hello)
```
