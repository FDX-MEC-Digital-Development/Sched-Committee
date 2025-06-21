# ALPA Scheduling Committee Tools

## Features

- **Duty Limits Calculator**: Interactive tools for calculating maximum duty limits
- **Fatigue Management**: Evidence-based fatigue assessment and management recommendations  
- **Rest & Recovery**: Comprehensive rest requirement calculations
- **Mobile Responsive**: Full functionality on phones, tablets, and desktop computers
- **Dark Mode**: Eye-friendly interface for night operations
- **Offline Support**: Progressive Web App (PWA) capabilities for use without internet
- **Privacy First**: All calculations performed locally - no personal data transmitted

## Quick Start

### For Non-Technical Users

1. **Visit the Live Application**: [https://scheduling.fdx.alpa.org/](https://scheduling.fdx.alpa.org/#/)
2. **Install as Mobile App**: 
   - On iOS: Tap the share button and select "Add to Home Screen"
   - On Android: Tap the menu button and select "Install App"
3. **Start Using Tools**: Navigate to Duty Limits or Fatigue sections to begin

### For Contributors and Developers

#### Prerequisites

Before you begin, you'll need to install:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Package manager for JavaScript
- **Git** - [Download here](https://git-scm.com/) for version control

#### Installation

1. **Clone the repository** (download the code to your computer):
   ```bash
   git clone https://github.com/your-username/sched-committee.git
   cd sched-committee
   ```

2. **Install dependencies** (download all required packages):
   ```bash
   npm install
   ```
   This command reads the `package.json` file and installs all necessary libraries and tools.

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Your application will be available at `http://localhost:3000`

#### Development Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev` | Start development server | When actively coding and testing |
| `npm run build` | Build for production | Before deploying to production |
| `npm run preview` | Preview production build locally | To test production build before deployment |
| `npm run test` | Run unit tests | To verify code functionality |
| `npm run lint` | Check code quality | Before submitting contributions |
| `npm run lint:fix` | Auto-fix code style issues | To automatically resolve style problems |

## Testing

We maintain high code quality through comprehensive testing:

### Unit Testing (Vitest)
Tests individual functions and components:
```bash
npm run test
```

### Preview Deployments
Every pull request automatically creates a preview deployment for testing:
```
https://gentle-grass-0608be90f-<pull-request-number>.eastus2.5.azurestaticapps.net/
```

For example, for pull request #38, the preview URL would be:
```plaintext

https://gentle-grass-0608be90f-38.eastus2.5.azurestaticapps.net/
```

## Mobile Application

This project includes native mobile app capabilities using Capacitor. This capability is unused, as we decided to build a Progressive Web App (PWA) instead to leverage the compatibility and performance benefits of web technologies. However, the mobile app can be built and run for testing purposes or for future use.

### Building for Mobile

1. **Generate static files and sync with native projects**:
   ```bash
   npm run sync
   ```
   This is equivalent to running:
   ```bash
   npm run generate  # Build static files
   npx cap sync      # Sync with native projects
   ```

2. **Run on iOS Simulator** (macOS only):
   ```bash
   npx cap run ios
   ```

3. **Run on Android Emulator**:
   ```bash
   npx cap run android
   ```

## Technology Stack

### Core Framework
- **[Nuxt.js 3](https://nuxt.com/)** - Vue.js framework for production-ready applications
- **[Vue.js 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better development experience

### UI & Styling  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Nuxt UI](https://ui.nuxt.com/)** - Beautiful and accessible UI components
- **[Heroicons](https://heroicons.com/)** - Professional SVG icons

### Mobile & PWA
- **[Capacitor](https://capacitorjs.com/)** - Cross-platform native mobile apps
- **[Vite PWA](https://vite-pwa-org.netlify.app/)** - Progressive Web App capabilities

### Development Tools
- **[Vitest](https://vitest.dev/)** - Lightning fast unit testing
- **[Playwright](https://playwright.dev/)** - Reliable end-to-end testing
- **[ESLint](https://eslint.org/)** - Code quality and consistency

## Contributing

We welcome contributions from everyone. Whether you're fixing a bug, adding a feature, or improving documentation, your help makes us better.

### Getting Started with Contributing

1. **Fork the repository** on GitHub
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and test thoroughly
4. **Run the linter** to ensure code quality:
   ```bash
   npm run lint:fix
   ```
5. **Run tests** to verify functionality:
   ```bash
   npm run test
   ```
6. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```
7. **Push to your fork** and create a pull request

### Contribution Guidelines

- **Code Quality**: Follow the existing code style and run linting tools
- **Testing**: Add tests for new features and ensure existing tests pass  
- **Documentation**: Update README and code comments for significant changes

## Project Structure

```
sched-committee/
├── components/          # Reusable Vue components
│   ├── dutyLimits/     # Duty calculation components  
│   ├── fatigue/        # Fatigue management components
│   └── restRecover/    # Rest requirement components
├── pages/              # Application routes/pages
├── composables/        # Reusable logic functions
├── utils/              # Helper functions and utilities
├── tests/              # Unit and integration tests
├── assets/             # Images, styles, and static assets
└── docs/               # Additional documentation
```

## Deployment

### Automatic Deployments
- **Production**: Automatically deployed when code is merged to `main` branch
- **Preview**: Each pull request gets its own preview deployment for testing

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy static files** from the `dist/` directory to your hosting provider

Supported platforms:
- Azure Static Web Apps
- Vercel  
- Netlify
- GitHub Pages
- Any static hosting provider

## License

This project is licensed under the AGPL License - see the [LICENSE](LICENSE) file for details.

## Support & Help

### For Users
- GitHub Discussions: For questions and community support
- Bug Reports: Use GitHub Issues for reporting problems

### For Developers
- [Development Wiki](docs/) - Detailed technical documentation

## Disclaimer

  'TERMS OF USE', 'The FedEx MEC Scheduling Committee (“Committee”) App is provided as a convenience for the members of the ALPA FedEx MEC. The App consists of a Duty Limit section and a section devoted to fatigue and its effects; the latter service is provided for educational purposes only.  Neither section shall be construed as offering individual legal advice, and the use of the App does not absolve individual members of their responsibility to adhere to the terms and conditions of the FedEx/ALPA Collective Bargaining Agreement, the FARs, or their personal fitness for duty self-assessment.  INFORMATION OBTAINED FROM THE APP SHOULD NOT BE RELIED UPON FOR PERSONAL, MEDICAL OR LEGAL DECISIONS AND YOU SHOULD CONSULT AN APPROPRIATE PROFESSIONAL FOR SPECIFIC ADVICE TAILORED TO YOUR SITUATION.',
  'MODIFICATION OF THE APP', 'The FedEx MEC Scheduling Committee reserves the right to change the terms, conditions, or content of this App, including suspending or terminating its operation without prior notice.',
  'EXPRESS LIABILITY DISCLAIMER', 'While the Committee strives to provide accurate information to its members, the Committee, FedEx MEC, and/or ALPA make no representation to the suitability, reliability, availability, timeliness or accuracy of the results derived from this App’s usage, and assumes no liability for any damages, claims, or losses, incurred as a result using the App. User agrees to assume all risks and any liability which may result from using the App.'

## Privacy Policy

The FedEx MEC Scheduling Committee (“Committee”) is committed to respecting and protecting the privacy of its members. The Committee has adopted a set of guidelines that serve as the basis for the relationship between member data and the Committee’s Flight Time/Duty Time App. While these guidelines have been developed with the recognition that Internet technologies rapidly change, currently the use of the Committee’s Flight Time/Duty Time Appdoes not request or require personal member information and as such, no member information is stored on the App’s server. Should future versions of this App require the disclosure of personal information, users will be notified of such a change, and will be directed to view the Committee’s revised Privacy Policy.


---

