import { PortModel, AbstractPortFactory } from 'storm-react-diagrams';

class $PortFactory extends AbstractPortFactory {
	cb: (initialConfig?: any) => PortModel;

	constructor(type: string, cb: (initialConfig?: any) => PortModel) {
	  super(type);
		this.cb = cb;
	}

	getNewInstance(initialConfig?: any): PortModel {
		return this.cb(initialConfig);
	}
}


export default $PortFactory;
