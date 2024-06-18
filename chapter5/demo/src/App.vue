<template>
  <el-config-provider :locale="locale">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="account" label="用户名" />
      <el-table-column prop="createTime" label="注册时间" />
      <el-table-column prop="level" label="等级" />
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-config-provider>
</template>
<script>
import locale from 'element-plus/es/locale/lang/zh-cn'
const data = Array.from(Array(114), (v, i) => {
  return {
    account: "uaa" + (i + 1),
    createTime: new Date(Date.now() + Math.ceil(Math.random() * 1000)),
    level: Math.ceil(Math.random() * 10)
  }
})
export default {
  name: "App",
  data() {
    return {
      locale,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.getData(1, this.pageSize);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(this.currentPage, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(val, this.pageSize);
    },
    getData(page, pageSize) {
      this.tableData = data.slice((page - 1) * pageSize, page * pageSize);
      this.total = data.length;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
