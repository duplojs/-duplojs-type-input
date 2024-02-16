# duplojs-type-input
[![NPM version](https://img.shields.io/npm/v/@duplojs/type-input)](https://www.npmjs.com/package/@duplojs/type-input)

## Instalation
```
npm i @duplojs/type-input
```

## Utilisation
```ts
import Duplo, {zod} from "@duplojs/duplojs";
import {createTypeInput, GetTypeInput} from "@duplojs/type-input";

const typeInput = createTypeInput()
.add<"id", number>()
.add<"firstname", string>()
.add<"ageAndWeight", {age: number, weight: number}>()
.build();

typeInput.id(1); // {name: "id", value: 1}
typeInput.firstname("mathcovax"); // {name: "firstname", value: "mathcovax"}
typeInput.ageAndWeight({age: 21, weight: 74}); // {name: "ageAndWeight", value: {age: 21, weight: 74}}

const duplo = Duplo({port: 1506, host: "localhost", environment: "DEV"});

const testChecker = duplo
.createChecker("testChecker")
.handler(({name, value}: GetTypeInput<typeof typeInput>, output) => {
	if(name === "id") return output("info1", value);
	else return output("info2", value);
})
.build();

duplo.declareRoute("GET", "/")
.check(
    testChecker,
    {
        input: () => typeInput.id(1),
        result: "info1",
        catch: (res) => res.code(400).send(),
        indexing: "value",
    }
)
.handler(({pickup}, res) => res.code(200).info("s").send(pickup("value")));

duplo.launch();
```