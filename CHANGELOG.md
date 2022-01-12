# Change Log

All notable changes to Grocer will be documented in this file.

## 1.0.1 - 2022-01-XX

### Added

- This CHANGELOG file.
- Tests for the NavBar component.

### Changed

- Extract theme from index.tsx to index.styles.tsx (exporting from index.tsx was causing issues with tests).
- Export initial state variables from Redux slice files to assist with tests.
- Update renderWrappedComponent in tests.helpers.tsx to include ThemeProvider and to allow for a preloadedState to be assigned.

## 1.0.0 - 2022-01-06

- Initial release.