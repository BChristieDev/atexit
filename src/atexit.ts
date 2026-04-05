/**
 * @file       src/atexit.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

type ExitFunc = (...args: any[]) => void;
type ExitHandler<T extends ExitFunc> = readonly [T, Parameters<T>];

const exitHandlers: ExitHandler<any>[] = [];

process.on('exit', () => _run_exitfuncs);

function _clear()
{
    if (!exitHandlers.length) return;

    exitHandlers.splice(0, exitHandlers.length);
}

function _run_exitfuncs()
{
    if (!exitHandlers.length) return;

    for (let i = exitHandlers.length - 1; i >= 0; i--)
    {
        const [ func, args ] = exitHandlers[i]!;

        try
        {
            func(...args);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    _clear();
}

function _ncallbacks(): number
{
    return exitHandlers.length;
}

function register<T extends ExitFunc>(func: T, ...args: Parameters<T>)
{
    exitHandlers.push([func, args]);
}

function unregister(func: ExitFunc)
{
    if (!exitHandlers.length) return;

    for (let i = exitHandlers.length - 1; i >= 0; i--)
    {
        if (exitHandlers[i]![0] === func)
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
