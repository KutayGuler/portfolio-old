<script>
	// @ts-ignore

	import {
		Canvas,
		Scene,
		PerspectiveCamera,
		PointLight,
		AmbientLight,
		WebGLRenderer
	} from 'svelthree';

	import Book from '$lib/Book.svelte';
	import { books } from '$lib/books.json';
	import { fade } from 'svelte/transition';

	let w = innerWidth - 10;
	let h = innerHeight - 10;

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

{#key book}
	<main in:fade>
		{#if !book}
			<h1 id="instruction">Click on any book to show the details.</h1>
			<h4>Hover and scroll to rotate a book.</h4>
		{:else}
			<h2 id="title">{book.title}</h2>
			<p id="author">{book.author}</p>
			<h3>Excerpts ({excerptIndex + 1} / {book.excerpts.length})</h3>
			{#key excerpt}
				<section in:fade>
					<h4>{excerpt.header}</h4>
					<p class="scrollable">{@html excerpt.content}</p>
				</section>
			{/key}
			{#if book.excerpts.length > 1}
				<div class="excerpt-navigation">
					<button on:click={() => navigateExcerpt(-1)}>&lt;</button>
					<button on:click={() => navigateExcerpt(1)}>&gt;</button>
				</div>
			{/if}
		{/if}
	</main>
{/key}

<div class="canvas-container">
	<Canvas let:sti {w} {h} interactive>
		<Scene {sti} let:scene id="scene1">
			<PerspectiveCamera {scene} id="cam1" pos={[15, 15, 25]} lookAt={[0, 0, 0]} />
			<AmbientLight {scene} intensity={0.5} />
			<PointLight {scene} pos={[15, 15, 25]} intensity={0.5} castShadow />
			{#each books as book, index}
				<Book {...book} {scene} {index} height={index} on:toggle={toggle} />
			{/each}
		</Scene>
		<WebGLRenderer {sti} sceneId="scene1" camId="cam1" config={{ antialias: true, alpha: false }} />
	</Canvas>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');
	main {
		z-index: 99;
		position: absolute;
		height: 100%;
		width: 35%;
		background-color: #000000;
		border-right: #d3c2be 5px solid;
		color: white;
		box-sizing: border-box;
		padding: 0 5%;
	}

	.canvas-container {
		position: absolute;
		background-color: black;
		height: 100vh;
		width: 100vw;
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem 0;
		height: 60vh;
		overflow-y: auto;
	}

	.excerpt-navigation {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}

	button {
		width: 10%;
	}

	#title,
	#author {
		text-align: center;
	}

	section p {
		font-family: 'PT Serif', serif;
	}
</style>
