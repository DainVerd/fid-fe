# Overview

This project implements the FE part of the FID developer test task. The app loads document metadata from the REST BE and siplays the data in a server-side Vuetify table.

[Backend repository could be faund here](https://github.com/DainVerd/fid-be)
The user can:

- Browse paginated document metadata
- sort records
- filter records
- view loading and error states

List of content:

- [How to launch project](#how-to-launch-project)
  - [How to launch unit tests](#run-unit-tests-with-vitest)
- [Tech stack](#tech-stack)
- [Design Decisions](#design-decisions)

## How to launch project

1) install dependencies

```sh
npm install
```

1) run project for developing

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

Current tests cover:

- document metadata service Api
- Filter component apply event
- Filter component clear event

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Tech stack

### Vite

as builder

### Vue.js(ver3)

Selected because I am familiar with this JS framework and is more simplier than React.

### TypeScript

For types and data consistency.

### Vuetify

components library used only table commponent for data display received from BE.

### axios

is configured through a reusable API client. The document metadata service encapsulates HTTP calls so Vue components do not need to work with Axios directly.

### Vitest

for unit tests

## Design Decisions

Main approach is to make simple robust data display using already existing approaches and technologies instead of implementing all from scratch.

### Separate Filter Component

Filtering UI is extracted into its own component to keep the main app component focused on orchestration and data loading.

### Server-Side Pagination

Paginatiobn, filtering and sorting are done by the BE instead of loading all records into the browser. This way the table is more scalable and better reflects a production-style implementation.

### Limitations / Possible Improvements

Given more time, the FE could include:

- Better UX for mobile layouts
- More component tests
