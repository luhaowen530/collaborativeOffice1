<template>
<div class="TosSelect">
  <el-input v-model="dataString" placeholder="请输入目的IP" readonly></el-input>
  <el-popover ref="popover" placement="bottom" title="" width="327" trigger="click" popper-class="popoverContent" @show="showProper">
    <div class="tos-popoverContent-scroll">
      <div class="left-content">
        <p class="list" v-for="item in listArr" :key="item.id" :class="item.select?'select':''" @click="selectList(item)">
          {{item.label}}
        </p>
      </div>
      <div class="right-radio">
        <p v-for="(item, index) in radioArr" :key="index" @click="getRadio">
          <el-radio v-model="radio" :label="item.value">{{item.label}}</el-radio>
        </p>
      </div>
    </div>
    <template slot="reference">
      <div class="IpSelect-input">
        <span class="noValue" v-if="dataString == ''">请选择TOS</span>
        <span class="hasValue">{{dataString}}</span>
        <div class="right-icon">
          <i class="right-icon-ip el-icon-arrow-down" />
        </div>
      </div>
    </template>
  </el-popover>
</div>
</template>

<script>
import { deepClone, trim, ipRegular } from "@/utils/index"
export default {
  props: {
    dataString: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      radio: '0',
      listArr: [],
      historyRadio: '',
      radioArr: []
    }
  },
  watch: {
    dataString(newValue, oldValue) {
      this.initData(newValue)
    }
  },
  created() {
    this.initData(this.dataString)
  },
  methods: {
    getRadio() {
      this.historyRadio = this.radio
      setTimeout(() => {
        if (this.historyRadio == this.radio) {
          this.radio = '0'
        }
        let radio = ''
        if (this.radio != '0') {
          this.radioArr.forEach(item => {
            if (item.value == this.radio) {
              radio = item.label
            }
          })
          this.$emit('changetosString', radio, 'radio')
        } else {
          this.$emit('changetosString', '', 'radio')
        }
      }, 100)
    },
    showProper() {

    },
    selectList(item) {
      if (this.radio != '0') {
        let radio = ''
        this.radioArr.forEach(item => {
          if (item.value == this.radio) {
            radio = item.label
          }
        })
        this.$emit('changetosString', item.label + '-' + radio)
      } else {
        this.$emit('changetosString', item.label)
      }

    },
    initData(data) {
      this.listArr = [{ value: '0', label: '全部' }, { value: '1', label: 'Network Control(网络控制)' }, { value: '2', label: 'Internetwork Control(网间控制)' },
        { value: '3', label: 'Critic(关键)' }, { value: '4', label: 'Flash Override(疾速)' }, { value: '5', label: 'Flash(闪速)' }, { value: '6', label: 'Immediate(快速)' },
        { value: '7', label: 'Priority(优先)' }, { value: '8', label: 'Routine(普通)' }
      ]

      this.listArr.forEach(item => {
        item.select = false
      })

      this.radioArr = [{ value: '1', label: '最小时延' }, { value: '2', label: '最大吞吐量' }, { value: '3', label: '最高可靠性' }, { value: '4', label: '最小费用' }]

      if (data.indexOf("-") != -1) {
        let dataArr = data.split("-")
        this.listArr.forEach(item => {
          if (item.label == dataArr[0]) {
            item.select = true
          }
        })

        this.radioArr.forEach(item => {
          if (item.label == dataArr[1]) {
            this.radio = item.value
          }
        })

      } else {
        this.listArr.forEach(item => {
          if (item.label == data) {
            item.select = true
          }
        })
        this.radio = '0'
      }

    }
  },
}
</script>

<style lang="scss">
.popoverContent {

  position: relative;

  .tos-popoverContent-scroll {
    overflow: hidden;
    height: 220px;

    .left-content {
      float: left;
      width: 180px;
      height: 100%;

      .list {
        font-size: 12px;
        margin: 0px;
        margin-top: 2px;
        height: 22px;
        padding-left: 7px;
        padding-right: 7px;
        line-height: 22px;
        color: #333;
        cursor: pointer;
      }

      .list.select {
        background: #2296F3;
        color: #fff;
        border-radius: 3px;
      }
    }

    .right-radio {
      float: right;
      width: 98px;
      height: 100%;
      padding-left: 12px;
      border-left: 1px solid #D9D9D9;

      .el-radio__label {
        font-size: 12px;
        color: #333;
        font-weight: normal;

      }

      .is-checked {
        .el-radio__label {
          color: #409EFF;
        }
      }

      p {
        margin: 0px;
        font-size: 12px;
        height: 22px;
      }
    }
  }

}
</style>
<style lang="scss" scoped>
.TosSelect {
  position: relative;

  .right-icon-ip {
    margin-top: 11px;
    margin-right: 4px;
    cursor: pointer;
  }

  .IpSelect-input {
    position: absolute;
    width: calc(100% - 28px);
    top: 1px;
    left: 5px;
    height: 34px;
    line-height: 34px;
    background: #fff;

    .noValue {
      padding-left: 12px;
      color: #b8bcc5;
    }

    .hasValue {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap;
      float: left;
      padding-right: 10px;
      padding-left: 12px;
      color: #333;
    }

    .right-icon {
      position: absolute;
      right: -20px;
      height: calc(100% - 2px);
      top: 0px;
      background: #fff;
      width: 20px;
      color: #c1c5cd;
    }
  }

}
</style>
