<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em',
})

const iconStyle = computed(() => {
  let sizeValue = props.size
  if (typeof sizeValue === 'number') {
    sizeValue = `${sizeValue}px`
  } else if (!isNaN(Number(sizeValue)) && sizeValue !== '') {
    sizeValue = `${sizeValue}px`
  }
  
  const iconPath = `/icons/${props.name}.svg`
  
  return {
    width: sizeValue,
    height: sizeValue,
    minWidth: sizeValue,
    minHeight: sizeValue,
    backgroundColor: props.color || 'currentColor',
    maskImage: `url('${iconPath}')`,
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskImage: `url('${iconPath}')`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
    display: 'inline-block',
    verticalAlign: 'middle',
  }
})
</script>

<template>
  <span 
    class="ui-icon transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-115 group-hover:-rotate-12 group-hover:brightness-110" 
    :style="iconStyle"
    :data-icon="name"
    aria-hidden="true"
  >
    <i class="opacity-0 block w-full h-full">&nbsp;</i>
  </span>
</template>
