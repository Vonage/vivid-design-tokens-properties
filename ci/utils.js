export function copySorted(source, target) {
	if (!source || typeof source !== 'object') {
		throw new Error(`source parameter MUST be an non-null object; got '${source}'`);
	}
	if (!target || typeof target !== 'object') {
		throw new Error(`target parameter MUST be an non-null object; got '${target}'`);
	}

	Object.keys(source).sort().forEach(key => {
		let s = source[key];
		if (s && typeof s === 'object') {
			s = copySorted(s, {});
		}
		target[key] = s;
	});

	return target;
}