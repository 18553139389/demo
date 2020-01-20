<template>
  <view class="wrapper">
  </view>
</template>

<script>
  export default {
    data() {
      return {
        forms: ''
      }
    },
    mounted() {
      let form = this.$route.query.forms
      this.forms = form
      const div = document.createElement('div')
      div.innerHTML = form
      document.body.appendChild('div')
      document.forms[0].submit()
    },
    methods: {
      unescape(html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      }
    }
  }
</script>

<style scoped="scoped">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
