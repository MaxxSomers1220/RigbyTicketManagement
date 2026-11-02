# Project Desk

A personal project and ticket tracker inspired by Request Tracker. This is an independent application, not an RT installation or an RT-compatible client.

## Run locally

Serve the `dist` directory with any static web server. With Python installed:

```sh
python -m http.server 8080 --directory dist
```

Open http://localhost:8080. ES modules require HTTP; do not open index.html directly.

## Features

- Projects, searchable ticket list, and status board
- New, In progress, Waiting, and Resolved workflow
- Priorities, due dates, overdue indicators, and focus view
- Ticket descriptions, checklists, notes, and change history
- JSON backup and validated restore
- Responsive layout and keyboard-operable ticket rows

The initial four tickets are examples and can be edited or deleted. My focus includes unresolved tickets that are in progress, High/Urgent, or due today or earlier. Stats reflect the selected project; search and status/priority filters apply to the ticket results.

## Storage

Data is stored in localStorage under `project-desk-v1`, separately for each browser profile and origin. No database or cloud synchronization is included. Export backups regularly; clearing browser data removes your records. A local preview and hosted site have separate records; use Backup/Restore to transfer them. Failed saves preserve the current data in memory and report an error. A malformed stored record is not overwritten automatically; restoring or saving new work replaces it.

## Extend

- `dist/index.html`: accessible application shell and dialogs
- `dist/style.css`: styling and responsive layout
- `dist/app.js`: UI, persistence, and ticket interactions
- `dist/model.mjs`: validation, filters, and IDs

No build step or package installation is required. Font loading is optional; system sans-serif is the fallback. Useful future extensions include a backend database, cross-device sync, attachments, project editing/archiving, and recurring tickets.
