/**
 * Created By   : lilinxiang
 * Created Date : 2018/7/31
 * Description  :
 */
import axios from 'axios';
import router from '../routers';

const baseUrl = 'http://localhost:8080';
axios.defaults.withCredentials = true; //解决每次请求session不一致的问题

export const $postOld = (url, params, {success = () => {}, error = () => {}}) => {
	axios.post(baseUrl + url, params).then(res => {
		if (res.status === 200) {
			let {resultCode, resultMsg, resultBody} = res.data;
			if (resultCode === 100) {
				success(resultBody, resultMsg);
			} else {
				error(resultMsg, resultCode);
			}
		} else {
			error('无法连接服务器！');
		}
	});
};

export const $post = (url, params, success, error) => {
	console.log("╔════════════════════════════════════════════════");
	console.log("║   请求：" + baseUrl + url);
	console.log("║", params);
	axios.post(baseUrl + url, params, {
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		}
	}).then(response => {
		if (response.status === 200) {
			console.log("║   响应：" + baseUrl + url);
			console.log(response.data);
			console.log("╚════════════════════════════════════════════════");
			console.log("");
			let {resultCode, resultMsg, resultBody, resultCount} = response.data;
			switch (resultCode) {
				case 100:
					if (success !== undefined) success(resultBody, resultMsg, resultCount);
					break;
				case 101:
					vm.$notify.error(resultMsg);
					router.push('/login');
					break;
				default:
					if (error !== undefined) error(resultMsg, resultCode);
					break;
			}
		} else {
			console.log("║   无法连接服务器！");
			console.log("╚════════════════════════════════════════════════");
			console.log("");
			if (error !== undefined) error('无法连接服务器！', -1);
		}
	}).catch(() => {
		console.log("║   无法连接服务器！");
		console.log("╚════════════════════════════════════════════════");
		console.log("");
		if (error !== undefined) error('无法连接服务器！', -1);
	});
};