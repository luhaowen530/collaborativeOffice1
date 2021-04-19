<template>
    <div class="a2-workbench-container">
        <side-bar ref="a2SideMenu" @changeSideWidth="changeSideWidth" />
        <div :class="[isOpen?'closeAlexder':'openAlexder']">
            <router-view @sidebarActive="sidebarActive" />
        </div>
    </div>
</template>

<script>
    import sideBar from "./components/sidebar"
    export default {
        components: {
            sideBar
        },
        data() {
            return {
                isOpen: false,
            }
        },
        created(){
            this.$emit("topHighlightMenu", "2")
            // if(this.$router.path !== '/workbench/needDealt'){
            //     this.$router.replace('/workbench/needDealt')
            // }
            var user = {
              "code": 200,
              "data": {
                "userId": "7639ba828f82493da465d525022effe5",
                "userName": "大手牵小手",
                "photoPath": "group1/M00/00/00/rB5RA2BFlZeAB3K0AABnbTubZrM348.jpg",
                "sex": "1",
                "idCard": "320",
                "telephoneNumber": "15850xxxx86",
                "mailbox": "652xxxx58@qq.com",
                "account": "oldSun228",
                "status": "01",   //01 正常
                "remark": "1",   //备注
                "sort": "4",
                "orgId": "30eb2b8eb32e4e11a534e8c643247643",
                "orgInfo": {
                  "organizationId": "30eb2b8eb32e4e11a534e8c643247643",
                  "parentId": "s0e45b8eb32e4e12a534e8c643247643",
                  "number": "001",
                  "simpleName": "浦交本部",        //组织简称
                  "name": "上海浦东新区公交本部",  //组织名称
                  "status": "01",
                  "remark": "上海浦东新区公交本部", // 备注
                  "sort": "2"
                },
                "userAuthList": [    //用户权限列表
                  {
                    "pjtId": "09717d17ce504dddb97c2c5ec64238bc",
                    "pjtName": "协同办公",    //项目名称
                    "pjtCode": "SYS0004",
                    "sort": "5",
                    "roleList": [        //角色列表
                      {
                        "roleId": "4b590e89b7a5444eaec95a9a6219a5a7",
                        "roleName": "超级管理员",
                        "roleCode": "admin",
                        "sort": "1",
                        "resourceList": [   //该角色对应的资源
                          {
                            "resourceId": "0570b2bfeddc41c8b2492c1c61ca38db",
                            "parentId": "ac3e140e4a24439896b150a65c590df4",
                            "resourceName": "工作通知",
                            "resourceCode": "WTGT_MH_GZTZ",
                            "resourceIcon": "fa fa-slack",
                            "type": "01",
                            "vuePath": "gatewaySecond",
                            "vueComponent": "a1-gateway/gatewaySecond/index",
                            "sort": "2"
                          }
                        ]
                      }
                    ],
                }],
                }
                }
     
            sessionStorage.setItem("user",JSON.stringify(user.data));
        },
        methods: {
            changeSideWidth(isOrNot){
                this.isOpen = isOrNot
            },
             sidebarActive(index){
                this.$refs.a2SideMenu.sidebarActive(index)
            },
        },
    }
</script>

<style lang="scss" scoped>
.a2-workbench-container {
    width: 100%;
    height: calc(100% - 138px);
    margin-top: 20px;

    .closeAlexder {
        margin: 0 20px 0 78px;
        height: 100%;
    }
    .openAlexder {
        margin: 0 20px 0 250px;
        transition: all 0.3s;
        height: 100%;
    }
}
</style>