# About

Avraham said that he uses two questions for his interviews at Google, both centered on the game Set:

1. implement `is_set`
2. implement `has_set`

---

Things I learned during this programming exercise:

## Set, Sorting, Algorithmic Tricks

- good resource: https://sanderevers.github.io/2019/09/11/finding-sets.html
- integer uniqueness: https://cs.stackexchange.com/questions/37979/can-element-uniqueness-be-solved-in-deterministic-linear-time

## Svelte + Vite + Vitest

- how HTML event handlers work in Svelte (more or less the same) except onChange -> on:change
    - also has a class:<class-name> bind syntax similar to Angular
- if statement (conditional rendering) / for loop templating similar to Jinja2
- standard handlebar syntax
- how event dispatching works in Svelte
    - it basically has a version of Redux dispatchers built in (`createEventDispatcher / on:change`)
    - it also hasw the same callback feature via props built in
- how reactivity works in Svelte (the `$` special character)
- how components work in Svelte
    - how to pass props + callback functions
    - some key differences between React and Svelte
        1. components are *not* re-rendered when props change
- how state management works in Svelte
    - there is no useState / setState, it works on assignment. There are some subtle gotchas/footguns here.
- how to use typescript with Svelte (lang="ts")
- how to use vitest (basically the same as jest, really easy to set up)
    - watch mode is on by default

### Key things I learned about Svelte

- build sizes are fairly small (everything together for this project is ~100kB)
- by default it has a11y warnings which are very noisy. Disabling a11y warnings is cumbersome.

## TypeScript

- all sorts of things about problems with typescript enums
- how to use the `key of` typescript keywords effectively

## Other

- it's possible to draw shapes easily with SVG when you're lazy
    - and ChatGPT is not nearly as reliable as one would like when it comes to generating complex shapes (another reminder that it is a next word predictor and not a true AI)

---

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
