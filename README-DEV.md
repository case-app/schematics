# CASE schematics

This repository is a set of CASE Framework schematics for nestjs.

## Development

```bash
npm run build:watch
npm run move // Manual action if changes in /files directory.
```

To link and use in CASE :

```bash
cd dist
npm link // May required sudo.
```

and then in the root of the server project of CASE :

```bash
npm link @case-app/schematics
```

## Publishing

To publish, simply do:

```bash
npm run publish
```

That's it!
