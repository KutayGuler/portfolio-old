<script lang="ts">
	import Book from '../lib/Book.svelte';
	import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		HemisphereLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera
	} from '@threlte/core';
	import { spring } from 'svelte/motion';

	const scale = spring(1);

	import { books } from '$lib/books.json';
	console.log(books);

	let w, h;

	let heights = books.map((book) => book.dimensions[2]);

	// TODO: fix height thing
	function getHeights(i) {
		if (i == 0) return 0;

		let h = 0;

		for (let j = 0; j < i; j++) {
			h += heights[j];
			// h += 1;
		}

		return h;
	}

	let bookIndex = null;
	let excerptIndex = null;

	$: book = books[bookIndex];
	$: excerpt = book?.excerpts[excerptIndex];

	function navigateExcerpt(operation) {
		const max = book.excerpts.length - 1;

		if ((excerptIndex == 0 && operation == -1) || (excerptIndex == max && operation == 1)) {
			return;
		}

		excerptIndex += operation;
	}

	function toggle(e) {
		e = e.detail;
		bookIndex = e.toggled ? e.index : null;
		excerptIndex = 0;
	}
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<main>
	<Canvas>
		<PerspectiveCamera position={{ x: 50, y: 50, z: 50 }} fov={24}>
			<OrbitControls
				maxPolarAngle={DEG2RAD * 80}
				autoRotate={false}
				enableZoom={false}
				target={{ y: 2.5 }}
			/>
		</PerspectiveCamera>

		<DirectionalLight shadow position={{ x: 15, y: 50, z: 50 }} />
		<DirectionalLight position={{ x: -15, y: 50, z: -50 }} intensity={1} />
		<AmbientLight intensity={1} />

		{#each books as { dir, dimensions }, index}
			<Book {dimensions} {dir} {index} height={index} />
		{/each}

		<!-- Cube -->
		<!-- <Group scale={$scale}>
			<Mesh
				interactive
				on:pointerenter={() => ($scale = 2)}
				on:pointerleave={() => ($scale = 1)}
				position={{ y: 5 }}
				castShadow
				geometry={new BoxBufferGeometry(10, 10, 10)}
				material={new MeshStandardMaterial({ color: '#333333' })}
			/>
		</Group> -->

		<!-- Floor -->
		<Mesh
			receiveShadow
			rotation={{ x: -90 * (Math.PI / 180) }}
			geometry={new CircleBufferGeometry(15, 360)}
			material={new MeshStandardMaterial({ side: DoubleSide, color: 'white' })}
		/>
	</Canvas>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
	}
</style>
