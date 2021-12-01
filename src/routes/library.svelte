<h1>coming soon.</h1>

<!-- <script>
	import {
		Canvas,
		Scene,
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		WebGLRenderer
	} from 'svelthree';

	import Book from '$lib/Book.svelte';
	// @ts-ignore
	import { books } from '$lib/books.json';

	let w = innerWidth;
	let h = innerHeight;

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
</script>

<Canvas let:sti {w} {h} interactive>
	<Scene {sti} let:scene id="scene1">
		<PerspectiveCamera {scene} id="cam1" pos={[15, 15, 25]} lookAt={[0, 0, 0]} />
		<AmbientLight {scene} intensity={0.75} />
		<DirectionalLight {scene} pos={[5, 5, 5]} />

		{#each books as book, i}
			<Book {...book} {scene} height={i} />
		{/each}
	</Scene>

	<WebGLRenderer {sti} sceneId="scene1" camId="cam1" config={{ antialias: true, alpha: false }} />
</Canvas> -->
