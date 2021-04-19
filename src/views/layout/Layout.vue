<template>
<div :class="classObj" class="app-wrapper">
  <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
  <resetPassword :dialogVisible="dialogVisible" @closeDialog="dialogVisible=false" @closePrompt="closePrompt" />
  <sidebar class="sidebar-container" />
  <div class="main-container">
    <navbar />
    <tags-view />
    <app-main />
  </div>
</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import resetPassword from '@/components/ResetDialog/dialog'
import ResizeMixin from './mixin/ResizeHandler'
import { invaliDays } from '@/axios'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    resetPassword
  },
  mixins: [ResizeMixin],
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    // invaliDays().then((response) => {
    //   let data = response.data
    //   let _this = this
    //   if (data.data <= 3) {
    //     this.$notify({
    //       title: '请注意',
    //       type: 'warning',
    //       dangerouslyUseHTMLString: true,
    //       duration: 0,
    //       onClick: function () {
    //         _this.showDialog()
    //       },
    //       message: `密码还有${data.data}天过期，请重新设置密码<br><span style="color: #2296F3;font-weight:bold">设置密码 ></span>`
    //     });
    //   }
    // })
  },
  methods: {
    closePrompt() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    showDialog() {
      this.dialogVisible = true
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
