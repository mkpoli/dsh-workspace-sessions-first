import assert from 'node:assert/strict'
import test from 'node:test'

import { apply, inject, name } from '../lib/index.js'

/** Collect the listeners a fake host context receives, keyed by event name. */
function fakeContext() {
	const listeners = new Map()
	return {
		listeners,
		on(event, listener) {
			listeners.set(event, listener)
		},
	}
}

test('declares the host contract', () => {
	assert.equal(name, 'dsh-workspace-sessions-first')
	assert.deepEqual(inject, ['webServer'])
})

test('pushes one style row into the index table', () => {
	const ctx = fakeContext()
	apply(ctx)
	assert.ok(ctx.listeners.has('webserver/index-inject'))

	const table = []
	ctx.listeners.get('webserver/index-inject')(table)

	assert.equal(table.length, 1)
	const [row] = table
	assert.equal(row.kind, 'style')
	assert.match(row.text, /groupSection/)
	assert.match(row.text, /order:2/)
})
