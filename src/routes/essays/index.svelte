<script>
	let essays = [
		{
			href: 'haunted_bands_of_wroclaw',
			title: 'Our Disappearing Future: Haunted Bands of Wroclaw'
		}
	];
</script>

<main>
	<h1>essays</h1>
	<p>coming soon.</p>
	<!-- {#each essays as { href, title }}
		<a href="essays/{href}">{title}</a>
	{/each} -->
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 5%;
		gap: 2.5vh;
		width: 75vw;
	}

	a {
		font-family: 'Roboto Mono', monospace;
		font-weight: bold;
		font-size: 1.5rem;
	}
</style>
