# Contributing to Clausia

Thank you for your interest in contributing. This document outlines the process and guidelines for contributing to Clausia.

---

## How to Contribute
- Report bugs by opening a GitHub Issue.  
- Suggest features via Issues or Discussions.  
- Improve documentation.  
- Submit code contributions through Pull Requests.

---

## Branching
- Submit all pull requests to the **dev** branch.  
- The `master` branch is reserved for production releases.  
- I will merge `dev` into `master` after review and testing.  

---

## Guidelines
- Use TypeScript for all new code.
- Validate form inputs with Zod.
- Provide a clear description of the problem and solution.
- Link related issues (e.g., “Closes #42”).
- Run linting before pushing
```bash
npm run lint
```

---

## Commit Messages
- `feat:` new feature  
- `fix:` bug fix  
- `docs:` documentation changes  
- `chore:` tooling or dependencies  
- `refactor:` code changes without functional impact  

---

## License
By contributing, you agree that your contributions will be licensed under the **Apache 2.0 License**.
