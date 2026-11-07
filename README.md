# dsh-workspace-sessions-first

Orders the DeepSeek Harness sidebar's **Workspace Tree** so each Workspace shows its own Sessions first and its nested Workspace folders after them.

```
before                      after
▾ project                   ▾ project
  ├ workspace A               ├ Session 1
  ├ workspace B               ├ Session 2
  ├ Session 1                 ├ workspace A
  └ Session 2                 └ workspace B
```

## Install

```sh
dsh plugin --profile web add github:mkpoli/dsh-workspace-sessions-first
```

Restart the host and refresh the page. Turn on **View options → Group by → Workspace Tree** to see the order.

## How it works

The row order is fixed inside the shipped browser, so the plugin reorders the same rows at paint time: the Web server injects one `<style>` element into `index.html` that makes every group section a column flex container and moves its child-folder block last.

No data is touched. Grouping, expansion state, drag targets, row menus, hover cards and the flat grouping modes keep the browser's own behavior.

## Scope

- The Web server renders `index.html`, so this applies to the Web GUI.
- Ordering happens at paint time. The DOM keeps the original order, which means keyboard focus and screen readers still visit child folders before the Workspace's Sessions.
- The style matches the browser's `groupSection` class and its `role="group"` child-folder block, checked against DSH 0.2.1-rc.5 and 0.2.2-rc.1. An upstream change to either would need a follow-up.

## License

MIT
