<template>
    <div class="bg">
        <div class="qrcodeBox2" id="qrcodeBox2">
            <div v-for="(item,index) in list" :key="index">
                <img :src="item.imgsrc" class="small-qr"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                    {id:1,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:2,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:3,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"},
                    {id:4,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:5,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:6,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"},
                    {id:1,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:2,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:3,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"},
                    {id:4,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:5,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:6,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"},
                    {id:1,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:2,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:3,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"},
                    {id:4,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2BxUYCAYGwoAAAMDaVZWEw160.png"},
                    {id:5,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2Bz__eAbOu_AAAMb4bKCy4360.png"},
                    {id:6,imgsrc:"http://180.169.154.251:8013/group1/M00/00/02/rB5RA2B0ABOALKHZAAAMUGaNPAo099.png"}
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: calc(100% - 100px);

    .qrcodeBox2 {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(151, 121, 121, 0.5);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        color: rgb(151, 121, 121);
        overflow: scroll;
        .small-qr {
            width: 400px;
            height: 400px;
        }
    }
}
</style>