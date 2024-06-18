 <template>
  <div class="flex">
    <el-form :model="searchForm" inline>
      <el-form-item label="商品名称">
        <el-input v-model="searchForm.name" placeholder="输入商品名称进行查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="handleAdd">新增商品</el-button>
  </div>
  <el-table :data="tableData" border style="width: 100%" empty-text="暂无数据">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="price" label="单价" />
    <el-table-column prop="count" label="库存" />
    <el-table-column prop="onsale" label="是否上架" :formatter="formatterOnsale" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column prop="createTime" label="添加时间" :formatter="formatTime" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="createVisible" :title="title" width="500px" :before-close="handleClose">
    <el-form ref="formRef" :model="createForm" label-width="80px">
      <!-- {{createForm}} -->
      <!-- <el-form-item prop="id" v-show="false">
        <input v-model="createForm.id">
      </el-form-item>-->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="createForm.name" placeholder="输入数量"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input v-model="createForm.count" placeholder="输入数量"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="createForm.price" placeholder="输入数量"></el-input>
      </el-form-item>
      <el-form-item label="是否上架" prop="onsale">
        <el-switch v-model="createForm.onsale"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="createForm.remark" placeholder="输入备注"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, getCurrentInstance } from "vue";
export default {
  name: "App",
  setup() {
    const { proxy } = getCurrentInstance();
    const formatTime = (row, col) => {
      const date = new Date(row[col.property]);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    };
    const formatterOnsale = (row, col) => {
      return row[col.property] ? "是" : "否";
    };
    const data = [
      {
        id: 1,
        name: "土豆",
        price: "1",
        count: "200",
        onsale: true,
        remark: "单位斤",
        createTime: "2021-2-7 12:22:23",
      },
      {
        id: 2,
        name: "南瓜",
        price: "2",
        count: "100",
        onsale: false,
        remark: "单位吨",
        createTime: "2021-2-7 12:20:25",
      },
      {
        id: 3,
        name: "地瓜",
        price: "2",
        count: "1000",
        onsale: true,
        remark: "单位斤",
        createTime: "2021-2-7 12:20:22",
      },
    ];
    const tableData = ref([]);
    const getTableData = () => {
      setTimeout(() => {
        // 失败
        // const res = { code: -1, msg: '系统异常'}
        // 成功
        const res = { code: 200, data: searchForm.name ? data.filter((v) => new RegExp(searchForm.name).test(v.name + "")) : data.slice(), msg: '' }
        if (res.code !== 200) {
          tableData.value = [];
          proxy.$message.error(res.msg);
          return;
        }
        tableData.value = res.data;
      }, 300)
    };
    
    const searchForm = reactive({
      name: "",
    });
    const handleSearch = () => {
      getTableData()
    };

    const formRef = ref();
    const title = ref("新增商品");
    const createVisible = ref(false);
    const createForm = reactive({
      id: "",
      name: "",
      price: "",
      count: "",
      onsale: false,
      remark: "",
    });
    const defaultForm = { ...createForm }
    const onCreate = (info) => {
      // 模拟后台请求返回的异步过程
      setTimeout(() => {
        // 失败
        // const res = { code: -1, msg: '系统异常'}
        // 成功
        const res = { code: 200, msg: '' }
        if (res.code !== 200) {
          proxy.$message.error(res.msg);
        } else {
          const newinfo = {
            ...info,
            createTime: new Date(),
            id: `id_${Date.now()}`,
          };
          // 模拟后台数据处理
          data.unshift(newinfo);
          proxy.$message.success("新增成功");
          handleClose();
          getTableData()
        }
      }, 300)
    };
    const onUpdate = (newinfo) => {
      // 模拟后台修改请求返回的异步结果
      setTimeout(() => {
        // 失败
        // const res = { code: -1, msg: '系统异常'}
        // 成功
        const res = { code: 200, msg: '' }
        if (res.code !== 200) {
          proxy.$message.error(res.msg);
        } else {
          const index = data.findIndex((v) => v.id === newinfo.id);
          data[index] = {
            ...data[index],
            ...newinfo,
          };
          proxy.$message.success("修改成功");
          handleClose();
          getTableData()
        }
      }, 300)
    };
    const handleClose = () => {
      createVisible.value = false;
      for (const k in defaultForm) {
        createForm[k] = defaultForm[k];
      }
    };
    const handleDelete = (row) => {
      proxy.$confirm(`确定取消该商品商品：${row.name}？`, "确认", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        // 模拟后台请求删除返回的异步结果
        setTimeout(() => {
          // 删除失败
          // const res = {code: -1, msg: '删除失败'}
          // 删除成功
          const res = { code: 200, msg: '' }
          if (res.code !== 200) {
            proxy.$message({
              type: "error",
              message: "商品删除失败",
            });
          } else {
            // 模拟后台处理过程
            const index = data.findIndex((v) => v.id === row.id);
            data.splice(index, 1);
            proxy.$message({
              type: "success",
              message: "商品删除成功",
            });
            getTableData()
          }
        }, 300);
      });
    };
    const handleConfirm = () => {
      if (createForm.id) {
        onUpdate(createForm);
      } else {
        onCreate(createForm);
      }
    };
    const handleAdd = () => {
      title.value = "新增商品";
      createVisible.value = true;
    };
    const handleEdit = async (row) => {
      title.value = "编辑商品";
      createVisible.value = true;
      for (const k in createForm) {
        createForm[k] = row[k]
      }
    };

    getTableData()

    return {
      handleSearch,
      formatTime,
      formatterOnsale,
      tableData,
      searchForm,
      formRef,
      title,
      createForm,
      createVisible,
      handleAdd,
      handleClose,
      handleDelete,
      handleEdit,
      handleConfirm,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
