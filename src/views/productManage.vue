<template>
    <div class="mainContent">

        <el-row class="mainContent-topTitle">
            <el-col>产品管理</el-col>
        </el-row>

        <!--工具条-->
        <el-form class="operateBar" :inline="true">
            <el-form-item>
                <el-input placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline">新增产品</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" disabled><i class="al-icon-jinyong"></i>禁用</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" disabled><i class="al-icon-qiyong"></i>启用</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-delete" disabled>批量删除</el-button>
            </el-form-item>
        </el-form>

        <!--列表-->
        <el-table class="tableContent"
                  @selection-change="selsChange"
                  highlight-current-row
                  :stripe="true"
                  :border="true"
                  v-loading="tableLoading"
                  :data="productList">
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
            <el-table-column prop="productName" label="产品名称" sortable></el-table-column>
            <el-table-column prop="createBy" align="center" label="创建人" width="100" sortable></el-table-column>
            <el-table-column prop="createDate" align="center" label="创建时间" width="200" sortable></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="status" label="状态" width="60"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="success" plain size="mini">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteProduct(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination class="paginationBar"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="currentPageSize"
                       :total="totalCount"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

    </div>
</template>

<script>
    import * as api from '../api/api'

	export default {
		name: "productManage",
        data(){
		    return{
                currentPage: 1,
                currentPageSize: 10,
                totalCount: 0,
                tableLoading: false,
                selsChange: true,
                productList: [],

            }
        },
        methods:{
            handleSizeChange(val) {
                let _this = this;
                _this.currentPageSize = val;
                //_this.allProductColumn();
            },
            handleCurrentChange(val) {
                let _this = this;
                if (val !== _this.currentPage) {
                    _this.currentPage = val;
                    //this.allProductColumn();
                }
            },
            deleteProduct(id) {
                let _this = this;
                _this.$confirm('确定要删除该产品吗?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    /*api.deleteProduct({
                        id: id
                    }, function (data, msg) {
                        _this.$notify.success(msg);
                        _this.allProductColumn();
                        _this.$eventBus.$emit(_this.$eventFlag.refreshColumn);
                    }, function (msg) {
                        _this.$message.error(msg);
                    })*/
                }).catch(() => {
                });
            }
        }
	}
</script>
<style>

    [class^="al-icon"]{
       font-size: 14px;
       margin-right: 5px;
    }
</style>
