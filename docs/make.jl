using WorkingScopes
using Documenter

DocMeta.setdocmeta!(WorkingScopes, :DocTestSetup, :(using WorkingScopes); recursive=true)

makedocs(;
    modules=[WorkingScopes],
    authors="okatsn <okatsn@gmail.com> and contributors",
    repo="https://github.com/okatsn/WorkingScopes.jl/blob/{commit}{path}#{line}",
    sitename="WorkingScopes.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://okatsn.github.io/WorkingScopes.jl",
        edit_link="main",
        assets=String[]
    ),
    pages=[
        "Home" => "index.md",
        "Metaprogramming" =>
            ["Macro call explained" => "sayhello.md"],
        "Variable Scope" =>
            ["Scope constructs" => "scopeconstruct.md",
                "Import and Using" => "importusing.md",
                "Extend methods" => "extendmethod.md"
            ]
    ]
)

deploydocs(;
    repo="github.com/okatsn/WorkingScopes.jl",
    devbranch="main"
)
