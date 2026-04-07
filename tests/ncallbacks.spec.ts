/**
 * @file       tests/ncallbacks.spec.ts
 * @author     Brandon Christie <bchristie.dev@gmail.com>
 */

import assert from 'node:assert/strict';
import { test } from "node:test";
import { _clear, _ncallbacks, register, unregister } from '../src/index.js';

test('Number of exit handlers', () => {
    function foo() { console.log('foo'); }
    function bar() { console.log('bar'); }
    function baz() { console.log('baz'); }

    assert.equal(_ncallbacks(), 0);

    register(foo);
    assert.equal(_ncallbacks(), 1);

    register(bar);
    register(bar);
    assert.equal(_ncallbacks(), 3);

    register(baz);
    assert.equal(_ncallbacks(), 4);

    unregister(bar);
    assert.equal(_ncallbacks(), 2);

    _clear();
    assert.equal(_ncallbacks(), 0);
});
