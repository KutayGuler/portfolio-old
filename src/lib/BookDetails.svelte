<script>
  //@ts-nocheck
	import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'svelthree';
  import { CSS3DObject } from 'THREE'

  // THREE.JS STUFF
  export let scene;

  // BOOK DETAILS
  // export let title;
  // export let author;
  export let excerpts;

  $: excerpt = excerpts[0];

  let material = new MeshStandardMaterial({ color: 'gray' })
  let geometry = new PlaneGeometry();
</script>

{#key excerpt}
  <div class="excerpt">
    <h1>{excerpt.header}</h1>
    <p>{@html excerpt.content}</p>
  </div>
{/key}

<Mesh {scene} {material} {geometry} />

