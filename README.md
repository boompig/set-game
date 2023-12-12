# About

This is an implementation of the card game "Set". It consists of two parts:

1. A command-line implementation of the `isValidSet` and `hasSet` functions, based on conversations with a friend about using these as interview test questions. I wanted to see how complex these would be to use for my own interviews, so I wrote my own implementation and played around with performance optimizations. I wanted to see how a candidate might approach it from scratch, without first looking at the various solutions online.

2. An implementation of Set as an SPA using Svelte+SvelteKit. Since I went to the trouble of writing basically the entire game, it felt like a waste not to finish the game. It is my first project in Svelte, so almost by definition there are many mistakes here.

## As a Programming Test

It's a pretty good programming test but may be difficult depending on the time allotted, and whether the candidate spends all their time on one of the functions. Overall, I think it's quite doable (without the perf optimizations) in 30 minutes.

However, there are quite a few tricks and performance optimizations. They boil down to:

### `isValidSet`

- Uniqueness for `allDifferent` can be trivially checked in O(nlogn) space and time using a set data structure. However there is a cute solution using bitwise operations. There is a very tempting solution using pure addition that works on the base game of set but would not work for a "generalized" set with more than 3 possible property values.
- Both solutions are very quick to construct.

### `hasSet`

- Naive implementation is very easy (it's just a search problem). Can be implemented easily using an iterative or recursive approach (I chose recursive). Complexity here is O(n^3) in the number of cards.
- Key insight: once you pick the first 2 cards of a 3-card set, the fourth card is uniquely determined. So rather than searching for the last card in a set, you can construct it and check if it exists among the cards.
    - This means you can create a hash table of visible cards, then lookup is O(1)
- Second insight: order doesn't matter, so once a card has been excluded as a first card in any set, it will never be the second nor the third card, so it need not be checked again.
    - In a generalized set, you can play the same trick with excluded card combinations/paths rather than just a single excluded card/node.
    - We can use a standard `visited` set for this purpose.

---

Things I learned during this programming exercise:

## Set, Sorting, Algorithmic Tricks

- good resource: https://sanderevers.github.io/2019/09/11/finding-sets.html
- integer uniqueness: https://cs.stackexchange.com/questions/37979/can-element-uniqueness-be-solved-in-deterministic-linear-time

## Svelte + Vite + Vitest

- how HTML event handlers work in Svelte (more or less the same) except onChange -> on:change
    - also has a `class:<class-name>` bind syntax similar to Angular
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

- Build sizes are fairly small (everything together for this project is ~100kB)
    - essentially this is due to how Svelte has its own compiler, while React is a library operating over the vDOM at runtime. The React library/runtime is ~200kB by itself.
- By default it has a11y warnings which are very noisy. Disabling a11y warnings is cumbersome.
- There is no good equivalent of `useEffect`
- There is the same trick for mutable objects as there is in React. In React, you create immutable object copies. In Svelte, you trigger a re-render based on re-assignment. In both cases, you have to be careful what you're modifying.
- Because reactivity kind of works by magic, it's a little hard to reason about
    - [This page](https://dev.to/isaachagoel/svelte-reactivity-gotchas-solutions-if-you-re-using-svelte-in-production-you-should-read-this-3oj3) documents some gotchas. I ran into the first example on the page and it took me forever to debug it.
        - In React, you could state what the dependencies are explicitly. It looks like you can do the same in Svelte via the argument list.
- There is no good way to create multiple components in a single file, unlike with React. I suppose that this helps with readability but it's pretty annoying.

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
