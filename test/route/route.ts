import Duplo, {zod} from "@duplojs/duplojs";
import {parentPort} from "worker_threads";
import {createTypeInput, GetTypeInput} from "../../scripts";

const duplo = Duplo({port: 1506, host: "localhost", environment: "DEV"});

const testTypeInput = createTypeInput()
.add<"id", number>()
.add<"firstName", string>()
.build();

const testChecker = duplo
.createChecker("testChecker")
.handler(({name, value}: GetTypeInput<typeof testTypeInput>, output) => {
	if(name === "id") return output("info1", value);
	else return output("info2", value);
})
.build();

duplo.declareRoute("GET", "/test/1")
.check(
	testChecker,
	{
		input: () => testTypeInput.id(1),
		catch: (res) => res.code(400).send(),
		indexing: "value",
		result: "info1",
	}
)
.handler(({pickup}, res) => res.code(200).info("s").send(pickup("value")));

duplo.declareRoute("GET", "/test/2")
.check(
	testChecker,
	{
		input: () => testTypeInput.firstName("mathcovax"),
		catch: (res) => res.code(400).send(),
		indexing: "value",
		result: "info2",
	}
)
.handler(({pickup}, res) => res.code(200).info("s").send(pickup("value")));

duplo.launch(() => parentPort?.postMessage("ready"));
