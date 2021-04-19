<template>
<div class="TcpFlagSelect">
  <el-input v-model="dataString" placeholder="请输入目的IP" readonly></el-input>
  <el-popover ref="popover" placement="bottom" title="" trigger="click" popper-class="NetpopoverContent" @show="showProper">
    <div class="tcp-popoverContent-scroll">
      <el-dropdown trigger="click" v-for="(item, index) in dataArr" :key="index">
        <div class="list-card">
          <span class="select" v-if="item.select">{{item.label}} <i class="el-icon-caret-bottom" /></span>
          <span class="no-select" v-if="!item.select">{{item.label}} <i class="el-icon-caret-bottom" /></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(list, idx) in item.data" :key="idx" class="listDown">
            <img @click="clickList(index,idx)" v-if="list.select" src="../../assets/common/select.png" alt="">
            <img @click="clickList(index,idx)" v-if="!list.select" src="../../assets/common/no-select.png" alt="">
            <span @click="clickList(index,idx)" :class="list.select?'downActive':''">{{list.label}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <template slot="reference">
      <div class="IpSelect-input">
        <span class="noValue" v-if="dataString == ''">请选择TCP Flag</span>
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
      dataArr: []
    }
  },
  created() {
    this.dataArr = [{ label: 'FIN', select: false, data: [{ label: 'FIN="1"', select: false }, { label: 'FIN="0"', select: false }] },
      { label: 'SYN', select: false, data: [{ label: 'SYN="1"', select: false }, { label: 'SYN="0"', select: false }] },
      { label: 'PUSH', select: false, data: [{ label: 'PUSH="1"', select: false }, { label: 'PUSH="0"', select: false }] },
      { label: 'ACK', select: false, data: [{ label: 'ACK="1"', select: false }, { label: 'ACK="0"', select: false }] },
      { label: 'URG', select: false, data: [{ label: 'URG="1"', select: false }, { label: 'URG="0"', select: false }] },
      { label: 'ECE', select: false, data: [{ label: 'ECE="1"', select: false }, { label: 'ECE="0"', select: false }] },
      { label: 'CWR', select: false, data: [{ label: 'CWR="1"', select: false }, { label: 'CWR="0"', select: false }] }
    ]
    this.initData()
  },
  methods: {
    initData() {
      let dataArr = this.dataString.split(',')
      this.dataArr.forEach(item => {
        item.data.forEach(list => {
          dataArr.forEach(da => {
            if (da == list.label) {
              list.select = true
              item.select = true
            }
          })
        })
      })
    },
    clickList(index, idx) {
      if (this.dataArr[index].data[idx].select == true) {
        this.dataArr[index].data[idx].select = false
        this.dataArr[index].select = false
      } else {
        this.dataArr[index].data.forEach(item => {
          item.select = false
        })
        this.dataArr[index].data[idx].select = true
        this.dataArr[index].select = true
      }
      let data = ''
      this.dataArr.forEach(item => {
        item.data.forEach(list => {
          if (list.select) {
            data = data + list.label + ','
          }
        })
      })

      data = data.substring(0, data.length - 1)

      this.$emit('changetosString', data)
    },
    showProper() {}
  },
}
</script>

<style lang="scss">
.NetpopoverContent {
  position: relative;

  .tcp-popoverContent-scroll {
    height: 30px;
    line-height: 30px;

    .list-card {
      width: 60px;
      display: inline-block;
      color: #333;
      text-align: center;
      font-size: 12px;

      i {
        margin-left: 2px;
        color: #B6B6B6;
      }

      span.select {
        color: #2296F3;

        i {
          color: #2296F3;
        }
      }
    }
  }

}

.el-dropdown-menu--medium li.listDown {
  img {
    width: 14px;
    height: 14px;
    float: left;
    margin-top: 8px;
    margin-right: 5px;
  }

  span {
    font-size: 12px;
    color: #333;
  }

  .downActive {
    color: #2296F3;

  }
}

.el-dropdown-menu--medium li.listDown:hover {
  background: none !important;

  color: #606266;
}
</style>
<style lang="scss" scoped>
.TcpFlagSelect {
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
