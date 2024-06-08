<script lang="ts">
	import type { PageData } from './$types';
	import Dashboard from '../../lib/dashboard/Dashboard.svelte';
	import MetaTag from '../utils/MetaTag.svelte';
	export let data: PageData;

	const path: string = '';
  const description: string = 'KAIROS';
  const title: string = 'KAIROS';
  const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="p-4">
	<Dashboard {data} />
</main>
