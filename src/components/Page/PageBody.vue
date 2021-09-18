<template>
  <div class="page-body absolute-top fit">

    <div class="page-body-spacer-header"/>

    <slot />
    <div class="page-body-spacer-footer"/>

<!--    <page-footer v-if="$q.screen.gt.xs"/>-->

  </div>
</template>

<script>
export default {
  name: 'PageBody',
}
</script>
