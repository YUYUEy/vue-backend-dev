<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-27 12:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <el-button type="primary" @click="getTableData">查询</el-button>
            </p>
            <p>
                <el-pagination @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[10, 20, 60, 100]"
                    :page-size="10"
                    layout="sizes, prev, pager, next"
                    :total="alltotal"/>
            </p>
        <!-- 列表体 -->
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(item,index) in tableData" :key="index" :title="item.name" :name="index">
                    <h3><a :href="'http://'+item.website"  target="_blank">{{item.code}}</a></h3>
                    <div style="text-indent:2em;">{{item.intro}}</div>
                </el-collapse-item>
            </el-collapse>
       

    </div>
</template>

<script>
import dialogDrag from '@/util/directives'

export default {
    name: 'promoTable',
    data() {
        return {
            itemQty: 1,
            dialogTableVisible: false,
            page: 1,
            pageSize:10,
            alltotal: 0,
            currentTitle:'',
            currentRow:'',
            searchtext:'',
            tableData:  [],
            currentPage2: 1,
            activeName: '1'
        }
    },
    mounted() {
        this.getAlltotal()
        this.getTableData()
    },
    methods: {
        getAlltotal() {
            this.$post("http://localhost:8080/companylist/listCount", {}).then(res => {
                if(res.status=='success'){
                    this.alltotal = res.data
                }
            })
        },
        handleSizeChange(val){
            this.pageSize =val
            this.getTableData()
        },
        handleCurrentChange(val){
            this.page =val
            this.getTableData()
        },
        
        editOne(val){
            this.currentTitle = val.title;
            this.currentRow =val.content.replace(/\n/g,'<br/>');
            this.dialogTableVisible =true
        },
        // 获取table数据
        getTableData() {
            let obj ={
                page: this.page,
                pageSize: this.pageSize,
            }
            this.$post("http://localhost:8080/companylist/list", obj).then(res => {
                this.tableData = res.data
            })
        },
    }
}
</script>
<style scoped>

</style>