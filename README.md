# 🚀 Hands-On Technical Interview Practice

A comprehensive, locally-runnable coding practice environment for technical interview preparation. This repository contains real-world problems sourced from company interviews, covering **JavaScript**, **React**, and **Node.js** fundamentals.

## 📖 Why I Made This

Preparing for technical interviews requires consistent practice with real problems. This repository provides:

- **Real Interview Problems**: Curated problems from actual company interviews (FAANG, startups, etc.)
- **Local Development**: Run and test solutions locally without relying on online platforms
- **Comprehensive Coverage**: Core JavaScript concepts, React patterns, and Node.js fundamentals
- **Test-Driven Learning**: Each problem includes comprehensive tests to validate your solution
- **Daily Practice**: Structured for daily problem-solving sessions

## 🎯 How It Works

This is a **living repository** that grows over time:

1. **Problem Sourcing**: We continuously add problems found from:
   - Real company interview experiences
   - Popular coding interview platforms
   - Community contributions
   - Technical interview blogs and resources

2. **Daily Practice Workflow**:
   - Pick a problem from any category
   - Read the problem statement in `README.md`
   - Implement your solution in the starter code file
   - Run tests locally to validate your solution
   - Iterate until all tests pass
   - Move to the next problem

3. **Continuous Improvement**:
   - Problems are organized by difficulty (Easy → Medium → Hard)
   - Each problem includes examples and edge cases
   - Solutions are not provided - you implement them yourself
   - Test files ensure your solution is correct

## 📦 What It Includes

### Problem Categories

- **JavaScript** (25 problems) - Core language concepts and implementations
- **React** (25 problems) - Custom hooks, component patterns, and React internals
- **Node.js** (25 problems) - Backend patterns, APIs, and Node.js fundamentals

### Difficulty Distribution (per category)

- **Easy (50%)**: 13 problems - Perfect for warming up and building confidence
- **Medium (25%)**: 6 problems - Intermediate challenges
- **Hard (25%)**: 6 problems - Advanced concepts and complex implementations

### Problem Structure

Each problem folder contains:

```
problem-name/
├── README.md           # Problem statement, examples, and requirements
├── solution.js         # Starter code (implement your solution here)
└── solution.test.js    # Jest tests to validate your implementation
```

For React problems:
```
problem-name/
├── README.md           # Problem statement and examples
├── Component.jsx       # Starter component (implement here)
└── Component.test.jsx  # React Testing Library tests
```

## 🛠️ Want to Setup Locally?

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd HandsOn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   ```bash
   npm test
   ```
   You should see test results (they'll fail initially since solutions aren't implemented).

### Running Tests

**Run all tests**:
```bash
npm test
```

**Run tests in watch mode** (recommended for development):
```bash
npm run test:watch
```
This automatically re-runs tests when you save changes.

**Run tests with coverage**:
```bash
npm run test:coverage
```

**Run tests by category**:
```bash
npm run test:javascript  # JavaScript problems only
npm run test:react       # React problems only
npm run test:node        # Node.js problems only
```

**Run a specific problem**:
```bash
npm test -- --testPathPattern="01-easy-hoisting"
```

## 📚 How to Practice

### Step-by-Step Workflow

1. **Choose a Problem**
   - Start with easy problems to build momentum
   - Or pick based on what you want to learn

2. **Read the Problem**
   - Open the `README.md` in the problem folder
   - Understand the requirements and examples
   - Note any constraints or edge cases

3. **Implement Your Solution**
   - Open the starter code file (`solution.js`, `Component.jsx`, etc.)
   - Write your implementation
   - Don't peek at solutions - figure it out yourself!

4. **Test Your Solution**
   ```bash
   npm test -- --testPathPattern="problem-name"
   ```
   Or use watch mode for instant feedback:
   ```bash
   npm run test:watch
   # Then press 'p' and type the problem name
   ```

5. **Iterate**
   - Fix any failing tests
   - Refactor for clarity
   - Consider edge cases
   - Move to the next problem when all tests pass ✅

### Daily Practice Tips

- **Time Yourself**: Simulate interview conditions (30-45 min per problem)
- **Start Easy**: Build confidence with easy problems first
- **Understand First**: Read the problem thoroughly before coding
- **Write Clean Code**: Practice writing readable, maintainable code
- **Test Edge Cases**: Think about boundary conditions
- **Review Patterns**: After solving, reflect on the approach used

## 🗂️ Repository Structure

```
HandsOn/
├── javascript/          # 25 JavaScript core concept problems
│   ├── 01-easy-hoisting/
│   ├── 02-easy-curry/
│   ├── ...
│   └── 25-hard-module-system/
├── react/               # 25 React custom hooks & patterns
│   ├── 01-easy-use-toggle/
│   ├── 02-easy-use-counter/
│   ├── ...
│   └── 25-hard-portal-modal/
├── node/                # 25 Node.js backend patterns
│   ├── 01-easy-file-reader/
│   ├── 02-easy-directory-lister/
│   ├── ...
│   └── 25-hard-database-migrations/
├── package.json         # Dependencies and scripts
├── jest.config.js       # Jest configuration
├── babel.config.js      # Babel configuration
└── README.md           # This file
```

## 🎓 Problem Categories

### JavaScript Problems

Focus on core JavaScript concepts:
- Hoisting, closures, scope
- Function implementations (curry, debounce, throttle, memoize)
- Polyfills (bind, call, apply)
- Array/object utilities (flatten, deep clone)
- Functional programming (pipe, compose)
- Advanced: Promises, Event Emitter, Virtual DOM, JSON Parser, etc.

### React Problems

Custom hooks and React patterns:
- Basic hooks (useToggle, useCounter, usePrevious)
- Storage hooks (useLocalStorage)
- Effect hooks (useDebounce, useInterval, useTimeout)
- DOM hooks (useClickOutside, useWindowSize, useHover)
- Data fetching (useFetch, useAsync, useSWR)
- Advanced: useState with history, useReducer implementation, Virtual List, etc.

### Node.js Problems

Backend and Node.js fundamentals:
- File system operations
- HTTP servers and routing
- Event emitters and streams
- Crypto and security
- Middleware patterns (rate limiting, caching, error handling)
- Advanced: Connection pools, WebSocket servers, API gateways, etc.

## 🤝 Contributing

This repository is designed for personal practice, but contributions are welcome:

- Found a great interview problem? Add it!
- Improved a problem statement? Submit a PR!
- Fixed a test case? Let's merge it!

## 📝 Notes

- **No Solutions Provided**: This is intentional - you learn by implementing
- **Test-Driven**: All problems include comprehensive tests
- **Real Interview Focus**: Problems are sourced from actual interviews
- **Local First**: Everything runs locally - no external dependencies

## 🎯 Goals

- ✅ Solve problems daily
- ✅ Build muscle memory for common patterns
- ✅ Prepare for technical interviews
- ✅ Deepen understanding of JavaScript, React, and Node.js
- ✅ Practice writing testable, clean code

## 📄 License

MIT License - Feel free to use this for your interview preparation!

---

**Happy Coding! 🚀**

*Remember: Consistency beats intensity. Solve one problem daily, and you'll see progress!*
