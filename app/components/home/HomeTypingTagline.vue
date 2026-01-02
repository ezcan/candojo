<script setup lang="ts">
const messages = [
  "鍵盤球迷的觀戰筆記本｜把中華職棒的球員，整理成我喜歡的樣子",
  "資訊教育工作者的學習筆記｜偶爾使用 AI 協作一些教學想法或工具",
  "實況野球的玩家工具箱｜更新頻率屬於懶癌末期，有時只靠「用心」整理"
]

const displayText = ref("")
const currentMsgIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = 150
const deletingSpeed = 50
const pauseDuration = 3000

const type = () => {
  const currentFullText = messages[currentMsgIndex.value]
  
  if (isDeleting.value) {
    // Deleting
    displayText.value = currentFullText.substring(0, displayText.value.length - 1)
  } else {
    // Typing
    displayText.value = currentFullText.substring(0, displayText.value.length + 1)
  }

  // Logic to switch states
  let nextActionDelay = isDeleting.value ? deletingSpeed : typingSpeed

  if (!isDeleting.value && displayText.value === currentFullText) {
    // Finished typing, pause
    nextActionDelay = pauseDuration
    isDeleting.value = true
  } else if (isDeleting.value && displayText.value === "") {
    // Finished deleting, next message
    isDeleting.value = false
    currentMsgIndex.value = (currentMsgIndex.value + 1) % messages.length
    nextActionDelay = 500 // Short pause before starting next message
  }

  setTimeout(type, nextActionDelay)
}

onMounted(() => {
  type()
})
</script>

<template>
  <div class="min-h-[3.5rem] sm:min-h-[2.5rem] flex items-center justify-center overflow-hidden max-w-[90vw] mx-auto">
    <p class="text-[13px] sm:text-[14px] font-bold text-pawa-brown/40 tracking-wide leading-relaxed">
      這裡是...{{ displayText }}
      <span class="inline-block w-[2px] h-[1em] bg-pawa-blue/30 ml-0.5 animate-pulse align-middle"></span>
    </p>
  </div>

</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-pulse {
  animation: pulse 1s infinite step-end;
}
</style>
