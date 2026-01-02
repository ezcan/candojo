<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen paper-bg flex flex-col">
    <AppHeader />
    <main 
      class="pawa-container flex-grow"
      :class="!isHome ? 'pb-28 sm:pb-12' : 'pb-12'"
    >
      <slot />
    </main>
    <AppFooter />
  </div>

</template>




