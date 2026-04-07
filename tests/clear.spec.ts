/**
 * @file       tests/clear.spec.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { _clear, _ncallbacks, _run_exitfuncs, register } from '../src/index.js';

test('Clear exit handlers', () => {
    const foo = [ false ];
    const bar = [ false ];

    function setFoo(value: boolean) { foo[0] = value; }
    function setBar(value: boolean) { bar[0] = value; }

    register(setFoo, true);
    register(setBar, true);
    assert.equal(_ncallbacks(), 2);

    _clear();
    assert.equal(_ncallbacks(), 0);

    _run_exitfuncs();
    assert.equal(foo[0], false);
    assert.equal(bar[0], false);
});
