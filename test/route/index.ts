import {zod} from "@duplojs/duplojs";
import {workerTesting} from "@duplojs/worker-testing";

export default workerTesting(
	__dirname + "/route.ts",
	[
		{
			title: "type input id",
			url: "http://localhost:1506/test/1",
			method: "GET",
			response: {
				code: 200,
				info: "s",
				body: zod.literal("1")
			}
		},
		{
			title: "type input id retry",
			url: "http://localhost:1506/test/1",
			method: "GET",
			response: {
				code: 200,
				info: "s",
				body: zod.literal("1")
			}
		},
		{
			title: "type input firstname",
			url: "http://localhost:1506/test/2",
			method: "GET",
			response: {
				code: 200,
				info: "s",
				body: zod.literal("mathcovax")
			}
		},
		{
			title: "type input firstname retry",
			url: "http://localhost:1506/test/2",
			method: "GET",
			response: {
				code: 200,
				info: "s",
				body: zod.literal("mathcovax")
			}
		},
	]
);
