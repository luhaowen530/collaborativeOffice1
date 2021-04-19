<template>
  <div class="a1-home">
    门户第一页
  </div>
</template>

<script>
  export default {
    methods: {
      goM() {
        this.$router.push({
          path:'/a2_meeting'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.a1-home {
  width: 100%;
  height: 100%;
}
</style>