bundle:
	deno bundle -c tsconfig.client.json client.tsx client.js

run:
	deno run --allow-net --allow-read -c tsconfig.server.json server.tsx