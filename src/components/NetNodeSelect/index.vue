<template>
<div class="NetNodeSelect">
  <el-input v-model="dataString" placeholder="请输入目的IP" readonly ref="parentInput"></el-input>
  <el-popover ref="popover" placement="bottom" title="" trigger="click" :popper-class="NetpopoverContent" @show="showProper">
    <div class="tos-popoverContent-scroll">
      <div class="left-content" :class="showOneRight ? '' : 'noPadding'">
        <p v-for="(item, index) in oneArr" :key="index" :class="index == 0 ? 'first-p' : ''" @click="firstClick(index)">
          <span v-if="!item.showRadio" :class="item.select ? 'active' : ''">{{ item.label }}</span>
          <el-radio v-if="item.showRadio" v-model="radio" :label="index">{{ item.label }}</el-radio>
          <span class="divOpacity" @click="hideOpacity('one', index)" v-if="item.select"></span>
          <i class="el-icon-arrow-right" style="cursor: pointer"></i>
        </p>
      </div>
      <div class="right-radio" :class="showRight ? 'paddingNo' : ''" v-if="showOneRight">
        <p v-for="(item, index) in twoArr" :key="index">
          <el-radio @change="twoClick" v-model="radio1" :label="index">{{
              item.label
            }}</el-radio>
          <i v-if="item.showIcon" class="el-icon-arrow-right" style="cursor: pointer"></i>
          <span class="divOpacity" @click="hideOpacity('two', index)" v-if="item.select"></span>
        </p>
      </div>
      <div class="right-radio" v-if="showRight">
        <p v-for="(item, index) in twoArr[selectTwo].data" :key="index">
          <el-radio @change="threeClick" v-model="radio2" :label="index">{{
              item.label
            }}</el-radio>
          <span class="divOpacity" @click="hideOpacity('three', index)" v-if="item.select"></span>
        </p>
      </div>
    </div>
    <template slot="reference">
      <div class="IpSelect-input">
        <span class="hasValue">{{ dataString }}</span>
        <div class="right-icon">
          <i class="right-icon-ip el-icon-arrow-down" />
        </div>
      </div>
    </template>
  </el-popover>
</div>
</template>

<script>
import { deepClone, trim, ipRegular } from "@/utils/index";
import { getAddress } from "@/axios/a1-attack-analysis/ddos-attack/index";
export default {
  props: {
    dataString: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      radio: 520,
      radio1: 520,
      radio2: 520,
      oneArr: [],
      twoArr: [],
      selectTwo: 0,
      NetpopoverContent: "NetpopoverContent",
      showRight: false,
      showOpacity: false,
      showTwoOpacity: false,
      showThreeOpacity: false,
      showOneRight: false,
      oneData: [{
          select: false,
          label: "上海电信",
          showIcon: true,
          showRadio: false,
          data: [
            { select: false, label: "185专线" },
            { select: false, label: "166-ct专线" },
          ],
        },
        {
          select: false,
          showIcon: true,
          label: "山东电信",
          showRadio: true,
          data: [
            { select: false, label: "163专线" },
            { select: false, label: "IDC专线" },
          ],
        },
      ],
      twoData: [
        { select: false, label: "美国", showIcon: false },
        { select: false, label: "日本", showIcon: false },
      ],
    };
  },
  created() {
    this.oneArr = [
      { select: false, label: "骨干网", showRadio: false },
      { select: false, label: "境外", showRadio: true },
    ];
    this.twoArr = this.oneData;
    // getAddress().then((response) => {
    //   let data = response.data.data;
    //   data.forEach((item) => {
    //     item.select = false;
    //     item.label = item.name;
    //     if (item.name == "骨干网") {
    //       item.showRadio = false;
    //     } else {
    //       item.showRadio = true;
    //     }
    //   });
    //   this.oneArr = data;
    //   data.forEach((item) => {
    //     if (item.name == "骨干网") {
    //       item.children.forEach((child) => {
    //         child.select = false;
    //         child.showIcon = false;
    //         child.showRadio = false;
    //         child.label = child.name;
    //         if (child.children != null) {
    //           if (child.children.length > 0) {
    //             child.showIcon = true;
    //             child.data = child.children;
    //             child.data.forEach((list) => {
    //               list.select = false;
    //               list.label = list.name;
    //             })
    //           }
    //         }
    //       });
    //       this.oneData = item.children;
    //     } else {
    //       item.children.forEach((child) => {
    //         child.select = false;
    //         child.label = child.name;
    //         child.showRadio = false;
    //       });
    //       this.twoData = item.children
    //     }
    //   })
    // });
  },
  methods: {
    hideOpacity(name, id) {
      if (name == "one") {
        this.oneArr.forEach((item) => {
          item.select = false;
        });
        this.radio = 520;
        // 去掉所有弹框
        this.showOneRight = false;
        this.showRight = false;
        this.NetpopoverContent = "NetpopoverContent";
        this.$emit("changeDataString", "全部", "");
      } else if (name == "two") {
        this.twoArr.forEach((item) => {
          item.select = false;
        });
        this.radio1 = 520;
        this.showRight = false;

        if (this.radio != 1) {
          // 非境外
          this.$emit("changeDataString", "全部", "");
        } else {
          let data = this.oneArr[1].label;
          this.$emit("changeDataString", data, this.oneArr[1].id);
        }
      } else {
        this.twoArr[this.selectTwo].data.forEach((item) => {
          item.select = false;
        });
        this.radio2 = 520;
        this.$emit(
          "changeDataString",
          this.twoArr[this.selectTwo].label,
          this.twoArr[this.selectTwo].id
        );
      }
    },
    firstClick(value) {
      this.$nextTick(() => {
        this.$refs.parentInput.focus()
      })
      this.oneArr.forEach((item) => {
        item.select = false;
      });
      this.twoArr = this.twoData;
      this.showRight = false;
      if (value == 0) {
        this.radio = 520;
        this.twoArr = this.oneData;
        this.$emit("changeDataString", "全部", "");
      } else {
        let id = ''
        this.oneArr.forEach((item) => {
          if (item.label == '境外') {
            id = item.id
          }
        });
        this.radio = 1;
        this.$emit("changeDataString", "境外", id);
      }
      this.oneArr[value].select = true;
      this.radio1 = 520;
      // 右侧显示
      this.NetpopoverContent = "NetpopoverContent leftPosition";
      this.showOneRight = true;

      //二级三级选中去掉
      this.twoArr.forEach((item) => {
        item.select = false;
        if (item.data) {
          item.data.forEach((list) => {
            list.select = false;
          });
        }
      });
    },
    twoClick(value) {
      this.$nextTick(() => {
        this.$refs.parentInput.focus()
      })
      this.selectTwo = value;
      this.showRight = false
      this.twoArr.forEach((item) => {
        item.select = false;
      });
      this.twoArr[value].select = true;
      if (this.twoArr[value].data) {
        this.radio2 = 520;
        this.showRight = true;
        // 三级选中去掉
        this.twoArr[value].data.forEach((list) => {
          list.select = false;
        });
      }
      if (this.radio != 1) {
        this.$emit("changeDataString", this.twoArr[value].label, this.twoArr[value].id);
      } else {
        let data = this.oneArr[1].label;
        this.$emit("changeDataString", data + "/" + this.twoArr[value].label, this.twoArr[value].id);
      }
    },
    threeClick(value) {
      this.$nextTick(() => {
        this.$refs.parentInput.focus()
      })
      this.twoArr[this.selectTwo].data.forEach((item) => {
        item.select = false;
      });
      this.twoArr[this.selectTwo].data[value].select = true;
      this.$emit(
        "changeDataString",
        this.twoArr[this.selectTwo].label +
        "/" +
        this.twoArr[this.selectTwo].data[value].label, this.twoArr[this.selectTwo].data[value].id
      );
    },
    showProper() {
      this.$nextTick(() => {
        this.$refs.parentInput.focus()
      })
    },
  },
};
</script>

<style lang="scss">
.NetpopoverContent {
  position: relative;

  .tos-popoverContent-scroll {
    height: 210px;
    overflow: hidden;

    .left-content {
      float: left;
      width: 145px;
      font-size: 14px;
      height: 100%;

      p {
        position: relative;

        .colorFont {
          color: #409eff;
        }

        .divOpacity {
          width: 120px;
          position: absolute;
          height: 16px;
          left: 0px;
          top: 0px;
          opacity: 0;
          cursor: pointer;
        }
      }

      p.first-p {
        padding-left: 23px;
        color: #606266;
        margin-top: 0px;
        font-weight: normal;

        span {
          cursor: pointer;
        }
      }

      p.first-p {
        span.active {
          color: #409eff;
        }
      }

      i {
        // cursor: pointer;
        margin-right: 14px;
      }

      .el-radio__label {
        font-size: 14px;
        font-weight: normal;
      }

      i {
        float: right;
      }
    }

    .left-content.noPadding {
      i {
        // cursor: pointer;
        margin-right: 0px;
      }
    }

    .right-radio {
      float: left;
      width: 166px;
      height: 100%;
      overflow: auto;
      font-weight: normal;
      padding-left: 14px;
      border-left: 1px solid #d9d9d9;

      .el-radio__label {
        font-size: 14px;
        color: #333;
        display: inline-block;
        max-width: 110px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: normal;
      }

      .is-checked {
        .el-radio__label {
          color: #409eff;
        }
      }

      p {
        font-size: 14px;
        position: relative;

        .divOpacity {
          width: 120px;
          position: absolute;
          height: 16px;
          left: 0px;
          top: 0px;
          opacity: 0;
          cursor: pointer;
        }

        i {
          float: right;
          // cursor: pointer;
        }
      }

      p:nth-of-type(1) {
        margin-top: 0px;
      }
    }

    .right-radio.paddingNo {
      width: 180px;

      i {
        margin-right: 14px;
      }
    }
  }
}

.NetpopoverContent.leftPosition {
  margin-left: -83px;
}
</style>
<style lang="scss" scoped>
.NetNodeSelect {
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

    .hasValue {
      width: 100%;
      overflow: hidden;
      float: left;
      padding-left: 12px;
      color: #333;
    }

    .right-icon {
      position: absolute;
      right: -30px;
      top: 0px;
      width: 30px;
      color: #c1c5cd;
    }
  }
}
</style>
