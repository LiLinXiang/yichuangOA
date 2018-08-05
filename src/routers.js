/**
 * Created By   : lilinxiang
 * Created Date : 2018/7/30
 * Description  :
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "group-foo" */ './views/login');
const NotFound = () => import(/* webpackChunkName: "group-foo" */ './views/404');
const Index = () => import(/* webpackChunkName: "group-foo" */ './views/index');
const ProductColumnManage = () => import(/* webpackChunkName: "group-foo" */ './views/productColumnManage');
const Home = () => import(/* webpackChunkName: "group-foo" */ './views/home');
const ProductManage = () => import(/* webpackChunkName: "group-foo" */ './views/productManage');
const ProductEdit = () => import(/* webpackChunkName: "group-foo" */ './views/productEdit');


let routes = [
	{
		path: '/',
		redirect: {
			path: '/login'
		}
	},
	{
		path: '/login',
		name: '登录',
		component: Login
	},
	{
		path: '/404',
		name: '404',
		component: NotFound
	},
	{
		path: '/index',
		name: '主页',
		component: Index,
		children: [
			{
				path: '/index/',
				redirect: {
					path: '/index/home'
				}
			},
			{
				path: '/index/home',
				name: '数据总揽',
				component: Home
			},
			{
				path: '/index/productColumnManage',
				name: '栏目管理',
				component: ProductColumnManage
			},
            {
                path: '/index/productManage',
                name: '产品管理',
                component: ProductManage
            },
            {
                path: '/index/productEdit',
                name: '产品编辑',
                component: ProductEdit
            }
		]

	},
];

Vue.use(VueRouter);
let router = new VueRouter({
	routes
});
export default router;