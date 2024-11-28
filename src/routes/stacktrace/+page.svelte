<script lang="ts">
	import { error } from './stores';
	const { message, clazz, stacktrace } = $error!;
</script>

<div class="w-full overflow-y-auto p-4 text-red-600">
	<h1 class="text-2xl font-bold underline underline-offset-4">{clazz}:</h1>
	<h3 class="ml-6 text-xl">"{message}"</h3>
	<br />
	<h3 class="text-xl underline">Stacktrace:</h3>
	<p class="text-lg">{stacktrace}</p>
</div>
