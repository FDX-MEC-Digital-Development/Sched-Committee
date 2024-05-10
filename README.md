# Documentation

## Instructions

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Testing

# Unit testing - vitest

```bash
#npm
npm run test

```

# e2e testing - Playwright

```bash
#npm - start dev server
npm run dev
npx playwright test
```


## Production

Build the application for production. Not necessary if deploying to Azure, Vercel or Github pages.

```bash
# npm
npm run build

```
Locally preview production build:

```bash
# npm
npm run preview
```

## Mobile app

## build app for deployment using capacitor (generate + sync)
```bash
npm run sync
```
Shorthand for the following commands:

# build static elements
```bash
npm run generate
```

# create native build
```bash
npx cap sync
```

## run ios emulator
```bash
npx cap run ios
```