# LIVR Playground

Interactive web app for testing [LIVR](http://livr-spec.org) (Language Independent Validation Rules) validators.

**[Live Demo](http://webbylab.github.io/livr-playground)**

## Features

- Write validation rules and test data side-by-side
- Real-time validation feedback
- Includes [livr-extra-rules](https://github.com/koorchik/js-livr-extra-rules) by default
- Supports relaxed JSON input (trailing commas, unquoted keys)
- Shareable URLs - state is persisted in the URL hash

## Development

```bash
npm install
npm start         # http://localhost:1234
```

## Production Build

```bash
npm run build     # outputs to dist/
```

## Links

- [LIVR Specification](http://livr-spec.org)
- [LIVR npm package](https://www.npmjs.com/package/livr)
