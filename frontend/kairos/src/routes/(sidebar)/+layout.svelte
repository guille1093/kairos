<script>
	import '../../app.css';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	let drawerHidden = false;
</script>

<header class="fixed top-0 z-40 mx-auto w-full flex-none bg-white dark:bg-black">
	<Navbar bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex">
	<Sidebar bind:drawerHidden />
	<div class="relative h-full w-full overflow-y-auto lg:ml-64 pt-[70px]">
		<slot />
	</div>
</div>
