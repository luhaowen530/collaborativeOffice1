<template>
    <div @mouseleave="mouseOut" class="a2-workbench-sidebar">
        <div v-if="divShow" @mouseover="mouseIn" class="side_menu_div"></div>
        <div class="side_menu_icon">
            <div class="side-menu-icon-left" v-if="hiddenWorkbenchText">
                <img class="side-menu-logo" src="@/assets/sidebar/a2-side.png" alt="">
                <span class="side-menu-title">首页</span>
            </div>
            <!-- <img class="side-menu-ding" :src="dingSrc" @click="menuStateChange"> -->
        </div>
        <div class="side_menu_list">
            <el-aside :width="tabWidth+'px'">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="activeIndex">
                    <template v-for="(item,index) in menuList">
                        <el-menu-item v-if="item.children && item.children.length == 0" :key="index" :index="String(index + 1)" @click="changeBtnStyle(index)">
                            <span slot="title">{{ item.title }}</span>
                            <i class="iconfont el-weibiaoti12"></i>
                            <span slot="title" v-if="item.unReadNum" class="un-read-num">{{ item.unReadNum }}</span>
                        </el-menu-item>
                        <el-submenu v-else :key="index" :index="String(index + 1)">
                            <template slot="title">
                                <i class="iconfont el-weibiaoti12"></i>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(child,index2) in item.children" :key="child.title" :index="String((index + 1) + '-' + index2 )" @click="changeBtnStyle(index,index2)"><i class="iconfont el-weibiaoti12"></i>{{child.title}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-aside>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cable: 0,
            startRouter:"/workbench/needDealt",
            isCollapse: false,
            divShow: false,
            dingSrc: require('@/assets/sidebar/ding.png'),
            tabWidth: "240",
            activeIndex: '1',
            menuList: [
                { title: "智能柜用户管理", unReadNum: 0, children:[] },
                { title: "工作单管理", unReadNum: 0, children:[] },
                { title: "票胆管理", unReadNum: 0, children:[{title: "二维码管理", unReadNum: 0,},{title: "基础数据管理", unReadNum: 0,},{title: "出入库查询", unReadNum: 0,}] },
                { title: "停车场管理", unReadNum: 0, children:[]  },
                { title: "区域管理", unReadNum: 0, children:[]  },
                { title: "智能柜管理", unReadNum: 0, children:[]  },
                { title: "智能柜操作记录管理", unReadNum: 0, children:[]  },
                { title: "系统管理员管理", unReadNum: 0, children:[]  },
                { title: "个人中心", unReadNum: 0, children:[]  },
                { title: "智能柜规格数据管理", unReadNum: 0, children:[]  }
            ],
            unReadNum: 0,
            hiddenWorkbenchText: true
        }
    },
    methods: {
        // 鼠标离开事件
        mouseOut() {
            if (this.cable == 1) {
                this.isCollapse = true;
                this.divShow = true
                this.$emit("changeSideWidth", true)
                this.hiddenWorkbenchText = false
            }
        },
        // 鼠标进入事件
        mouseIn() {
            this.isCollapse = false;
            this.divShow = false
            this.$emit("changeSideWidth", false)
            this.hiddenWorkbenchText = true
        },
        // 图钉点击事件
        menuStateChange() {
            if (this.cable == 0) {
                this.isCollapse = !this.isCollapse;
                if (!this.isCollapse) {
                    this.cable = 0;
                    this.dingSrc = require('@/assets/sidebar/ding.png')
                    this.$emit("changeSideWidth", false)
                    this.hiddenWorkbenchText = true
                } else {
                    setTimeout(() => {
                        this.divShow = true
                    }, 300)
                    this.cable = 1;
                    this.dingSrc = require('@/assets/sidebar/ding-tilt.png')
                    this.$emit("changeSideWidth", true)
                    this.hiddenWorkbenchText = false
                }
            } else {
                this.dingSrc = require('@/assets/sidebar/ding.png')
                this.cable = 0;
                this.$emit("changeSideWidth", false) 
                this.hiddenWorkbenchText = true
            }
        },
        // 菜单点击跳转路由
        changeBtnStyle(val,val2) {
            if(val2 == undefined) {
                if (val == 0) {        
                    this.$router.push({
                        path: "/workbench/needDealt"
                    });
                } else if (val == 1) {
                    this.$router.push({
                        path: "/workbench/worksheetManage"
                    });
                } else if (val == 2) {
                    this.$router.push({
                        path: "/workbench/needDealt"
                    });
                } else if (val == 3) {
                    this.$router.push({
                        path: "/workbench/carPark"
                    });
                } else if (val == 7) {
                    this.$router.push({
                        path: "/workbench/adminManage"
                    });
                } else if (val == 5) {
                    this.$router.push({
                        path: "/workbench/mechineManage"
                    });
                } else if (val == 6) {
                    this.$router.push({
                        path: "/workbench/mechineOperation"
                    });
                } else if (val == 9) {
                    this.$router.push({
                        path: "/workbench/mechineQuantity"
                    });
                } else if (val == 8) {
                    this.$router.push({
                        path: "/workbench/personCen"
                    });
                } else if (val == 4) {
                    this.$router.push({
                        path: "/workbench/areaManage"
                    });
                }
            }else {
                if (val == 2 && val2 == 0) {
                    this.$router.push({
                        path: "/workbench/qrcodeManage"
                    });
                } else if (val == 2 && val2 == 1) {
                    this.$router.push({
                        path: "/workbench/baseManage"
                    });
                } else if (val == 2 && val2 == 2) {
                    this.$router.push({
                        path: "/workbench/stockManage"
                    });
                }
            }
             
        },
        
        // 刷新页面保持当前高亮菜单不变
        sidebarActive(index) {
            console.log(index)
            setTimeout(() => {
                this.activeIndex = index
            }, 50);

        },
    },
}
</script>

<style lang="scss" scoped>
.a2-workbench-sidebar {
    height: 100%;
    background: #fff;
    float: left;
    border-radius: 10px;
    position: relative;
    overflow: auto;

    .side_menu_div {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;;
    }

    .side_menu_icon {
        height: 64px;
        overflow: hidden;

        .side-menu-icon-left {
            height: 100%;
            float: left;
            display: flex;
            align-items: center;

            img.side-menu-logo {
                width: 35px;
                height: 35px;
                margin: 0 4px 0 11px;
            }
            .side-menu-title {
                font-size: 20px;
                font-weight: bold;
                color: #454545;
            }
        }
        img.side-menu-ding {
            width: 35px;
            height: 35px;
            margin: 17px 11px 5px 0;
            float: right;
        }
    }

    .side_menu_list {

        .el-aside {
            height: 100%;

            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 240px;
                height: 100%;

                .el-menu-item,.el-submenu__title span,.el-submenu__title {
                    font-size: 18px;
                    color: #7E7E7E;

                    i {
                        margin-right: 10px;
                        color: #7E7E7E;
                    }
                    .un-read-num {
                        display: inline-block;
                        width: 36px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        background: #FF0000;
                        border-radius: 8px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 13px;
                    }
                }
                .el-menu-item.is-active {
                    background: #99B7D0;
                    color: #fff;

                    i {
                        color: #fff;
                    }
                }
            }

            ul {
                border-right: none;

                li {
                    text-align: left;
                    position: relative;
                }
            }
        }
    }
}
</style>
