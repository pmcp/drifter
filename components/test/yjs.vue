<template>
  Status: {{ status }}
  <UInput v-model="testMessageSync" placeholder="test" />
</template>

<script setup lang="ts">

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const status = ref("connecting");
const room = ref("default");
const testMessageSync = ref("");

onMounted(() => {
  // Create a new Yjs document
  const ydoc = new Y.Doc();

  // Connect to the sync provider ws server
  const wsProto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${wsProto}//${window.location.host}/api/yjs`;
  const provider = new WebsocketProvider(wsUrl, "tiptap", ydoc);

  // Update status changes
  const statusHandler = (event: { status: string }) => {
    status.value = event.status;
  };
  provider.on("status", statusHandler);
})


</script>
