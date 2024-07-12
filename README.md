# GiveFreely Challenge

## Setup Instructions

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev`
4. The app should be up and running at `http://localhost:3000`

## Stack

- [Next.js](https://nextjs.org/): React framework for building server-rendered applications.
- [pnpm](https://pnpm.io/): Fast, disk space efficient package manager.
- [TypeScript](https://www.typescriptlang.org/): Typed JavaScript at Any Scale.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [ESLint](https://eslint.org/): Pluggable JavaScript linter.
- [shadcn/ui](https://ui.shadcn.com/): UI components.
- [react-query](https://react-query.tanstack.com/): Data fetching library for React.
- [react-hook-form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.

## Design and Architectural Choices

### Design Choices

- **shadcn/ui**: I used the `shadcn/ui` library to build the UI components. This library provides a set of reusable components that are easy to use and customize. It also provides a consistent look and feel across the app.
- **react-query**: I used `react-query` for data fetching. It provides a powerful and flexible way to manage data fetching and caching in React applications.
- **react-hook-form**: I used `react-hook-form` for form handling. It provides a performant and flexible way to handle forms in React applications.

### Architectural Choices

- **Component-based Architecture**: I used a component-based architecture to organize the code. Each component is a self-contained unit that encapsulates its logic and presentation. This makes the code easier to understand and maintain.
- **Module-based Architecture**: I used a module-based architecture to organize the code. Each module is a self-contained unit that encapsulates its components, hooks, queries, and other related code. This makes it easier to reason about the code and scale the app.
- **Provider Pattern**: I used the provider pattern to manage global state in the app. This pattern allows me to share state and logic across components without prop drilling.
- **Schema Pattern**: I used the schema pattern to define the data structures used in the app. This makes it easier to work with data and ensures consistency across the app.

### Folder Structure

The app has the following structure:

```
repo
 ├── public (static assets)
 ├── src
 │   ├── components (app-specific components)
 │   ├── lib (app-specific utilities)
 │   ├── mocks (mock data)
 │   ├── modules (app-specific modules)
 │   │  │ home (home page module)
 │   │  │   ├── components (home page components)
 │   │  │   ├── hooks (home page hooks)
 │   │  │   ├── queries (home page queries)
 │   ├── mocks (mock data)
 │   ├── providers (app-specific providers)
 │   ├── schemas (app-specific schemas)
 └── ...

```
