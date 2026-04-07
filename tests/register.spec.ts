/**
 * @file       tests/register.spec.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { _ncallbacks, _run_exitfuncs, register } from '../src/index.js';

test('Register exit handlers', () => {
    const foo = [ false ];
    const bar = [ 'bar' ];
    const baz = [ 0 ];

    function setFoo(value: boolean) { foo[0] = value; }
    function setBar(str1: string, str2: string) { bar[0] = `${str1} ${str2}` }
    function incrementBaz() { baz[0]!++; }

    register(setFoo, true);
    assert.equal(_ncallbacks(), 1);

    register(setBar, 'Hello', 'World');
    assert.equal(_ncallbacks(), 2);

    register(incrementBaz);
    register(incrementBaz);
    assert.equal(_ncallbacks(), 4);

    _run_exitfuncs();
    assert.equal(_ncallbacks(), 0);
    assert.equal(foo[0], true);
    assert.equal(bar[0], 'Hello World');
    assert.equal(baz[0], 2);
});
