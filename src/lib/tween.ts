import * as easings from 'svelte/easing';

// the lower the number, the faster the animation
const FPS = 60;

/**
 * @param {String} attrName
 * @param {Array} vals [x, y, z] values of the obj[prop] at the end of the animation
 * @param {Number} duration time in seconds
 * @param {String} easing (optional) (default: "linear") easing function name
 * @param {Object} repeatObj (optional) (default: { count: 0, alternate: true })
 */
export async function tween(
	obj: Object,
	attrName: 'position' | 'rotation' | 'scale',
	vals: { x: number; y: number; z: number },
	duration: number,
	easing = 'linear',
	repeatObj = {
		count: 0,
		alternate: true
	}
) {
	console.log(obj);
	const res = await new Promise((resolve) => {
		let rAF = 0;
		let f = 0; // a single frame
		let total = FPS * duration;

		if (attrName == 'rotation') {
			vals.x = Math.PI * (vals.x / 180);
			vals.y = Math.PI * (vals.y / 180);
			vals.z = Math.PI * (vals.z / 180);
		}

		let init = {
			x: obj[attrName].x,
			y: obj[attrName].y,
			z: obj[attrName].z
		};

		let delta = {
			x: Math.abs(init.x - vals.x),
			y: Math.abs(init.y - vals.y),
			z: Math.abs(init.z - vals.z)
		};

		let multiplier = {
			x: init.x < vals.x ? 1 : -1,
			y: init.y < vals.y ? 1 : -1,
			z: init.z < vals.z ? 1 : -1
		};

		function animate() {
			if (f == total + 1) {
				cancelAnimationFrame(rAF);
				repeatObj.count -= 1;

				// hijacking the readonly attribute of obj
				if (!repeatObj.alternate && repeatObj.count > 0) {
					Object.defineProperty(obj, attrName, {
						writable: true,
						value: {
							x: init.x,
							y: init.y,
							z: init.z
						}
					});
				}

				resolve([obj, attrName, vals, duration, easing, repeatObj]);
				return;
			}

			let xyz = repeatObj.alternate
				? {
						x: init.x + delta.x * easings[easing](f / total) * multiplier.x,
						y: init.y + delta.y * easings[easing](f / total) * multiplier.y,
						z: init.z + delta.z * easings[easing](f / total) * multiplier.z
				  }
				: {
						x: delta.x * easings[easing](f / total) * multiplier.x,
						y: delta.y * easings[easing](f / total) * multiplier.y,
						z: delta.z * easings[easing](f / total) * multiplier.z
				  };

			Object.assign(obj[attrName], xyz);
			f++;
			rAF = requestAnimationFrame(animate);
		}

		rAF = requestAnimationFrame(animate);
		// @ts-ignore
	}).then((args) => {
		// repeatObj.count
		if (args[5].count <= 0) {
			return true;
		} else {
			// @ts-ignore
			return tween(...args);
		}
	});
}
