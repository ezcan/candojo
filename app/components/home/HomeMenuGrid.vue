<template>
  <section class="grid gap-4 sm:gap-6 lg:gap-4 grid-cols-2 lg:grid-cols-4 auto-rows-[160px] lg:auto-rows-[170px]">
    <UiBlockTile 
      theme="cream"
      class="col-span-2 lg:col-span-4 row-span-3 lg:row-span-2"
      :interactive="false"
    >
      <HomePlayerPreviewContent />
    </UiBlockTile>

    <UiBlockTile to="/kanji" theme="blue" center class="col-span-1 row-span-1">
      <div>
        <div class="mb-1">
          <UiIcon name="analytics-magnifying-glass" size="40" />
        </div>
        <div class="text-lg font-black leading-tight">漢字查詢</div>
        <div class="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Dictionary</div>
      </div>
    </UiBlockTile>

    <UiBlockTile to="/notes" theme="red" center class="col-span-1 row-span-1">
      <div>
        <div class="mb-1">
          <UiIcon name="lightbulb-on" size="40" />
        </div>
        <div class="text-lg font-black leading-tight">學習筆記</div>
        <div class="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Notes</div>
      </div>
    </UiBlockTile>

    <UiBlockTile to="/tools" theme="yellow" center class="col-span-1 row-span-1">
      <div>
        <div class="mb-1">
          <UiIcon name="tool-box" size="40" />
        </div>
        <div class="text-lg font-black leading-tight">工具</div>
        <div class="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Tools</div>
      </div>
    </UiBlockTile>

    <UiBlockTile to="/about" theme="green" center class="col-span-1 row-span-1">
      <div>
        <div class="mb-1">
          <UiIcon name="info" size="40" />
        </div>
        <div class="text-lg font-black leading-tight">關於我</div>
        <div class="text-[10px] font-bold opacity-60 uppercase tracking-tighter">About</div>
      </div>
    </UiBlockTile>
  </section>
</template>