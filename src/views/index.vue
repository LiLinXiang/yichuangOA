<template>

	<el-container style="height: 100%;">
		<el-header background-color="#292b32">
			<div class="logo"><span>一创科技</span></div>
			<el-menu :default-active="activeIndex" style="width:130px;float:left" mode="horizontal"
					 background-color="#23262E" text-color="#fff" active-text-color="#009688">
				<el-menu-item index="1"><i class="el-icon-menu"></i>首页</el-menu-item>
			</el-menu>
			<el-menu :default-active="activeIndex2" style="width:285px;float:right"
					 mode="horizontal" @select="handleHeadMenuSelect" background-color="#23262E"
					 text-color="#fff" active-text-color="#009688">
				<el-menu-item index="1"><i class="al-icon-shouye"></i>查看网站</el-menu-item>
				<el-submenu index="2">
					<template slot="title"><img src="http://t.cn/RCzsdCq" class="userPhoto">宇顺电子
					</template>
					<el-menu-item index="2-1">基本资料</el-menu-item>
					<el-menu-item index="2-2">修改密码</el-menu-item>
					<el-menu-item index="2-3">退出</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-header>
		<el-container>
			<el-aside width="250px">
				<el-menu style="height: 100%;text-align: left" default-active="2"
						 class="el-menu-vertical-demo" @select="handleLeftMenuSelect"
						 @open="handleLeftMenuOpen" @close="handleLeftMenuClose"
						 background-color="#393D49" text-color="#fff" active-text-color="#009688">
					<el-menu-item index="1">
						<i class="el-icon-menu"></i>
						<span slot="title">数据总揽</span>
					</el-menu-item>
					<el-submenu index="2" style="background-color:#23262E">
						<template slot="title" style="background-color:#23262E">
							<i class="el-icon-menu"></i>
							<span style="background-color:#23262E">网站管理</span>
						</template>
						<el-menu-item index="2-1"><i class="el-icon-view"></i>首页管理</el-menu-item>
						<el-submenu index="2-2">
							<template slot="title"><i class="el-icon-view"></i>产品栏目管理</template>
							<el-menu-item v-for="(productColumn, index) in productColumnList"
										  :key="index" v-bind:index="'2-2-' + index"
										  @click="navProductClick(productColumn)">
								<i class="el-icon-edit"></i>{{ productColumn.columnName }}
							</el-menu-item>
						</el-submenu>
						<el-submenu index="2-3">
							<template slot="title"><i class="el-icon-view"></i>新闻栏目管理</template>
							<el-menu-item index="2-3-1"><i class="el-icon-edit"></i>公司新闻
							</el-menu-item>
							<el-menu-item index="2-3-2"><i class="el-icon-edit"></i>行业新闻
							</el-menu-item>
						</el-submenu>
						<el-menu-item index="2-4"><i class="el-icon-view"></i>关于我们</el-menu-item>
						<el-menu-item index="2-5"><i class="el-icon-view"></i>联系我们</el-menu-item>
						<el-menu-item index="2-6"><i class="el-icon-view"></i>在线留言</el-menu-item>
					</el-submenu>
					<el-menu-item index="3">
						<i class="el-icon-menu"></i>
						<span slot="title">操作手册</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-menu"></i>
						<span slot="title">关于一创</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<transition name="fade"
								mode="out-in">
						<router-view></router-view>
					</transition>
				</el-main>
				<el-footer height="44px"><span>© yeubaike.cn - 底部固定区域</span></el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	import * as api from '../api/api';

	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				productColumnList: [],
			};
		},
		created() {
			let _this = this;
			this.allProductColumn();
			this.$eventBus.$on(this.$eventFlag.refreshColumn, () => {
				_this.allProductColumn();
			})
		},
		beforeDestroy() {
			this.$eventBus.$off(this.$eventFlag.refreshColumn)
		},
		methods: {
			handleHeadMenuSelect(key, keyPath) {
				let _this = this;
				switch (key) {
					case '2-1':

						break;
					case '2-2':

						break;
					case '2-3':
						api.logout({},function (data,msg) {
							_this.$notify.success(msg);
							_this.$router.push('/login');
						},function (msg) {
							_this.$notify.error(msg)
						});
						break
				}
			},
			handleLeftMenuOpen(key, keyPath) {
				switch (key) {
					case '2-2':
						this.$router.push('/index/productColumnManage');
						break
				}
			},
			handleLeftMenuClose(key, keyPath) {
				switch (key) {
					case '2-2':
						this.$router.push('/index/productColumnManage');
						break
				}
			},
			handleLeftMenuSelect(key, keyPath) {
				switch (key) {
					case '1':
						this.$router.push('/index/home');
						break
				}
			},
			navProductClick(item) {
                this.$router.push('/index/productManage');
			},
			allProductColumn() {
				let _this = this;
				api.allProductColumn({}, function (data) {
					_this.productColumnList = data;
				})
			},
		}

	}
</script>

<style scoped lang="scss">
	.el-header {
		padding: 0;
		background-color: #23262E;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		//background-color: #E9EEF3;
		padding: 0;
	}

	.el-footer {
		background-color: #EEEEEE;
		color: #333;
		text-align: left;
		line-height: 40px;
	}

	.el-aside {
		background-color: #292b32;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-submenu {
		text-align: left;
	}

	.el-menu-item {
		text-align: left
	}

	.userPhoto {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		border-radius: 50%;
	}

	.logo {
		display: block;
		width: 250px;
		float: left;
		span {
			color: #009688;
			font-size: 18px;
		}
	}

	/*body > .el-container {
		margin-bottom: 40px;
	}*/

</style>