<template>
  <q-btn @click="useGoBack" color="white" style="border: #444243 1px solid; border-radius: 12px;" class="no-margin" flat padding="8px" icon="chevron_left"/>

<!--  <q-btn-->
<!--    @click="useGoBack"-->
<!--    icon="chevron_left"-->
<!--    color="primary"-->
<!--    flat-->
<!--    rounded-->
<!--    dense-->
<!--    no-caps-->
<!--  />-->
</template>

<script>
import useGoBack from 'src/use/useGoBack'

export default {
  name: 'PageHeaderBtnBack',
  setup() {
    return {
      useGoBack
    }
  }
}
</script>
