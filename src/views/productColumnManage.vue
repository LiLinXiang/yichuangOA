<template>
	<div class="mainContent">
		<el-row class="mainContent-topTitle">
			<el-col><label>产品栏目管理</label></el-col>
		</el-row>

		<!--工具条-->
		<el-form :inline="true" class="operateBar">
			<el-form-item>
				<el-input placeholder="请输入栏目名称" v-model="searchName">
                    <el-button slot="append" icon="el-icon-search" @click="searchColumn"></el-button>
                </el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-circle-plus-outline"
						   @click="showDialog(null)">新增栏目
				</el-button>
			</el-form-item>
		</el-form>

		<!--列表-->
		<el-table class="tableContent"
                  highlight-current-row
                  :stripe="true"
                  :border="true"
				  v-loading="tableLoading"
                  :data="productColumnList">
			<el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
			<el-table-column prop="columnName" label="栏目名称" sortable></el-table-column>
			<el-table-column prop="createBy" align="center" label="创建人" width="100" sortable></el-table-column>
			<el-table-column prop="createDate" align="center" label="创建时间" width="200" sortable></el-table-column>
			<el-table-column prop="remark" label="备注" sortable></el-table-column>
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

		<!--弹框-->
		<el-dialog v-bind:title="changeDialog.title"  width="550px"  :visible.sync="changeDialog.dialogVisible">
			<el-form :model="changeDialog" :rules="changeDialog.rules" label-width="95px">
				<el-form-item label="栏目名称：" prop="columnName">
					<el-input v-model="changeDialog.columnName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="栏目备注：">
					<el-input type="textarea" v-model="changeDialog.remark" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="changeDialog.dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import * as api from '../api/api';

	export default {
		name: "productColumnManage",
		data() {
			return {
				currentPage: 1,
				currentPageSize: 10,
				totalCount: 0,
				tableLoading: false,
				productColumnList: [],
				searchName: "",
				changeDialog: {
					dialogVisible: false,
					title: "",
					rules: {
						columnName: [
							{required: true, message: '请输入栏目名', trigger: 'blur'},
						]
					},
					id: "",
					columnName: "",
					remark: ""
				}
			}
		},
		mounted() {
			this.allProductColumn();
		},
		methods: {
			handleSizeChange(val) {
				let _this = this;
				_this.currentPageSize = val;
				_this.allProductColumn();
			},
			handleCurrentChange(val) {
				let _this = this;
				if (val !== _this.currentPage) {
					_this.currentPage = val;
					this.allProductColumn();
				}
			},
			showDialog(item) {
				let _this = this;
				if (item == null) {
					_this.changeDialog.title = '新增栏目';
					_this.changeDialog.id = '';
					_this.changeDialog.columnName = '';
					_this.changeDialog.remark = '';
				} else {
					_this.changeDialog.title = '修改栏目';
					_this.changeDialog.id = item.id;
					_this.changeDialog.columnName = item.columnName;
					_this.changeDialog.remark = item.remark;
				}
				_this.changeDialog.dialogVisible = true;
			},
			dialogConfirm() {
				let _this = this;
				if (_this.changeDialog.columnName === '') {
					_this.$message.warning('请输入栏目名');
					return;
				}
				if (_this.changeDialog.id === '') {
					_this.addColumn()
				} else {
					_this.changeColumn()
				}
			},
			allProductColumn() {
				let _this = this;
				_this.tableLoading = true;
				api.allProductColumn({
					page: _this.currentPage,
					pageSize: _this.currentPageSize
				}, function (data, msg, count) {
					_this.tableLoading = false;
					_this.totalCount = count;
					_this.productColumnList = data;
				}, function (msg) {
					_this.tableLoading = false;
				})
			},
			searchColumn() {
				let _this = this;
				api.allProductColumn({
					columnName: _this.searchName,
					page: _this.currentPage,
					pageSize: _this.currentPageSize
				}, function (data, msg, count) {
					_this.totalCount = count;
					_this.productColumnList = data;
				}, function (msg) {

				})
			},
			addColumn() {
				let _this = this;
				api.addProductColumn({
					columnName: _this.changeDialog.columnName,
					remark: _this.changeDialog.remark
				}, function (data, msg) {
					_this.changeDialog.dialogVisible = false;
					_this.$notify.success(msg);
					_this.$eventBus.$emit(_this.$eventFlag.refreshColumn);
					_this.allProductColumn();
				}, function (msg) {
					_this.changeDialog.dialogVisible = false;
					_this.$message.error(msg);
				})
			},
			changeColumn() {
				let _this = this;
				api.changeProductColumn({
					id: _this.changeDialog.id,
					columnName: _this.changeDialog.columnName,
					remark: _this.changeDialog.remark
				}, function (data, msg) {
					_this.changeDialog.dialogVisible = false;
					_this.$notify.success(msg);
					_this.$eventBus.$emit(_this.$eventFlag.refreshColumn);
					_this.allProductColumn();
				}, function (msg) {
					_this.changeDialog.dialogVisible = false;
					_this.$message.error(msg);
				})
			},
			deleteColumn(id) {
				let _this = this;
				_this.$confirm('确定要删除该栏目吗?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					api.deleteProductColumn({
						id: id
					}, function (data, msg) {
						_this.$notify.success(msg);
						_this.allProductColumn();
						_this.$eventBus.$emit(_this.$eventFlag.refreshColumn);
					}, function (msg) {
						_this.$message.error(msg);
					})
				}).catch(() => {
				});
			}
		}
	}
</script>