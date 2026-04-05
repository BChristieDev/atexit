/**
 * @file       tests/run-exitfuncs.spec.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { _ncallbacks, _run_exitfuncs, register } from '../src/atexit.js';

test('Call exit handlers', () => {
    const foo: number[] = [];

    function pushWrapper(value: number) { foo.push(value); }

    register(pushWrapper, 1);
    register(pushWrapper, 2);
    register(pushWrapper, 3);
    assert.equal(_ncallbacks(), 3);

    _run_exitfuncs();
    assert.equal(_ncallbacks(), 0);
    assert.equal(foo[0], 3);
    assert.equal(foo[1], 2);
    assert.equal(foo[2], 1);
});
