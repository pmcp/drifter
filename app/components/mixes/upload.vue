<template>

      <UForm @submit.prevent="uploadMix" class="flex flex-row justify-between gap-2" >
        <UInput
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          accept="audio"
          name="mix"
          />
        <UButton type="submit">
          Upload
        </UButton>
      </UForm>

</template>

<script setup lang="ts">
const { data: mixes, refresh } = await useFetch('/api/mixes')


async function uploadMix (e: Event) {
  // https://hub.nuxt.com/docs/storage/blob#useupload
  const upload = useUpload('/api/mixes/upload', {
    multiple: false
  })
  const form = e.target as HTMLFormElement
  // TODO: use MultiPart: https://hub.nuxt.com/docs/features/blob#handlemultipartupload
  await upload(form.mix)
    .then(async () => {
      form.reset()
      await refresh()
    })
    .catch((err) => alert('Failed to upload mix:\n'+ err.data?.message))
}

async function deleteMix (pathname: string) {
  await $fetch(`/api/mixes/${pathname}`, { method: 'DELETE' })
  await refresh()
}
</script>
