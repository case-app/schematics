# Abacus schematics
This repository is a set of Abacus Framework schematics for nestjs. 

## Development

```bash
npm run build:watch
npm run move // Manual action if changes in /files directory. 
```

To link and use in abacus-framework :

```bash
cd dist
npm link // May required sudo.
```
and then in the root of the server project of abacus-framework : 
```bash
npm link abacus-schematics
```

## Publishing

To publish, simply do:

```bash
npm run build
cd dist
npm publish
```

That's it!