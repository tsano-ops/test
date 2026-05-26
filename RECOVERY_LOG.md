# Recovery Log — 2026-04-28 _shared.js Catastrophe

## Timeline of events

| Time | Event |
|------|-------|
| 2026-04-14 23:11 | Last git commit: `6937293 design: build print pages 19-23` |
| 2026-04-14 → 2026-04-28 | 14 days of work on `_shared.js`/`_shared.css` — NEVER committed |
| 2026-04-28 09:40 | `vault.html` modified |
| 2026-04-28 10:06 | `_shared.css` last good state (919KB) |
| 2026-04-28 10:10 | `post-loss.html` modified |
| 2026-04-28 10:11 | Bulk modification of 17 HTML files |
| 2026-04-28 ~11:00 | Violetka: "everything was working perfectly until 11:00" |
| 2026-04-28 12:04 | `_shared.js` exploded to 3.2 GB (runaway) |
| 2026-04-28 ~12-14:00 | macOS RAM exhaustion (Claude paused at 63 GB RAM) |
| 2026-04-28 14:52 | User force-quit Claude; manually restored `_shared.js` from git via Terminal |
| 2026-04-28 15:00+ | Full recovery + safety infrastructure setup |

## Root cause analysis

**CONFIRMED CAUSE (Violetka, 2026-04-28 evening):**
She shared the entire `html-prototype/` folder with **another Claude desktop chat session** (not this Claude Code session). That other Claude session attempted to process the 750KB `_shared.js` file, got stuck in a loop while writing/editing it, and produced runaway output until the file reached 3.2 GB.

**Why this Claude (Code) didn't catch it:**
- The other Claude session was running OUTSIDE this Claude Code project context
- This session's hooks don't apply to other Claude chats reading the same folder
- macOS file system permissions allowed the other session to write freely
- No size-guard existed at the time (it does now: 5MB limit on PreToolUse hook)

**Pattern signature:** runaway append loop without exit condition or newlines. The file became a single line of 3.2 GB containing infinite repetitions of `paNormalizeTitle(e.title) === paNormalizeTitle(entryData.title)` interleaved character-by-character with other code fragments — classic LLM token-loop output.

**Damage was confined to ONE file** (`_shared.js`). All HTML files modified the same morning (10:11) survived intact. `_shared.css` was likely deleted by a separate failed write attempt.

## IMPORTANT RULE GOING FORWARD

**Never share the entire `html-prototype/` folder with another Claude chat.**
- If you need help from another Claude session, share specific files only (one HTML at a time)
- Especially never share `_shared.js` or `_shared.css` to a chat that doesn't understand the prototype's history
- This Claude Code session has full context + safety hooks; other Claude chats don't

## What was recoverable vs. lost

### Recoverable (now restored)
- `_shared.js` from git HEAD (Apr 14, 215KB)
- `_shared.css` from git HEAD (Apr 14, 597KB)
- 3 images from git HEAD: FB.png, activity.png, crown.png
- All 26 top-level HTML files (intact on disk from morning of Apr 28)
- All 26 print HTML files (intact on disk)
- 102/102 asset references exist on disk

### Permanently lost (no recovery source found)
- 14 days of changes (Apr 14 → Apr 28) on `_shared.js`
- 14 days of changes (Apr 14 → Apr 28) on `_shared.css`
- 2 image references that never existed as files: `Profile_img_DrEmily.png`, `Profile_img_gregoryhouse.png` (now placeholder copies of `Profile_img.png`)

### Recovery sources checked (all failed)
| Source | Result |
|--------|--------|
| Time Machine | Not configured |
| iCloud Drive Desktop sync | Not synced |
| ~/.Trash | Empty |
| APFS local snapshots | Only OS update snapshots |
| Git stash | Empty |
| Git reflog (Apr 14 → Apr 28) | 0 commits in this period |
| Git fsck dangling blobs | Only config files (launch.json, settings.json, .gitignore) |
| VS Code Local History | Only 2 unrelated TypeScript files |
| Chrome cache (7 profiles, ~5 GB total) | Only small index entries — no full _shared.js |
| Spotlight `paNormalizeTitle` search of entire Mac | Zero results outside the corrupted file |

## Lessons learned → Rules going forward

| Lesson | New rule |
|--------|----------|
| 14 days without a single commit = unrecoverable on any disaster | Commit after every completed step |
| 3.2 GB runaway possible if no size guard | Hook blocks edits if file >5 MB |
| Manual `_versions/` is forgotten | Auto rolling backup via PreToolUse hook |
| Daily snapshots not done | Auto daily snapshot via SessionStart hook + 9am cron |
| Manual edits not protected | fswatch daemon catches ALL changes (not just Claude's) |
| No way to know "yesterday's version" | restore.sh: one command rollback |
| No daily health check | 24h cron checks file count, sizes, errors |
| Cross-session amnesia | SESSION_LOG.md keeps continuity |

## Verification today

- ✅ All 52 HTML pages return HTTP 200
- ✅ All 102 asset references exist on disk
- ✅ Dashboard layout correct (Progress panel on right)
- ✅ Profile, Family, Vault layouts correct (AI Assistant on right)
- ✅ Right-panel toggle bug fixed in `_shared.js` line ~3970-3974

## Items pending Violetka's attention

- [ ] Identify which design/functionality from the lost 14 days needs to be rebuilt — describe one feature at a time
- [ ] Approve Phase 4 (split records) when ready
- [ ] Review 24h health-check report each day
