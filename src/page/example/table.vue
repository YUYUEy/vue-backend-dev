<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-11 18:28:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
        <app-title title="表格综合"></app-title>
        <app-notes>本页实际路径: src/page/example/table.vue   table根组件为ElementUI。table配置请查看官方文档，table分页请查看“系统组件-功能类-表格分页”</app-notes>
        <!-- 工具条 -->
        <app-toolbar>
            <p>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入查询条件"></el-input>
                <el-button type="primary" @click="getTableData">查询</el-button>
                <el-button type="primary" @click="addNew">新增</el-button>
                <el-button type="primary" @click="editOne">修改</el-button>
                <el-button type="primary" @click="deleteRow">删除</el-button>
            </p>
        </app-toolbar>
        <!-- 表格体 -->
            <el-table :data="tableData" border stripe  @selection-change="checkChange">
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="title" label="标题" sortable width="150" :show-overflow-tooltip="true"/>
                <el-table-column prop="imgUrl" label="图片" sortable width="100" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <img style="width:60px;height:40px;" :src="scope.row.imgUrl" />
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" sortable :show-overflow-tooltip="true"/>
                <el-table-column prop="price" label="价格" sortable width="120" :show-overflow-tooltip="true"/>
                <el-table-column prop="sales" label="销量" sortable width="120" :show-overflow-tooltip="true"/>
            </el-table>
              
        <el-dialog title="新增商品" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
        <el-form ref="form" :model="form" label-width="80px" class="the_sub_form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题" :label-width="formLabelWidth"><el-input v-model="form.title"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片路径" :label-width="formLabelWidth"><el-input v-model="form.imgUrl"/></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="描述" :label-width="formLabelWidth"><el-input v-model="form.description"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格" :label-width="formLabelWidth"><el-input v-model="form.price"/></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="库存" :label-width="formLabelWidth"><el-input v-model="form.stock"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ID" :label-width="formLabelWidth"><el-input v-model="form.id" disabled/></el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-right: 100px;margin-top: 19px;">
            <el-col :span="24">
              <el-form-item label="" label-width="200px">
                <el-button @click="dialogTableVisible = false" size="small" style="width: 100px">取消</el-button>
                <el-button type="primary" @click="insertOne" size="small" style="width: 100px">確定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <p>
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 60, 100]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"/>
      </p>

    </div>
</template>

<script>
export default {
    name: 'exampleTable',
    data() {
        return {
            dialogTableVisible: false,
            formLabelWidth:'100px',
            form:{
                id:'',
                title:'',
                imgUrl:'',
                description:'',
                price:'',
                stock:'',
            },
            searchtext:'',
            tableData:  [],
            checkedData:'',
            currentPage2: 1,
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            debugger
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            debugger
        },
        checkChange(val) {
            this.checkedData = val;
        },
        addNew(){
            this.form={
                id:'',
                title:'',
                imgUrl:'',
                description:'',
                price:'',
                stock:'',
            }
            this.dialogTableVisible = true;
        },
        editOne(){
            if(this.checkedData.length !==1) {
                return this.$message.info(`请选择一条数据！`)
            }
            for(let i in this.form){
                this.form[i] = this.checkedData[0][i]
            }
            this.dialogTableVisible = true;
        },
        deleteRow(){
            if(this.checkedData.length!==1){
                return this.$message.error(`请选择一条数据`)
            }
            this.$confirm('确认删除吗？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
            .then(() => {
                let url= "http://localhost:8080/item/delete"
                let param = new URLSearchParams()
                param.append("idList", this.checkedData[0].id)
                this.$post(url, param).then(res=>{
                    // console.log(res.data)
                    this.getTableData()
                    return this.$message.success(`删除数据成功！`)
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(`删除数据失败`)
                })
            })
            
        },
        insertOne(){
            let param = new URLSearchParams()
            for(let i in this.form){
                param.append(i, this.form[i]||'')
            }
            if(!param.toString()){
                return this.$message.info(`请输入必填的数据！`)
            }
            this.$post("http://localhost:8080/item/create",
                param
            ).then(res => {
                // console.log('create--->', res)
                 this.$message.success(`数据保存成功`)
                 this.dialogTableVisible = false;
                 this.getTableData()
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err}`)
            })
        },
        // 获取table数据
        getTableData() {
            let param = new URLSearchParams()
            param.append('title', this.searchtext )
            this.$post("http://localhost:8080/item/list",
                param
            ).then(res => {
                // console.log('tableData---', res)
                this.tableData = res.data
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        },
    }
}
</script>
