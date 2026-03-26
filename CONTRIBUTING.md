# Contributing to Weather-Aware Order Checker

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

Please read and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to ensure a respectful and inclusive community.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14.0 or higher
- npm or yarn
- Git
- Basic JavaScript knowledge

### Setup Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/weather-order-checker.git
   cd weather-order-checker
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a new branch for your feature:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Create .env file for development:**
   ```bash
   cp .env.example .env
   # Add your OpenWeatherMap API key
   ```

---

## 💡 Types of Contributions

### 🐛 Bug Reports
Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)

### ✨ Feature Requests
Have a great idea? Share it by:
- Describing the feature and why it's useful
- How it fits into the project roadmap
- Any technical considerations

### 📚 Documentation
Help improve our documentation:
- Fix typos and grammar issues
- Clarify confusing sections
- Add examples and tutorials
- Improve API documentation

### 🔧 Code Improvements
- Refactor existing code for clarity
- Improve error handling
- Optimize performance
- Add comments and documentation

### ✅ Testing
- Write unit tests
- Write integration tests
- Report test failures
- Improve test coverage

---

## 🎯 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-email-notifications`
- `fix/handle-invalid-timestamps`
- `docs/improve-setup-guide`

### 2. Make Your Changes

**Code Style Guidelines:**
- Follow JavaScript ES6+ best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Maintain consistent indentation (2 spaces)

**Example:**
```javascript
/**
 * Checks if weather will cause delivery delays
 * @param {string} weatherMain - Weather condition (Rain, Snow, etc)
 * @returns {boolean} - True if delivery should be delayed
 */
function isDelayedWeather(weatherMain) {
  return DELAYED_WEATHER_CONDITIONS.includes(weatherMain);
}
```

### 3. Test Your Changes
```bash
# Run the application with your changes
npm start

# Test with different scenarios:
# - Valid cities
# - Invalid cities
# - Different weather conditions
# - Error cases
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add email notifications feature"
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions/changes

**Example:**
```
feat: implement weather caching with 30-minute TTL

Adds a simple in-memory cache that prevents redundant API calls
for the same city within a 30-minute window. This improves
performance and respects API rate limits.

Closes #42
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Go to GitHub and create a PR against `main`
- Add clear title and description
- Reference related issues using `Closes #123`
- Wait for review and feedback

---

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Your code follows the project's code style
- [ ] You've added appropriate comments
- [ ] All core functionality still works
- [ ] You've tested your changes
- [ ] You've updated relevant documentation
- [ ] You've added an entry to CHANGELOG.md
- [ ] PR description clearly describes changes
- [ ] No sensitive data (API keys, credentials) included
- [ ] No console.log statements left (use logger instead)

---

## 🧪 Testing Guidelines

### Running the Application
```bash
npm start
```

### Manual Testing Checklist
- [ ] App starts without errors
- [ ] Loads orders.json correctly
- [ ] Fetches weather for all cities
- [ ] Handles invalid cities gracefully
- [ ] Updates order statuses correctly
- [ ] Generates personalized messages
- [ ] Saves updated orders.json
- [ ] Shows appropriate console output

### Test Scenarios
1. **Happy Path** - All cities valid, mixed weather
2. **Error Cases** - Invalid cities, API failures
3. **Edge Cases** - Empty orders, special characters
4. **Performance** - Large number of orders

---

## 📖 Documentation Standards

### README Section
- Clear title and description
- Quick start instructions
- Feature list with ✅
- Configuration options
- Troubleshooting section

### Code Comments
```javascript
// Use block comments for sections
/*
 * ==================== SECTION NAME ====================
 * Description of what this section does and why
 */

// Use line comments for inline logic
// This checks if the weather is severe
if (DELAYED_WEATHER_CONDITIONS.includes(weather)) {
```

### Function Documentation
```javascript
/**
 * Brief description of what function does
 * 
 * @param {type} paramName - Description of parameter
 * @param {type} anotherParam - Description
 * @returns {type} - Description of return value
 * 
 * @example
 * const result = myFunction('value');
 * 
 * @throws {Error} - Description of error cases
 */
```

---

## 🔄 Review Process

### Code Review Steps
1. Reviewer checks code quality
2. Reviewer tests functionality
3. Reviewer provides feedback
4. Contributor makes requested changes
5. Reviewer approves or requests more changes

### What Reviewers Look For
- ✅ Code follows project style
- ✅ Logic is correct and efficient
- ✅ Error handling is appropriate
- ✅ Documentation is clear
- ✅ No breaking changes
- ✅ Tests cover new code

### Responding to Reviews
- Assume positive intent
- Ask clarifying questions
- Make requested changes professionally
- Update PR with new commits
- Re-request review when ready

---

## 🚀 Release Process

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (1.1.0) - New features (backwards compatible)
- **PATCH** (1.0.1) - Bug fixes

### Before Each Release
1. Update CHANGELOG.md
2. Update version in package.json
3. Create release tag: `git tag v1.1.0`
4. Create GitHub release with notes
5. Announce in project channels

---

## 📚 Resources & References

### Learning Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [JavaScript Async Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Git Guide](https://git-scm.com/book/en/v2)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)

### Project Files
- [README.md](README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical design
- [AI_LOG.md](AI_LOG.md) - Development decisions
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

## 🎁 Recognition

Contributors will be recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md) file
- Release notes
- GitHub contributors page
- Project website (when launched)

---

## ❓ Questions?

- 📖 Check the documentation
- 🐛 Search existing issues
- 💬 Create a discussion
- 📧 Contact maintainers

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](LICENSE)).

---

**Thank you for contributing! Your help makes this project better! 🌟**

Last Updated: March 26, 2026
