import * as easings from 'svelte/easing';

// @ts-nocheck

const FPS = 60;

// TODO: Alternate for rotate

/**
 * @param {Object} obj svelthree component
 * @param {String} attrName "position" || "rotation" || "scale"
 * @param {Array} vals [x, y, z] values of the obj[prop] at the end of the animation
 * @param {Number} duration time in seconds
 * @param {String} easing (optional) (default: "linear") easing function name
 * @param {Object} repeatObj (optional) (default: { count: 0, alternate: true })
 */
export async function tween(
	obj,
	attrName,
	vals,
	duration,
	easing = 'linear',
	repeatObj = {
		count: 0,
		alternate: true
	}
) {
	const res = await new Promise((resolve) => {
		let rAF = 0;
		let f = 0; // a single frame
		let total = FPS * duration;

		if (attrName == 'rotation') {
			vals = vals.map((val) => Math.PI * (val / 180));
		}

		let init = {
			x: obj[attrName].x,
			y: obj[attrName].y,
			z: obj[attrName].z
		};

		let delta = {
			x: Math.abs(init.x - vals[0]),
			y: Math.abs(init.y - vals[1]),
			z: Math.abs(init.z - vals[2])
		};

		let multiplier = {
			x: (init.x < 0 && init.x < vals[0]) || vals[0] > 0 ? 1 : -1,
			y: (init.y < 0 && init.y < vals[1]) || vals[1] > 0 ? 1 : -1,
			z: (init.z < 0 && init.z < vals[2]) || vals[2] > 0 ? 1 : -1
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
