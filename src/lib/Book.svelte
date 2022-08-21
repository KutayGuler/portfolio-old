<script lang="ts">
	import { TextureLoader, MeshStandardMaterial, BoxBufferGeometry, Color } from 'three';
	import { Mesh } from '@threlte/core';
	import { tween } from './tween';

	import { createEventDispatcher } from 'svelte/internal';
	const dispatch = createEventDispatcher();

	export let index;
	export let dir;
	export let dimensions;
	export let height;
	export const unselect = () => {
		if (toggled) handleClick(obj);
	};

	const paperColor = new Color('#ffffee');
	const loader = new TextureLoader();

	let urls = ['', 'side.jpg', '', '', 'front.jpg', 'back.jpg'];
	let material = urls.map((url) => {
		return url == ''
			? new MeshStandardMaterial({ color: paperColor })
			: new MeshStandardMaterial({
					map: loader.load(`${dir}/${url}`)
			  });
	});

	let geometry = new BoxBufferGeometry(...dimensions);
	let weight = dimensions[0] * dimensions[1] * dimensions[2];

	let toggled = false;
	let tweening = false;
	let prev;

	const random = (min, max) => Math.random() * (max - min) + min;

	let rotation = {
		x: Math.PI * (-90 / 180),
		y: 0,
		z: Math.PI * (random(80, 100) / 180)
	};

	let position = {
		x: 6,
		y: height,
		z: 0
	};

	let obj;

	async function handleClick(e) {
		if (tweening) return;
		obj = e.detail.object;
		if (!prev) prev = obj;
		toggled = !toggled;
		tweening = true;

		dispatch('toggle', {
			toggled: toggled,
			index: index
		});

		let args1 = [obj, 'rotation', [-10, 0, -6], 1, 'sineInOut'];
		let args = [obj, 'position', [11, 9, 14.5], 1, 'sineInOut'];
		let args3 = [obj, 'rotation', rotation, 1, 'sineInOut'];
		let args2 = [obj, 'position', position, 1, 'sineInOut'];

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

	function handler(e) {
		if (toggled && obj) {
			obj.rotation.y += (3 / weight) * (e.deltaY > 0 ? 1 : -1);
		}
	}

	function addEvent() {
		window.addEventListener('wheel', handler);
	}

	function removeEvent() {
		window.removeEventListener('wheel', handler);
	}
</script>

<Mesh
	on:pointerenter={addEvent}
	on:pointerleave={removeEvent}
	on:click={handleClick}
	interactive
	castShadow
	{position}
	{rotation}
	{material}
	{geometry}
/>
