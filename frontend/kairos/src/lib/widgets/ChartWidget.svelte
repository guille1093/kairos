<script lang="ts">
	import Change from '$lib/dashboard/Change.svelte';
	import type { ApexOptions } from 'apexcharts';
	import { Card, Chart, Heading } from 'flowbite-svelte';
	import LastRange from './LastRange.svelte';
	import More from './More.svelte';

	export let title: string = '';
	export let subtitle: string = '';
	export let chartOptions: ApexOptions;
</script>

<Card size="xl" class="w-full max-w-none 2xl:col-span-2 dark:bg-black dark:border-primary-600">
					<div class="mb-4 flex items-center gap-2 text-lg font-medium text-primary-600">
						<i class="fi fi-rs-time-check"></i><span>Horas trabajadas</span>
					</div>
	<div class="mb-4 flex items-center justify-between">
		<div class="flex-shrink-0">
			<Heading tag="h3" class="text-2xl">{title}</Heading>
			<p class="text-base font-light text-gray-500 dark:text-gray-400">{subtitle}</p>
		</div>
		<Change value={12.5} since="" class="justify-end font-medium" />
	</div>

	<Chart options={chartOptions}></Chart>
</Card>

<!--
@component
[Go to docs](https://flowbite-svelte-admin-dashboard.vercel.app/)
## Props
@prop export let title: string = '';
@prop export let subtitle: string = '';
@prop export let chartOptions: ApexOptions;
-->
