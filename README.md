# Require or disallow unassigned functions to be named inline
This plugin tries to implement JSCS `require(/disallow)NamedUnassignedFunctions` rule in ESLint.

Basically it requires all functions that are unassigned (mostly "callback" functions) to be named.
This rule can be seen as an enhancement to the `func-names` rule in ESLint with the `as-needed` option, the main
difference is that `func-names` with `as-needed` option will error on the code below while this extension will not.
```js
Foo.prototype.bar = function() {};
```

#Usage
## Installation
`npm i eslint-plugin-named-unassigned-functions --save-dev`
## Configure
In eslint config file (`eslintrc.json`) add this plugin:
```
"plugins": [
    "named-unassigned-functions"
]
```
