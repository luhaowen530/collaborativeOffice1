<template>
<el-scrollbar wrap-class="scrollbar-wrapper">
  <div class="sidebar-top-header">
    <!-- <img class="top-img-icon" v-if="isCollapse" src="../../../../assets/a1-attack-analysis/icon.png" />
    <img class="top-img-header" v-if="!isCollapse" src="../../../../assets/a1-attack-analysis/top-header.png" /> -->
    浦东新区公共交通有限公司
  </div>
  <div class="sidebar-top-content">
    <el-menu :default-active="$route.path" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss">
.sidebar-top-content {
  .router-link-active {
    position: relative;
  }

  .router-link-active::before {
    position: absolute;
    width: 6px;
    height: 40px;
    top: 5px;
    content: '';
    z-index: 2;
    right: 0px;
    background: #2296F3;
    border-radius: 100px 0px 0px 100px;
  }
}
</style>

<style lang="scss" scoped>
.sidebar-top-header {
  width: 100%;
  height: 50px;
  float: left;
  background: rgb(48, 65, 86);

  .top-img-header {
    width: 171px;
    height: 19px;
    float: left;
    margin: 16px;
  }

  .top-img-icon {
    width: 20px;
    height: 19px;
    float: left;
    margin: 16px;
  }
}

.sidebar-top-content {
  width: 100%;
  height: 100%;
  float: left;
  padding-top: 50px;
  margin-top: -50px;
}
</style>
