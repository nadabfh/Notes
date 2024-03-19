# Testing in PolyNotes

## Overview

In PolyNotes, we ensure the reliability and quality of our application through extensive testing using [Cypress](https://www.cypress.io/) for end-to-end (E2E) tests and [Jest](https://jestjs.io/) for unit testing. Follow the instructions below to run these tests.

## Cypress End-to-End (E2E) Tests

Cypress is used for E2E testing to simulate real user scenarios and interactions within the application.

### Running E2E Tests

**Interactive Mode with UI:**
`npm run test` This opens the Cypress Test Runner, allowing you to watch the tests as they run.
**Headless Mode:**
`npm run test:headless`

For CI/CD pipelines or for a faster test run, this mode runs tests in the command line without opening a browser window.

E2E tests are located in the `e2e` directory and include tests for:
- The main page interactions
- Creating new notes
- Interacting with existing notes
- Detail view of notes
- A full system test simulating user actions from note creation to modification

Note: The provided tests are comprehensive but do not cover 100% of the application. Some manual review may be required.

## Jest Unit Tests

Jest is utilized for unit testing, focusing on the isolated testing of individual components to ensure correct functionality.

### Running Unit Tests

To execute the Jest unit tests: `npm run unit-test` : 
This command runs all unit tests defined in the project and outputs the results to the terminal.

Unit testing in this project is primarily focused on the `NoteEditor` class. You are responsible for writing comprehensive tests for this class, which can be found in `noteEditor.spec.js`. Utilize mocks, stubs, and spies to effectively test the class in isolation.
