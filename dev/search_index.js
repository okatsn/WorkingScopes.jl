var documenterSearchIndex = {"docs":
[{"location":"sayhello/#Macro:-create-*expression*-to-be-executed-in-its-surrounded-scope","page":"Macro call explained","title":"Macro: create expression to be executed in its surrounded scope","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"The use of macro is confusing. Thus, I made an exemplary @sayhello3 to help me understand.","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"macro returns expression, and the ex::Expr is executed in the scope just like @eval(mod::Module, ex) (mod can be Main).","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"ex::Expr uses the surrounded scope (lexical scope):","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"macro f45()\n    x = 5\n    return :(f(45))\nend","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"f = sin\n@f45","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"f = tan\n@f45","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"Variable defined in expression won't contaminate the surrounded scope,","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"@f45\n\nx","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"unless","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"module Hello\n    macro f45brutal()\n        Hello.x = 5\n        return :(f(45))\n    end\n    Hello.x = 4.99\nend","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"\nHello.x\n\nHello.@f45brutal\n\nHello.x","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"Error occurred in Hello.@f45brutal because Hello.f is not defined. Noted that this is true for Main scope; yuo can redefine variables/functions under the Main scope this way.","category":"page"},{"location":"sayhello/#Reference","page":"Macro call explained","title":"Reference","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"Emma Boudreau - Metaprogramming in Julia: A Full Overview","category":"page"},{"location":"sayhello/#Tips","page":"Macro call explained","title":"Tips","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"tip: Tips\nMultiline quote ... end is in fact Expr(:block, ex1, ex2, ...)\nesc escape ex::Expr from macro expansion; it is used to \"violate\" macro hygiene when necessary. See Metaprogramming/#Hygiene.\nmacroexpand and @macroexpand is very useful in debugging. See metaprogramming/#Hold-up:-why-macros?","category":"page"},{"location":"sayhello/#Use-macro-or-@evaluate-an-*expression*","page":"Macro call explained","title":"Use macro or @evaluate an expression","text":"","category":"section"},{"location":"sayhello/#It-is-generally-safe-to-use-macro-defined-in-a-clean-module.","page":"Macro call explained","title":"It is generally safe to use macro defined in a clean module.","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"module HelloWorld\n    f = sin\n\n    macro definex(x)\n        return quote\n            HelloWorld.x = $x\n            HelloWorld.sinx = f($x)\n        end\n    end\n\n    HelloWorld.x = 5.99\n    HelloWorld.sinx = f(x)\nend","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.x","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.sinx","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"x = 5\nf = cos\nf(x)","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.@definex 0\nHelloWorld.x","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.sinx","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"x","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"tip: Tip\nExpression returned by macro is executed under the scope that the macro is defined.Noted that in @definex use f defined in module HelloWorld ... end","category":"page"},{"location":"sayhello/#The-same-result/utility-can-be-achieved-with-function-using-@eval:","page":"Macro call explained","title":"The same result/utility can be achieved with function using @eval:","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"module HelloWorld\n    f = sin\n\n    function definex(x)\n        ex = quote\n            HelloWorld.x = $x\n            HelloWorld.sinx = f($x)\n        end\n        @eval $ex\n    end\n\n    HelloWorld.x = 5.99\n    HelloWorld.sinx = f(x)\nend\nHelloWorld.sinx","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.definex(0)\nx = 5\nHelloWorld.x","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"HelloWorld.sinx","category":"page"},{"location":"sayhello/#Be-ware-of-the-difference-between-@eval-ex-and-@eval-ex","page":"Macro call explained","title":"Be ware of the difference between @eval ex and @eval $ex","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"f = sin\nx = 0\nex = quote\n    x = $x\n    sinx = f($x)\nend","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"@eval ex\n@macroexpand @eval ex\nsinx","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"The ERROR: UndefVarError: 'sinx' not defined occurred since ex is passed to @eval as Symbol; thus, nothing executed.  Noted that ERROR: UndefVarError: 'ex' not defined won't be raised when ex is not defined!","category":"page"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"@eval $ex\n@macroexpand @eval $ex\nsinx","category":"page"},{"location":"sayhello/#Example","page":"Macro call explained","title":"Example","text":"","category":"section"},{"location":"sayhello/#Say-Hello","page":"Macro call explained","title":"Say Hello","text":"","category":"section"},{"location":"sayhello/#the-say-hello-function","page":"Macro call explained","title":"the say-hello function","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"WorkingScopes.sayhello3","category":"page"},{"location":"sayhello/#WorkingScopes.sayhello3","page":"Macro call explained","title":"WorkingScopes.sayhello3","text":"sayhello3(name) = \"Hello world! $name\", an example to understand metaprogramming.\n\n\n\n\n\n","category":"function"},{"location":"sayhello/#The-say-hello-macro-built-upon","page":"Macro call explained","title":"The say-hello macro built upon","text":"","category":"section"},{"location":"sayhello/","page":"Macro call explained","title":"Macro call explained","text":"WorkingScopes.@sayhello3","category":"page"},{"location":"sayhello/#WorkingScopes.@sayhello3","page":"Macro call explained","title":"WorkingScopes.@sayhello3","text":"macro sayhello3(str::String)\n    return Expr(:block, :(sayhello3($str)))\nend\n\nExample\n\nWorkingScopes.@sayhello3 \"Bruce Willey\"\n\n# output\n\"Hello world! Bruce Willey\"\n\n\n\n\n\nmacro sayhello3(ex::Expr)\n    return Expr(:block, :(sayhello3($(last(ex.args)))))\nend\n\nExample: variable name is not defined in macro's scope\n\nname = \"Bruce Willey\"\n\n# output\n\"Bruce Willey\"\n\njulia> WorkingScopes.@sayhello3 $name\nERROR: UndefVarError: `name` not defined\n\ntip: Explain\nname is passed as expression in this case, and it is not defined since macro dispatch is not based on the AST evaluated at runtime. Thus an error of UndefVarError is raised.\nSee Macros and dispatch for more information.\n\nExample: a creative application\n\nWorkingScopes.@sayhello3 name = \"Bruce Willey\"\n\n# output\n\"Hello world! Bruce Willey\"\n\ntip: Explain\nIn this example, the last argument of the expression name = \"Bruce Willey\" is \"Bruce Willey\".\n\nExample 3: Use @eval if you want name be evaluated\n\n@eval WorkingScopes.@sayhello3 $name\n\n# output\n\"Hello world! Bruce Willey\"\n\ntip: Explain\n@eval evalute the expression @sayhello3 $name at runtime.\nThus, the argument for @sayhello3 is evaluated as String, and @sayhello3(str::String) is the dispatched method.\n\n\n\n\n\nmacro sayhello3(symb::Symbol)\n    return Expr(:block, :(sayhello3($(string(symb)))))\nend\n\nExample: A single the runtime variable is rendered as Symbol\n\nname = \"Bruce Willey\"\nWorkingScopes.@sayhello3 name\n\n# output\n\"Hello world! name\"\n\n\n\n\n\n","category":"macro"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = WorkingScopes","category":"page"},{"location":"#WorkingScopes","page":"Home","title":"WorkingScopes","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"WorkingScopes.jl has no utility; it is merely a package of working examples for demonstration and experiments to understand Scope of Variables as well as Metaprogramming in julia programming.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Documentation for WorkingScopes.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [WorkingScopes]","category":"page"},{"location":"#WorkingScopes.sayhello3-Tuple{Any}","page":"Home","title":"WorkingScopes.sayhello3","text":"sayhello3(name) = \"Hello world! $name\", an example to understand metaprogramming.\n\n\n\n\n\n","category":"method"},{"location":"#WorkingScopes.@sayhello3-Tuple{Expr}","page":"Home","title":"WorkingScopes.@sayhello3","text":"macro sayhello3(ex::Expr)\n    return Expr(:block, :(sayhello3($(last(ex.args)))))\nend\n\nExample: variable name is not defined in macro's scope\n\nname = \"Bruce Willey\"\n\n# output\n\"Bruce Willey\"\n\njulia> WorkingScopes.@sayhello3 $name\nERROR: UndefVarError: `name` not defined\n\ntip: Explain\nname is passed as expression in this case, and it is not defined since macro dispatch is not based on the AST evaluated at runtime. Thus an error of UndefVarError is raised.\nSee Macros and dispatch for more information.\n\nExample: a creative application\n\nWorkingScopes.@sayhello3 name = \"Bruce Willey\"\n\n# output\n\"Hello world! Bruce Willey\"\n\ntip: Explain\nIn this example, the last argument of the expression name = \"Bruce Willey\" is \"Bruce Willey\".\n\nExample 3: Use @eval if you want name be evaluated\n\n@eval WorkingScopes.@sayhello3 $name\n\n# output\n\"Hello world! Bruce Willey\"\n\ntip: Explain\n@eval evalute the expression @sayhello3 $name at runtime.\nThus, the argument for @sayhello3 is evaluated as String, and @sayhello3(str::String) is the dispatched method.\n\n\n\n\n\n","category":"macro"},{"location":"#WorkingScopes.@sayhello3-Tuple{String}","page":"Home","title":"WorkingScopes.@sayhello3","text":"macro sayhello3(str::String)\n    return Expr(:block, :(sayhello3($str)))\nend\n\nExample\n\nWorkingScopes.@sayhello3 \"Bruce Willey\"\n\n# output\n\"Hello world! Bruce Willey\"\n\n\n\n\n\n","category":"macro"},{"location":"#WorkingScopes.@sayhello3-Tuple{Symbol}","page":"Home","title":"WorkingScopes.@sayhello3","text":"macro sayhello3(symb::Symbol)\n    return Expr(:block, :(sayhello3($(string(symb)))))\nend\n\nExample: A single the runtime variable is rendered as Symbol\n\nname = \"Bruce Willey\"\nWorkingScopes.@sayhello3 name\n\n# output\n\"Hello world! name\"\n\n\n\n\n\n","category":"macro"}]
}
