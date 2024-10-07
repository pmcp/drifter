<template>
  <UContainer>
    <UPage>
      <main>
        <UCard>
          <template #header>
            <mixes-upload />
            <audio-controls />
          </template>
          <client-only>
            <FlowMain class="h-80 w-full"/>
          </client-only>
          <template #footer>
            <action-buttons />
            <comments-list />
            <songs-list />
            <mixes-list />
          </template>
        </UCard>
      </main>
    </UPage>
  </UContainer>
</template>
