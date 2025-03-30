<script lang="ts">
	let ws = new WebSocket('ws://localhost:8000');
	let messages: string[] = [];

	ws.onopen = (event) => {
		const message = 'WS connection opened'
		messages = [...messages, message];
		ws.send(message);
	};

	ws.onmessage = (message) => {
		messages = [...messages, message.data];
	};

	ws.onclose = (event) => {
		const message = 'WS connection closed'
		messages = [...messages, message];
	};

	const pingHandler = () => ws.send(JSON.stringify({
		type: 'ping',
		timestamp: new Date().toISOString()
	}));
</script>

<ul>
	<button on:click={pingHandler} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
		Send Ping with Timestamp
	</button>

	{#each messages as message}
		<li>
			{message}
		</li>
	{/each}
</ul>
