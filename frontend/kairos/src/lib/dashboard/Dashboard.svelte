<script lang="ts">
	import thickbars from '$lib/graphs/thickbars';
	import ChartWidget from '$lib/widgets/ChartWidget.svelte';
	import { Card, Chart } from 'flowbite-svelte';
	import type { PageData } from '../../routes/(sidebar)/$types';
	import Stats from './Stats.svelte';
	import users from '$lib/graphs/users';
	import DarkChart from '$lib/widgets/DarkChart.svelte';
	import { onMount } from 'svelte';
	import chart_options_func from '../../routes/(sidebar)/dashboard/chart_options';
	import ActivityList from './ActivityList.svelte';
	import Change from './Change.svelte';
	import Chat from './Chat.svelte';
	import DesktopPc from './DesktopPc.svelte';
	import Insights from './Insights.svelte';
	import Traffic from './Traffic.svelte';
	import Transactions from './Transactions.svelte';

	export let data: PageData;

	let chartOptions = chart_options_func(false);
	chartOptions.series = data.series;
	console.log(chartOptions);

	let currentWeekDaysWithDate = [];
	const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
	const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
	const currentDate = new Date();
	for (let i = 0; i < 7; i++) {
		const day = currentDate.getDate() + i;
		const month = currentDate.getMonth();
		const dayWithDate = `${days[(currentDate.getDay() + i) % 7]} ${day} ${months[month]}`;
		currentWeekDaysWithDate.push(dayWithDate);
	}

    chartOptions.xaxis.categories = currentWeekDaysWithDate;

	chartOptions.series[0].name = 'Esta semana';
	chartOptions.series[1].name = 'Semana pasada';
	console.log(chartOptions.series[0].data[0]);
	chartOptions.series[0].data[0] = 4;
	chartOptions.series[0].data[1] = 5;
	chartOptions.series[0].data[2] = 8;
	chartOptions.series[0].data[3] = 3;
	chartOptions.series[0].data[4] = 6;
	chartOptions.series[0].data[5] = 6;
	chartOptions.series[0].data[6] = 7;
	chartOptions.series[0].data[7] = 5;

	chartOptions.series[1].data[0] = 7;
	chartOptions.series[1].data[1] = 4;
	chartOptions.series[1].data[2] = 8;
	chartOptions.series[1].data[3] = 8;
	chartOptions.series[1].data[4] = 5;
	chartOptions.series[1].data[5] = 6;
	chartOptions.series[1].data[6] = 6;
	chartOptions.series[1].data[7] = 8;




	let dark = false;

	function handler(ev: Event) {
		if ('detail' in ev) {
			chartOptions = chart_options_func(ev.detail);
			chartOptions.series = data.series;
			dark = !!ev.detail;
		}
	}

	onMount(() => {
		document.addEventListener('dark', handler);
		return () => document.removeEventListener('dark', handler);
	});
</script>

<div class="mt-px space-y-4">
	<div class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<ChartWidget {chartOptions} title="14:40" subtitle="Esta semana" />
		<Stats />
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Card horizontal class="items-center justify-between dark:bg-black dark:border-primary-600" size="xl">
			<div class="w-full">
				<p>New products</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					2,340
				</p>
				<Change size="sm" value={12.5} since="Since last month" />
			</div>
			<Chart options={thickbars} class="w-full" />
		</Card>
		<Card horizontal class=" dark:bg-black dark:border-primary-600 items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" />
			</div>
			<DarkChart configFunc={users} class="w-full" />
		</Card>
		<Card horizontal class=" dark:bg-black dark:border-primary-600 items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" class="w-full" />
			</div>
			<DarkChart configFunc={(d)=>{const x = users(d); x.plotOptions.bar.horizontal=true; return x}} class="w-full"/>
		</Card>
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<Chat />
		<div class="flex flex-col gap-4">
			<DesktopPc />
			<Traffic {dark} />
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<ActivityList />
		<Insights />
	</div>

	<Transactions {dark} />
</div>
