# LIVR Playground

Interactive web app for testing [LIVR](http://livr-spec.org) (Language Independent Validation Rules) validators.

**[Live Demo](http://webbylab.github.io/livr-playground)**

## Features

- Write rules and data in editors with syntax highlighting; the result updates as you type
- The result shows the output, the error codes, or where the rules or data can't be parsed (the line is marked)
- Examples for LIVR 2.0, LIVR 2.5 and aliases
- All rules of [LIVR 2.0 and LIVR 2.5](https://livr-spec.org/validation-rules.html) ([livr](https://www.npmjs.com/package/livr) 2.13)
- Plus the rules of [livr-extra-rules](https://github.com/koorchik/js-livr-extra-rules) that LIVR doesn't define (`ipv4`, `md5`, `is`, `list_items_unique`)
- Relaxed JSON input (unquoted keys, single quotes, trailing commas)
- Shareable links: the state is kept in the URL hash, and "Copy link" copies it
- Light and dark themes follow the system setting

## Development

```bash
npm install
npm start         # http://localhost:1234
```

## Production Build

```bash
npm run build     # outputs to dist/
```

## Deploy

The live demo is served by GitHub Pages from the `gh-pages` branch, which holds the contents of
`dist/`. Build, then replace the files of `gh-pages` with `dist/` and push it.

## Links

- [LIVR Specification](http://livr-spec.org)
- [LIVR npm package](https://www.npmjs.com/package/livr)
