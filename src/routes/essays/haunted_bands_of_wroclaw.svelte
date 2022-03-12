<script>
	// @ts-ignore
	import * as Pancake from '@sveltejs/pancake';

	let y;

	const NO_NOSTALGIA = 0;
	const MODERATE_NOSTALGIA = 50;
	const PURE_NOSTALGIA = 100;

	$: blur = y > 1000 ? 10 : y / 100;
	$: console.log(blur);
</script>

<svelte:head>
	<title>OUR DISAPPEARING FUTURE: Haunted Bands of Wroclaw</title>
</svelte:head>

<img src="../tamka.jpg" alt="" style="filter: blur({blur}px); transform: scale(1.1);" />

<div class="title-container" style=" opacity: {100 - y / 8}%; transform: scale({1 - y / 3000});">
	<div id="title">
		<h1>OUR</h1>
		<h1>DISAPPEARING</h1>
		<h1>FUTURE</h1>
		<p>Haunted Bands of Wroclaw</p>
	</div>
</div>

<main>
	<h3 id="date">24.01.2022</h3>
	<!-- <Pancake.Chart x1={0} x2={100} y1={0} y2={200}>
		<Pancake.Grid horizontal count={5} let:value let:last>
			<div class="grid-line horizontal"><span>{value} {last ? 'ppm' : ''}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={5} let:value>
			<div class="grid-line vertical" />
			<span class="year-label">{value}</span>
		</Pancake.Grid>
	</Pancake.Chart> -->

	<p>
		Before diving into any arguments, I think I should address the title of this essay. It's quite a
		mouthful and it begs a number of questions. Such as: How is it possible that our future, which
		is just a temporal concept, can disappear? How is it possible for a music band to be haunted?
		And how are these two seemingly unrelated things are two sides of the same coin? All of these
		questions will be addressed as we explore these concepts together.
	</p>
	<p>
		You might find the arguments in this essay absolute bullshit or mildly interesting. If you read
		till the end, please let me know which side you felt closer to. In either case, I think this
		essay is a humble attempt to create some bad vibes in the time of good vibes only. After all, if
		there is nothing to compliment the good vibes, the concept of good vibes loses it's meaning and
		all vibes turn into banal flatteries which tailors a monotonous cultural fabric. And this very
		monotony is going to be the focal point of this essay.
	</p>

	<div class="definition">
		<h1 id="monotonous">monotonous</h1>
		<p>/məˈnätnəs/</p>
		<i style="font-size: 1.6rem;">adjective</i>
		<p>dull, tedious, and repetitious; <b>lacking in variety and interest.</b></p>
	</div>
</main>

<svelte:window bind:scrollY={y} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');
	/* @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap'); */

	@import url('https://fonts.googleapis.com/css2?family=Amiri&family=Outfit:wght@500&family=Work+Sans:wght@500&display=swap');

	main {
		font-family: 'Amiri', serif;
		position: relative;
		background-color: white;
		width: 70vw;
		align-self: center;
	}

	p {
		font-size: 1.6rem;
	}

	.definition p,
	h1 {
		padding: 0;
		margin: 0;
	}

	.title-container {
		font-family: 'Work Sans', sans-serif;
		top: 5%;
		width: 100%;
		position: fixed;
		color: white;
	}

	#title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
	}

	#title h1 {
		margin: 1vh;
		font-size: 8rem;
	}

	#date {
		position: absolute;
		top: -5vh;
		right: 0;
		color: white;
	}

	main {
		padding: 8%;
		margin-top: 125vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	img {
		position: fixed;
		object-fit: cover;
		width: 100vw;
		height: 100vh;
		z-index: -100;
	}
</style>
