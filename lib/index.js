/**
 * Workspace Tree order: a Workspace's own Sessions above its nested Workspace
 * folders.
 *
 * The shipped browser paints each tree node as header, child-folder block,
 * then the Workspace's own Sessions. That order lives in the renderer, so this
 * plugin reorders the same rows in CSS: every group section becomes a column
 * flex container and the child-folder block — the only `role="group"` child —
 * moves to the end. Grouping, expansion, drag targets and hover cards keep
 * their own behavior; the flat views render no such block and stay unchanged.
 *
 * The row is injected into index.html as a `<style>` element through the Web
 * server's structured index table, so the plugin has no client bundle and no
 * client-side effect.
 *
 * @module dsh-workspace-sessions-first
 */

/** Cordis plugin name. */
export const name = 'dsh-workspace-sessions-first'

/** The style row needs the Web server's index renderer. */
export const inject = ['webServer']

const STYLE = [
	'[class*="groupSection"]{display:flex;flex-direction:column}',
	'[class*="groupSection"]>[role="group"]{order:2}',
].join('')

/**
 * @param ctx - host context carrying `webServer`.
 */
export function apply(ctx) {
	// The table is gathered fresh on every index render; one row per response.
	ctx.on('webserver/index-inject', (table) => {
		table.push({ kind: 'style', text: STYLE })
	})
}
