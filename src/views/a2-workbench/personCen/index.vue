<template>
    <div class="a2-newadd">
        <div class="top-title">
            <img src="@/assets/container/menu-logo.png" alt="">
            <span class="top-title-text">个人中心</span>
        </div>
        <div class="a2-newadd-centent">
            <div>Zhangsan(系统账号)</div>
            <div>姓名：xxxxxxx</div>
            <div>工号：xxxxxxx</div>
            <div>岗位：xxxxxxx</div>
            <div>联系方式：xxxxxxx</div>
            <div>邮箱地址：xxxxxxx</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created () {
            this.$emit("sidebarActive", "9");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
        },
    }
</script>

<style lang="scss" scoped>
.a2-newadd {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px 27px 20px 31px;
    position: relative;

    .top-title {
        display: flex;
        align-items: center;

        img {
            width: 30px;
            height: 30px;
        }
        .top-title-text {
            font-size: 20px;
            font-weight: bold;
            color: #1555A0;
            margin-left: 9px;
        }
    }
    .a2-newadd-centent {
        height: calc(100% - 44px);
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        line-height: 70px;

    }
}
</style>