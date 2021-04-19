<template>
<div class="IpSelect">
  <el-input v-model="dataString" placeholder="请输入目的IP" readonly>
    <template slot="suffix">
      <img class="right-icon-ip" @click="dialogVisible=true" src="../../assets/a1-attack-analysis/export.png" />
    </template>
  </el-input>
  <el-popover ref="popover" placement="bottom" title="" width="320" trigger="click" popper-class="popoverContent" @show="showProper">
    <div class="popoverContent-scroll" id="popoverContent-scroll">
      <div v-for="(item, index) in needArr" :key="index">
        <p class="list-ip" v-if="!item.input"><span @click="selectP(index)" class="ip">{{item.item}}</span><i class="el-icon-close" @click="delIp(index)"></i></p>
        <el-input v-if="item.input" v-model="needData[item.index]" size="mini" @change="ipChange($event, index)"></el-input>
      </div>
      <el-input v-model="addValue" style="width: 98%" v-if="showAddInput" ref="writeInput" size="mini" placeholder="请输入新的目的IP" @change="addIpValue" :class="error?'error':''" clearable @focus="clearInput"></el-input>
    </div>
    <div class="bottom-input">
      <div class="addInput">
        <div class="left" @click="addIpValue"><i class="el-icon-circle-plus-outline"></i>添加</div>
        <div class="right" @click="delAll" v-if="needArr.length> 0"><i class="el-icon-circle-close-outline"></i>清空</div>
      </div>
    </div>
    <template slot="reference">
      <div class="IpSelect-input">
        <span class="noValue" v-if="needArr.length == 0">{{title}}</span>
        <span class="hasValue" v-else>
          <span class="ipc">{{needArr[0].item}}</span>
          <span class="TotalNum" v-if="needArr.length > 1">
            <template v-if="needArr.length < 100">+{{needArr.length - 1}}</template>
            <template v-else>99+</template>
            <i class="el-icon-arrow-down"></i>
          </span>
        </span>
      </div>
    </template>
  </el-popover>
  <upload-excel :dialogVisible="dialogVisible" @hideDialog="hideDialog" @changeIpData="changeData" />
</div>
</template>

<script>
import uploadExcel from "./upload-excel"
import { deepClone, trim, ipRegular } from "@/utils/index"
export default {
  props: {
    title: {
      type: String,
      default: '请输入目的IP'
    },
    dataArrString: {
      type: String,
      default: ''
    },
  },
  components: {
    uploadExcel,
  },
  data() {
    return {
      dialogVisible: false,
      needData: {},
      input: '',
      needArr: [],
      dataString: '',
      error: false,
      addValue: '',
      showAddInput: true
    }
  },
  watch: {
    dataArrString(newValue, oldValue) {
      this.initData(newValue)
    }
  },
  created() {
    this.initData(this.dataArrString)
  },
  methods: {
    changeData(data) {
      let needData = ''
      data.forEach(item => {
        needData = needData + item + ','
      })
      needData = needData.substring(0, needData.length - 1)
      if (this.dataArrString != '') {
        this.$emit("changeIpString", this.dataArrString + "," + needData)
      } else {
        this.$emit("changeIpString", needData)
      }
    },
    showProper() {
      this.addValue = ''
      this.error = false
      if (this.dataArrString == '' || this.dataArrString == null) {
        this.showAddInput = true
        this.$nextTick(() => {
          this.$refs.writeInput.focus()
        })
      } else {
        this.showAddInput = false
      }

    },
    delAll() {
      this.$confirm('是否清空所有目的IP?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("changeIpString", '')
      }).catch(() => {});
    },
    addIpValue() {
      if (this.showAddInput) {
        if (this.addValue == '' || this.addValue == null) {} else {
          if (!ipRegular(this.addValue)) {
            this.$message.error('请输入正确的ip地址!');
            this.error = true
          } else {
            let obj = this.dataArrString + "," + this.addValue
            if (this.dataArrString != '') {
              obj = this.dataArrString + "," + this.addValue
            } else {
              obj = this.addValue
            }
            this.error = false
            this.$emit("changeIpString", obj)
            this.addValue = ''
            setTimeout(() => {
              let ele = document.getElementsByClassName('popoverContent-scroll')
              ele[ele.length - 1].scrollTop = ele[ele.length - 1].scrollHeight
            }, 200)
          }
        }
      } else {
        this.needArr.forEach(item => {
          item.input = false
        })
        this.showAddInput = true
        setTimeout(() => {
          let ele = document.getElementsByClassName('popoverContent-scroll')
          ele[ele.length - 1].scrollTop = ele[ele.length - 1].scrollHeight
        }, 200)
      }
    },
    clearInput() {
      this.error = false
      this.needArr.forEach(item => {
        item.input = false
      })
    },
    initData(data) {
      if (data == '' || data == null) {
        this.needArr = []
        this.needData = {}
        this.showAddInput = true
      } else {
        let dataArr = data.split(",")
        let needArr = []
        dataArr.forEach(item => {
          needArr.push(trim(item))
        })
        this.needArr = []
        needArr.forEach((item, index) => {
          this.needArr.push({
            index: index,
            item: item,
            input: false
          })
          let num = index.toString()
          this.needData[num] = item
        })
      }
      // this.addValue = ''
      // this.error = false

    },
    delIp(index) {
      let obj = ''
      delete this.needArr[index]
      this.needArr.forEach(item => {
        obj = obj + item.item + ","
      })
      obj = obj.substring(0, obj.length - 1)
      this.$emit("changeIpString", obj)
    },
    ipChange(value, index) {
      let obj = ''
      if (value == '') {
        delete this.needArr[index]
      } else {
        this.needArr[index].item = value
      }
      this.needArr.forEach(item => {
        obj = obj + item.item + ","
      })
      obj = obj.substring(0, obj.length - 1)
      this.$emit("changeIpString", obj)
      // let needData = deepClone(this.needData)
      // this.needData = needData
    },
    hideDialog() {
      this.dialogVisible = false
    },
    selectP(index) {
      this.showAddInput = false
      this.needArr.forEach(item => {
        item.input = false
      })
      this.needArr[index].input = true
    }
  },
}
</script>

<style lang="scss">
.popoverContent {

  position: relative;

  .popoverContent-scroll {
    max-height: 215px;
    overflow: auto;
    margin-bottom: 45px;
  }

  .bottom-input {
    position: absolute;
    height: 45px;
    padding-left: 12px;
    bottom: 0px;
    width: calc(100% - 19px);
    left: 0px;
    background: #fff;

    .addInput {
      text-align: center;
      margin-top: 2px;

      .left {
        float: left;
        color: #fff;
        cursor: pointer;
        text-align: center;
        padding: 5px 18px;
        background: #2296F3;
        border-radius: 4px;
        box-sizing: border-box;

        i {
          margin-right: 3px;
        }
      }

      .right {
        float: right;
        color: #FF4D4F;
        cursor: pointer;
        text-align: center;
        padding: 4px 18px;
        background: #FFF2F2;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #fbc4c4;

        i {
          margin-right: 3px;
        }
      }

    }
  }

  .error {
    input {
      border-color: #f56c6c;
    }
  }

}

.list-ip {
  color: #333;
  font-size: 12px;
  overflow: hidden;

  .ip {
    width: 90px;
    float: left;
  }

  i {
    float: right;
    cursor: pointer;
    margin-right: 15px;
    margin-top: 3px;
  }
}
</style>
<style lang="scss" scoped>
.IpSelect {
  position: relative;

  .right-icon-ip {
    margin-top: 11px;
    margin-right: 4px;
    width: 14px;
    height: 15px;
    cursor: pointer;
  }

  .IpSelect-input {
    position: absolute;
    width: calc(100% - 30px);
    top: 1px;
    left: 5px;
    height: 34px;
    line-height: 34px;
    background: #fff;

    .noValue {
      color: #b8bcc5;
    }

    .hasValue {
      width: 100%;
      overflow: hidden;
      float: left;

      .ipc {
        float: left;
        max-width: calc(100% - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .TotalNum {
      font-size: 12px;
      height: 22px;
      line-height: 20px;
      margin-top: 6px;
      border-radius: 3px;
      padding: 0 3px;
      margin-left: 2px;
      display: inline-block;
      border: 1px solid #D9D9D9;
      background: #F4F4F5;
    }
  }

  @media screen and (min-width:1500px) {
    .IpSelect-input {
      left: 15px;
      width: calc(100% - 45px);

      .TotalNum {
        margin-left: 10px;
        padding: 0 5px;
      }
    }

  }

}
</style>
