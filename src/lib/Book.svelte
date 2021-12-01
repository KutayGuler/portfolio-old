<script>
	// @ts-nocheck

	import { BoxBufferGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'svelthree';

	import { tween } from './tween.js';

	export let dir;
	export let scene;
	export let dimensions;
	export let height;
	export const unselect = () => {
		if (toggled) handleClick(obj);
	};

	const loader = new TextureLoader();

	let urls = ['', '', '', '', '', ''];
	// TODO: Make a jpg file for the side cover
	let material = urls.map((url) => {
		return url == ''
			? new MeshStandardMaterial({ color: 'gray' })
			: new MeshStandardMaterial({
					map: loader.load(`${dir}/${url}`)
			  });
	});

	let geometry = new BoxBufferGeometry(...dimensions);

	let toggled = false;
	let tweening = false;
	let prev;

	const random = (min, max) => Math.random() * (max - min) + min;

	let rot = [-90, 0, random(80, 100)];
	let pos = [0, height, 0];

	let rotNormalized = rot.map((deg) => Math.PI * (deg / 180));

	async function handleClick(e) {
		if (tweening) return;
		let obj = e.detail.target;
		if (!prev) prev = obj;
		toggled = !toggled;
		tweening = true;

		let args1 = [obj, 'rotation', [0, 0, 0], 1, 'sineInOut'];
		let args = [obj, 'position', [-3, 0, 12], 1, 'sineInOut'];
		let args3 = [obj, 'rotation', rot, 1, 'sineInOut'];
		let args2 = [obj, 'position', pos, 1, 'sineInOut'];

		if (toggled) {
			tween(...args);
			await tween(...args1);
			tweening = false;
		} else {
			tween(...args2);
			await tween(...args3);
			tweening = false;
		}
	}
</script>

<Mesh {scene} {material} {geometry} rot={rotNormalized} {pos} interact onClick={handleClick} />
