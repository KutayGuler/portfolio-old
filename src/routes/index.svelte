<script>
	import { fade } from 'svelte/transition';

	console.info = () => {};

	let originals = [
		"hello, i'm kutay, a computer science student living in wroclaw.",
		'check out my',
		'library',
		'while you are here or click the button below.'
	];

	let justLoaded = true;
	let min = -20;
	let max = 20;

	const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

	let [intro, check, library, outro] = originals;

	function encrypt(index) {
		let original = originals[index];
		let str = Array.from(original).map((_, i) =>
			_ == ' ' ? ' ' : String.fromCharCode(original.charCodeAt(i) + random(min, max))
		);

		return str.join('');
	}

	let phrases = [
		'idk why I added this functionality',
		"it's just nice to look at",
		'so raw, so styleless',
		'pure calculation, zero pretension'
	];

	let timer2;
	let phraseIndex = 0;

	function startTimer() {
		justLoaded = false;
		[min, max] = [-20, 20];
		phraseIndex = 0;
		monologue = phrases[phraseIndex];

		let timer = setInterval(() => {
			if (min == 0) clearInterval(timer);
			[intro, check, library, outro] = originals.map((_, index) => encrypt(index));
		}, 20);
		timer2 = setInterval(() => {
			if (phraseIndex == 4) phraseIndex = 0;
			monologue = phrases[phraseIndex];
			phraseIndex++;
		}, 3000);
	}

	function stopTimer() {
		clearInterval(timer2);
		monologue = '';
		[min, max] = [0, 0];
	}

	let monologue = '';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		{intro}<br /><br />{check}
		<a href="/library">{library}</a>
		{outro}
	</h1>
	<button on:click={min == 0 || justLoaded ? startTimer : stopTimer}
		>{min == 0 || justLoaded ? 'gibberify' : 'stop'}</button
	>
	{#key monologue}
		<h4 in:fade={{ duration: 500 }}>{monologue}</h4>
	{/key}
</section>

<style>
	section {
		font-family: 'Roboto Mono', monospace;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	h1 {
		font-size: 2rem;
		width: 50%;
		padding: 0;
		margin: 0;
	}

	h4 {
		text-align: center;
		width: 50%;
	}

	button {
		margin-top: 5%;
	}

	@media screen and (max-width: 800px) {
		h1 {
			font-size: 1rem;
			width: 60%;
		}
	}
</style>
