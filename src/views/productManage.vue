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
                <el-button class="btn-green" type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-green" type="primary" icon="el-icon-circle-plus-outline">新增产品</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-green" type="primary" disabled><i class="al-icon-jinyong"></i>禁用</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-green" type="primary" disabled><i class="al-icon-qiyong"></i>启用</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-green" type="primary" icon="el-icon-delete" disabled>批量删除</el-button>
            </el-form-item>
        </el-form>

        <!--列表-->
        <el-table class="tableContent"
                  @selection-change="selsChange"
                  highlight-current-row
                  :stripe="true"
                  :border="true"
                  v-loading="tableLoading"
                  :data="productColumnList">
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
            <el-table-column prop="productName" label="产品名称" sortable></el-table-column>
            <el-table-column prop="createBy" align="center" label="创建人" width="100" sortable></el-table-column>
            <el-table-column prop="createDate" align="center" label="创建时间" width="200" sortable></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="status" label="状态" width="60"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="success" plain size="mini" @click="showDialog(scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="mini" @click="deleteColumn(scope.row.id)">删除
                    </el-button>
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
	export default {
		name: "productManage",
        data(){
		    return{
                selsChange: true,
                productColumnList: [
                    {
                        productName
                    },{

                    },{},{},{},{}
                ]

            }
        }
	}
</script>
<style>

    [class*="al-icon"]{
       font-size: 13px;
       margin-right: 5px;
    }
</style>
