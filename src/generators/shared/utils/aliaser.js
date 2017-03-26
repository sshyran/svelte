import reservedNames from '../../../utils/reservedNames.js';

let globalAliases = new Map();
let globalUsedNames = new Set();

export function initAliaser ( generator ) {
	globalAliases = new Map();
	globalUsedNames = new Set( generator.importedNames );
}

export function getGlobalAlias ( name ) {
	if ( globalAliases.has( name ) ) {
		return globalAliases.get( name );
	}
	const alias = getUniqueGlobalAlias( name );
	globalAliases.set( name, alias );
	return alias;
}

export function getUniqueGlobalAlias ( name ) {
	let alias = name;
	for ( let c = 1; reservedNames.has( alias ) || globalUsedNames.has( alias ); alias = `${name}$${c++}` );
	globalUsedNames.add( alias );
	return alias;
}

export function getUniqueLocalAliasMaker ( params ) {
	const localUsedNames = new Set( params );
	return name => {
		let alias = name;
		for ( let c = 1; reservedNames.has( alias ) || globalUsedNames.has( alias ) || localUsedNames.has( alias ); alias = `${name}$${c++}` );
		localUsedNames.add( alias );
		return alias;
	};
}
