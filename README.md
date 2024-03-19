# PolyPlay

## Introduction

PolyNotes is an interactive web application inspired by Google Keep, designed to introduce users to JavaScript programming and DOM manipulation. It utilizes the ES2015 syntax and event management within a web page. The application allows users to create, modify, and delete notes, leveraging the browser's Storage API for data persistence. PolyNotes also integrates ESLint for static code analysis, ensuring adherence to coding conventions for a uniform and standard codebase.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Analysis](#code-analysis)
- [Local Deployment](#local-deployment)
- [Persistence Management](#persistence-management)
- [Key Features and Implementations](#key-features-and-implementations)
- [Unit Testing](#unit-testing)

## Features

- Note Management: Create, edit, and delete notes.
- Data Persistence: Utilizes the browser's Local Storage API.
- Sorting: Sort notes based on their last edit date.
- Keyboard Shortcuts: Provides shortcuts for note actions.
- ESLint Integration: Enforces coding standards through static code analysis.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the root directory of each application (`site-web`).
3. Run `npm ci` to install the necessary libraries defined in `package-lock.json`.

## Usage

To run the application locally:

1. Execute `npm start` in the root directory of both the `site-web`.
2. The ReactJS application will be available at `localhost:3000`, and the NodeJS/Express server will be accessible at `localhost:3000`.

## Dependencies

- React: For building the client-side application.
- NodeJS/Express: For the server-side logic and API.
- MongoDB: For data persistence.
- Other dependencies are listed in the `package-lock.json` files of both the `site-web` and `server` directories.
- 
## Code Analysis

ESLint is used for static code analysis to ensure the code meets defined standards. To run ESLint: `npm run lint`


## Local Deployment

For local deployment, use the `http-server` tool by running `npm start` in the `site-web` directory. Access the application at `localhost:3000` or your IP address.

## Persistence Management

The `StorageManager` class handles note persistence using the Local Storage API. It allows adding, retrieving, modifying, or deleting notes from the storage.

## Key Features and Implementations

### Main Page

- Displays notes sorted by their pinned status.
- Implements interactive UI elements for note management.

### Note Details and Modification

- Provides a detailed view and modification options for each note.
- Supports keyboard shortcuts for efficient note manipulation.

## Unit Testing

Refer to the `TESTS.MD` file for details on implementing unit tests for the `NoteEditor` class.
