# NASA Image Gallery Front-end Engineer Assignment

## Setup and run
`nvm use v19.3.0`
`npm run project`
This will install dependencies for both projects.

### Run tests
### `npm run test:ui`

### Linting the codebase
### `npm run eslint`
<br />

# Code structure

##  Form validation
  The form validation is wired via explicit strongly typed schema fashion.

## Testing
  **testing-library** is used to interact with app the same way as your users do.
  **msw** provides mechanics to introspect the HTTP requests and mock the data.

##  Styling
  The primitives are built leveraging variants API, by following this pattern:
  base css, variants, default variant, and compound variant.
  The margin of the primitives is zero, the primitives don't have media queries,
  the layout decisions are made with parent containers.

## Data Fetching 
Redux toolkit is used for data fetching
