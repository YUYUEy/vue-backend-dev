<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-12 16:43:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入查询条件"></el-input>
                <el-button type="primary" @click="getTableData">查询</el-button>
                <el-button type="primary" @click="addNew">新增</el-button>
                <el-button type="primary" @click="editOne">修改</el-button>
                <el-button type="primary" @click="deleteRow">删除</el-button>
            </p>
        <!-- 表格体 -->
            <el-table :data="tableData" border stripe  @selection-change="checkChange" highlight-current-row>
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="id" label="ID" sortable width="70" />
                <el-table-column prop="name" label="名称" sortable />
                <el-table-column prop="value" label="值" sortable />
                <el-table-column prop="state" label="状态" sortable />
                <el-table-column prop="catalog" label="类别" sortable />
                <el-table-column prop="memo" label="备注" sortable />
            </el-table>

        <el-dialog title="新增商品" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
        <el-form ref="form" :model="form" label-width="80px" class="the_sub_form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" :label-width="formLabelWidth"><el-input v-model="form.name"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="值" :label-width="formLabelWidth"><el-input v-model="form.value"/></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth"><el-input v-model="form.memo"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option label="0" value="0"/>
                        <el-option label="1" value="1"/>
                    </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类别" :label-width="formLabelWidth"><el-input v-model="form.catalog"/></el-form-item>
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
    name: 'dictList',
    data() {
        return {
            dialogTableVisible: false,
            formLabelWidth:'100px',
            form:{
                "id": '',
                "catalog": '',
                "value": '',
                "name": '',
                "memo": '',
                "state": ''
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
            this.form= {
                    "id": '',
                    "catalog": '',
                    "value": '',
                    "name": '',
                    "memo": '',
                    "state": ''
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
            if(this.checkedData[0].id ==1|| this.checkedData[0].id==2 ||this.checkedData[0].id==3 || this.checkedData[0].id==4){
                return this.$message.error(`基础数据，请不要删除！`)
            }
            this.$confirm('确认删除吗？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
            .then(() => {
                let param = new URLSearchParams()
                param.append("idList", this.checkedData[0].id)
                this.$post("http://localhost:8080/dict/delete", param).then(res=>{
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
            this.$post("http://localhost:8080/dict/create", param).then(res => {
                if(res.status=='success'){
                    this.$message.success(`数据保存成功`)
                    this.dialogTableVisible = false;
                    this.getTableData()
                } else {
                    return this.$message.error(`数据保存失败`)
                }
            }).catch(err => {
                this.$message.error(`数据保存失败，失败码：${err}`)
            })
        },
        // 获取table数据
        getTableData() {
            let param = new URLSearchParams()
            param.append('catalog', '')
            param.append('state', '' )
            this.$post("http://localhost:8080/dict/list",param).then(res => {
                if(res.status=='success'){
                    console.log('tableData---', res)
                    // debugger
                    this.tableData = res.data
                }
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        },
    }
}
</script>
