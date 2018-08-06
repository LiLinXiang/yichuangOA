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
const Home = () => import(/* webpackChunkName: "group-foo" */ './views/home');
const ProductColumnManage = () => import(/* webpackChunkName: "group-foo" */ './views/productColumnManage');
const ProductEdit = () => import(/* webpackChunkName: "group-foo" */ './views/productEdit');
const ProductManage = () => import(/* webpackChunkName: "group-foo" */ './views/productManage');
const NewsColumnManage = () => import(/* webpackChunkName: "group-foo" */ './views/newsColumnManage');
const NewsEdit = () => import(/* webpackChunkName: "group-foo" */ './views/newsEdit');
const NewsManage = () => import(/* webpackChunkName: "group-foo" */ './views/newsManage');

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
				name: '产品栏目管理',
				component: ProductColumnManage
			},
            {
                path: '/index/productManage',
                name: '产品列表管理',
                component: ProductManage
            },
            {
                path: '/index/productEdit',
                name: '产品详情编辑',
                component: ProductEdit
            },
            {
                path: '/index/newsColumnManage',
                name: '新闻栏目管理',
                component: NewsColumnManage
            },
            {
                path: '/index/newsManage',
                name: '新闻列表管理',
                component: NewsManage
            },
            {
                path: '/index/newsEdit',
                name: '新闻详情编辑',
                component: NewsEdit
            }
		]

	},
];

Vue.use(VueRouter);
let router = new VueRouter({
	routes
});
export default router;