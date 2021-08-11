<script>
    import {onMount, onDestroy} from 'svelte'
  import TailwindCSS from './style/TailwindCSS.svelte';
  import Home from './pages/home.svelte';
  import Shop from './pages/shop.svelte';
  let pages = 'home'
  // onDestroy(() =>  window.removeEventListener('message', window.listener));
  onMount(() => {
 
  });
</script>

<TailwindCSS />
<main >
  {#if (pages == 'home')}
  <Home bind:pages={pages}/>
  {:else}
  <Shop bind:pages={pages}/>
  {/if}
  
 
</main>

<style lang="postcss">

  

</style>
