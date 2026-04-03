# BAC Estimator

**Live site:** https://hfoster1.github.io/bac-estimator/

A browser-based Blood Alcohol Content (BAC) estimator built with React. Enter your weight, sex, and the drinks you've consumed (with start times) to get a real-time estimate of your BAC over time, including a chart showing how it rises and falls.

## Features

- Large drink database covering beers, wines, ciders, spirits, RTDs, and more — including many Australian and international brands
- Searchable drink picker with ABV and serve-size details
- BAC calculated using the Widmark formula, accounting for weight, sex, and elapsed time
- Interactive area chart showing your BAC curve over the session
- Reference lines for the Australian legal driving limit (0.05) and general impairment threshold (0.08)
- Runs entirely in the browser — no data is sent anywhere

## Tech

- React 19 + Vite
- Recharts for the BAC chart

## Development

```bash
npm install
npm run dev
```

## Disclaimer

This tool provides estimates only. Actual BAC varies based on many individual factors. Never rely on a BAC estimator to make decisions about driving or operating machinery.
