/**
 * @file       src/index.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

type ExitFn = (...args: any[]) => void;
type ExitHandler = readonly [ExitFn, Parameters<ExitFn>];

const exitHandlers: ExitHandler[] = [];

process.on('exit', () => _run_exitfuncs());

/**
 * Clears all functions from the atexit call stack.
 */
function _clear()
{
    if (!exitHandlers.length) return;

    exitHandlers.splice(0, exitHandlers.length);
}

/**
 * Calls all functions in the atexit call stack then clears it.
 */
function _run_exitfuncs()
{
    if (!exitHandlers.length) return;

    for (let i = exitHandlers.length - 1; i >= 0; i--)
    {
        const [ fn, args ] = exitHandlers[i]!;

        try
        {
            fn(...args);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    _clear();
}

/**
 * @returns Number of functions in the atexit call stack.
 */
function _ncallbacks(): number
{
    return exitHandlers.length;
}

/**
 * Registers a function to the atexit call stack to be called at process termination.
 * 
 * @param fn Function to be added to the atexit call stack.
 * @param args Arguments to be passed to `fn`.
 */
function register<T extends ExitFn>(fn: T, ...args: Parameters<T>)
{
    exitHandlers.push([fn, args]);
}

/**
 * Unregisters all references of a function from the atexit call stack.
 * 
 * @param fn Function to be removed from the atexit call stack.
 */
function unregister(fn: ExitFn)
{
    if (!exitHandlers.length) return;

    for (let i = exitHandlers.length - 1; i >= 0; i--)
    {
        if (exitHandlers[i]![0] === fn)
            exitHandlers.splice(i, 1);
    }
}

export {
    _clear,
    _run_exitfuncs,
    _ncallbacks,
    register,
    unregister
}
