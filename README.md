<div align="center">
    <h1>atexit</h1>
    <h4>Register functions to be called at process termination</h4>
    <p>
        <a href="https://github.com/BChristieDev/atexit/actions/workflows/ci.yml"><img src="https://github.com/BChristieDev/atexit/actions/workflows/ci.yml/badge.svg"></a>
        <a href="https://www.npmjs.com/package/atexit"><img src="https://badge.fury.io/js/atexit.svg"></a>
    </p>
    <p>
        <a href="#install">Install</a> •
        <a href="#functions">Functions</a> •
        <a href="#examples">Examples</a> •
        <a href="#maintainers">Maintainers</a> •
        <a href="#contributing">Contributing</a> •
        <a href="#license">License</a>
    </p>
</div>

## Install

```sh
$ npm i atexit
```

## Functions

```ts
atexit.register(func, ...args)
```

Registers a function to the atexit call stack to be called at process termination.

- `func`: function to be added to atexit call stack.
- `...args`: arguments to be passed to `func`.<br><br>

```ts
atexit.unregister(func)
```

Unregisters all references of a function from the atexit call stack.

- `func`: function to be removed from the atexit call stack.<br><br>

```ts
atexit._clear()
```

Clears all functions from the atexit call stack.<br><br>

```ts
atexit._run_exitfuncs()
```

Calls all functions in the atexit call stack then clears it.<br><br>

```ts
atexit._ncallbacks()
```

Returns number of function in the atexit call stack.

## Examples

### Register

```ts
atexit.register(console.log, 1);
atexit.register(console.log, 2);
atexit.register(console.log, 3);
```

Outputs:

```sh
3
2
1
```

### Unregister

```ts
atexit.register(console.log, 1);
atexit.register(console.error, 2);
atexit.register(console.log, 3);

atexit.unregister(console.log);
```

Outputs:

```sh
2
```

## Maintainers

[@BChristieDev](https://github.com/BChristieDev)

## Contributing

PRs accepted.

## License

[MIT](LICENSE) © Brandon Christie
