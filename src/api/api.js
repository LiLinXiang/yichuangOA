/**
 * Created By   : lilinxiang
 * Created Date : 2018/7/30
 * Description  :
 */
import {$post} from "~/api/baseApi";


export const login = (params, success, error) => $post('/api/login', params, success, error);
export const logout = (params, success, error) => $post('/api/logout', params, success, error);
export const getCurrentUserInfo = (params, success, error) => $post('/api/getCurrentUserInfo', params, success, error);
export const allProductColumn = (params, success, error) => $post('/api/allProductColumn', params, success, error);
export const deleteProductColumn = (params, success, error) => $post('/api/deleteProductColumn', params, success, error);
export const addProductColumn = (params, success, error) => $post('/api/addProductColumn', params, success, error);
export const changeProductColumn = (params, success, error) => $post('/api/changeProductColumn', params, success, error);
