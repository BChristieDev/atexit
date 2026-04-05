/**
 * @file       tests/unregister.spec.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

import assert from 'assert/strict';
import { test } from 'node:test';
import { _ncallbacks, _run_exitfuncs, register, unregister } from '../src/atexit.js';

test('Unregister an exit handler', () => {
    const foo = [ false ];
    const bar = [ false ];
    const baz = [ false ];
    const quux = [ false ];
    const quuux = [ false ];

    function setFoo(value: boolean) { foo[0] = value; }
    function setBar(value: boolean) { bar[0] = value; }
    function setBaz(value: boolean) { baz[0] = value; }
    function setQuux(value: boolean) { quux[0] = value; }
    function setQuuux(value: boolean) { quuux[0] = value; }

    register(setFoo, true);
    register(setBar, true);
    register(setBar, true);
    register(setBaz, true);
    register(setQuux, true);
    register(setQuuux, true);
    assert.equal(_ncallbacks(), 6);

    unregister(setBar);
    assert.equal(_ncallbacks(), 4);

    unregister(setQuux);
    assert.equal(_ncallbacks(), 3);

    _run_exitfuncs();
    assert.equal(_ncallbacks(), 0);
    assert.equal(foo[0], true);
    assert.equal(bar[0], false);
    assert.equal(baz[0], true);
    assert.equal(quux[0], false);
    assert.equal(quuux[0], true);
});
