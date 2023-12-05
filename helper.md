# Project creation

## Typescript
- install npm
- create ``package.json`` file
``` batch
npm init --yes
```
- save ``typescript`` compiler and loader ``ts-node`` as development dependencies
``` batch
npm i -D typescript ts-node
```
- create `tsconfig.json` file
``` batch
tsc --init
```
- create `.ts`-File
- compile and run compiled ``js``
``` batch
tsc ``[FILENAME].ts``
node [FILENAME].js
```

---
check if this works:
- run script by
``` batch
node --loader ts-node/esm [FILENAME].ts
```