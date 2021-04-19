<template>
<div class="upload-excel-need">
  <el-dialog :visible="dialogVisible" width="40%" :before-close="handleClose" append-to-body>
    <template slot="title">
      <div class="upload-title">
        <img style="width:15px;height:16px" src="../../assets/a1-attack-analysis/more-export.png" />
        批量导入
      </div>
    </template>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" accept=".xlsx, .xls" :on-success="successUpload" multiple :limit="1" :file-list="fileList">
      <img class="img-excel" src="../../assets/a1-attack-analysis/excel.png" />
      <div class="el-upload__text">上传表格</div>
      <p class="summary">也可直接拖拽到此处上传(支持格式:xls、xlsx)</p>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="downExcelFile" style="float:left">下载模版</el-button>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sumbit">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
// import { uploadExcel, downExcel } from '@/axios/a1-attack-analysis/ddos-attack'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    downExcelFile() {
      let execlName = '模版' + '.xlsx';
      // downExcel().then((response) => {
      //   const blob = new Blob([response.data], {
      //     // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      //     type: 'application/vnd.ms-excel'
      //   });
      //   const aEle = document.createElement("a"); // 创建a标签
      //   const href = window.URL.createObjectURL(blob); // 创建下载的链接
      //   aEle.href = href;
      //   aEle.download = execlName; // 下载后文件名
      //   document.body.appendChild(aEle);
      //   aEle.click(); // 点击下载
      //   document.body.removeChild(aEle); // 下载完成移除元素
      //   window.URL.revokeObjectURL(href); // 释放掉blob对象
      // })
    },
    successUpload(response, file, fileList) {
      this.fileList = fileList
    },
    handleClose(done) {
      this.$emit('hideDialog')
    },
    closeDialog() {
      this.$emit('hideDialog')
    },
    sumbit() {
      if (this.fileList.length != 0) {
        let formdata = new FormData(); // 创建form对象
        formdata.append("file", this.fileList[0].raw);
        // uploadExcel(formdata).then(response => {
        //   let data = response.data.data
        //   this.$emit('changeIpData', data)
        //   this.fileList = []
        //   this.$emit('hideDialog')
        // })
      } else {
        this.$message.error('请检查您的文件是否上传成功！');
      }

    }
  },
}
</script>

<style lang="scss">
.upload-demo {
  width: 100%;

  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    width: 100%;
  }
}
</style>
<style lang="scss">
.upload-title {
  img {
    float: left;
    width: 15px;
    height: 16px;
    margin-right: 5px;
  }
}

.upload-demo {
  width: 100%;

  .el-upload {
    width: 100%;
  }

  .img-excel {
    margin-top: 46px;
    margin-bottom: 4px;
  }

  .summary {
    font-size: 12px;
    color: #B7BEC7;
    margin: 0px;
    margin-top: 4px;
  }
}
</style>
