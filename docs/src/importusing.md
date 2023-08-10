
## Import and Using

### Example 1: Variable of the same name are separated by module

```@example foobar123
module Bar
    x = 1
    foo() = x
    export foo
end
```


```@repl foobar123

import .Bar

foo()

x = -1;

Bar.foo()

Bar.x

```

### Example 2: 

```@example foobar456
module Bar2
    x = 1
    foo() = x
    export foo
    export x # note the difference
end
```


```@repl foobar456

using .Bar2

x

x = -1

foo()
```

### Difference between `using` and `import`

#### Extensibility of function

- Function are extensible under the introduced module (e.g., `Bar`) for both `using` and `import` cases.
- Only explicitly `import`ed function is extensible in the current module (`@__MODULE__`, e.g., `Main`).
- Also see this [post](https://stackoverflow.com/a/61072552).

##### `import` case

```@repl foobar123
import .Bar

Bar.foo

Bar.foo(y) = Bar.x + y 

Bar.x = 999

Bar.foo(3)
```

##### `using` case

```@repl foobar456
using .Bar2

Bar2.foo(y) = Bar2.x + y; Bar2.x = 999; foo(3)

foo(y) = Bar2.x + y
```


### Where does imported variable points to?

#### The `import` case

- `x` `import`ed to the current module (`@__MODULE__`) points to `Bar3.x`.
- You cannot assign `x` in the current module.

```@example foo789
module Bar3
    x = 1
    foo() = x
    export x
    export foo
end
```


```@repl foo789

import .Bar3: foo, x

foo(y) = x + y

x = 9

foo(3)

Bar3.x = 333

x

foo(3)

Bar3.x === x
```

#### The `using` case

```@example foo78910
module Bar4
    x = 1
    foo() = x
    export x
    export foo
end
```


```@repl foo78910
using .Bar4

Bar4.foo(y) = x + y

x = 9.12

Bar4.x === x

foo(3)
```

The behavior is strange, that the first call of `x` does matter.

```@repl foo7891011
module Bar4
    x = 1
    foo() = x
    export x
    export foo
end

using .Bar4

x

Bar4.x === x

x = 9.12
```

