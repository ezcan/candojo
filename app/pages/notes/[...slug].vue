<script setup lang="ts">
const route = useRoute()

// 獲取該路徑的筆記內容
const { data: doc } = await useAsyncData(`note-${route.path}`, () => 
  queryCollection('content').path(route.path).first()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Note not found' })
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 lg:py-12 px-4 mb-20">
    <!-- Back Button -->
    <NuxtLink 
      to="/notes" 
      class="inline-flex items-center gap-2 text-pawa-brown font-black text-sm mb-8 hover:-translate-x-1 transition-transform group"
    >
      <span class="pawa-card p-2 bg-white !rounded-xl group-hover:bg-pawa-blue group-hover:text-white transition-colors">⬅️</span>
      返回列表
    </NuxtLink>

    <div v-if="doc">
      <article>
        <!-- Article Header -->
        <header class="mb-12 space-y-4">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-pawa-brown text-white text-[10px] font-black uppercase rounded-lg">
              {{ doc.category }}
            </span>
            <span class="text-xs font-bold text-pawa-brown/40">{{ doc.date }}</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-black text-pawa-brown leading-tight">
            {{ doc.title }}
          </h1>
          <p class="text-lg font-bold text-pawa-brown/60 italic border-l-4 border-pawa-brown/10 pl-4 py-2">
            {{ doc.description }}
          </p>
        </header>

        <!-- Article Content -->
        <div class="pawa-card bg-white p-6 sm:p-10 !rounded-3xl shadow-block">
          <ContentRenderer :value="doc" class="prose prose-pawa max-w-none" />
        </div>
      </article>
    </div>
  </div>
</template>

<style>
/* 擴展 Tailwind Typography 為 Pawa 風格 */
.prose-pawa {
  --tw-prose-body: #1E293B;
  --tw-prose-headings: #1E293B;
  --tw-prose-links: #4C97FF;
  --tw-prose-bold: #1E293B;
  --tw-prose-quotes: #64748B;
  --tw-prose-code: #0F172A;
  --tw-prose-pre-bg: #1E293B;
}

.prose-pawa h1, .prose-pawa h2, .prose-pawa h3 {
  font-weight: 900 !important;
}

.prose-pawa p {
  font-weight: 500;
  line-height: 1.8;
}

.prose-pawa blockquote {
  border-left-color: #E2E8F0;
  font-style: italic;
  font-weight: 700;
}

.prose-pawa code::before, .prose-pawa code::after {
  content: "" !important;
}

.prose-pawa code {
  background-color: #F1F5F9;
  padding: 0.2em 0.4em;
  border-radius: 0.4em;
  font-weight: 700;
}

.prose-pawa pre {
  border-radius: 1rem;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
}

.prose-pawa ul li::marker {
  color: #4C97FF;
}

.prose-pawa a {
  text-decoration: none;
  border-bottom: 2px solid #E2E8F0;
  transition: all 0.2s;
}

.prose-pawa a:hover {
  border-bottom-color: #4C97FF;
  color: #4C97FF;
}
</style>
