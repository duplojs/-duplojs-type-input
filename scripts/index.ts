type TypeInputFunction<nameInput extends string, valueInput extends unknown> = (value: valueInput) => {
    name: nameInput,
    value: valueInput,
}

interface BuilderPatternCreateTypeInput<typeInputObject extends Record<string, any>> {
    add<
        nameInput extends string, 
        valueInput extends unknown
    >(): BuilderPatternCreateTypeInput<typeInputObject & {[prop in nameInput]: valueInput}>;

    build(): {[prop in keyof typeInputObject]: prop extends string ? TypeInputFunction<prop, typeInputObject[prop]> : never};
}

export type GetTypeInput<
    typeInput extends ReturnType<BuilderPatternCreateTypeInput<Record<string, any>>["build"]>, 
    nameInput extends keyof typeInput = keyof typeInput,
> = ReturnType<typeInput[nameInput]>;

export function createTypeInput(){
	return {
		add(){
			return this;
		},
		build(){
			return new Proxy(
                {} as any,
                {
                	get(target, name: string){
                		return target[name] || (target[name] = (value: any) => ({name: name, value}));
                	}
                }
			);
		} 
	} as BuilderPatternCreateTypeInput<{}>;
}
