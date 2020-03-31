/*
 * @Author: niansnana
 * @Begin: 2020-03-30 16:58:55
 * @Update: 2020-03-30 21:26:35
 * @Update log: 封装API
 * @update info: 完善
*/
import axios from 'axios'
import qs from 'qs'

import {
    adminList,
    adminCreate,
    adminLogin,
    adminUpdate,
    adminDestroy,
    goods
} from './config'

// 请求超时时间
axios.defaults.timeout = 30000  // 3s
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求加载
let loading
function startLoading () {
    loading = this.$loading.create({
        lock: true,
        text: '正在加载中···',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
// 结束加载
function endLoading () {
    loading.close()
}

export default {
    startLoading,
    endLoading,
    /**
     * 登录验证
     */
    userLoginFn (params) {
        return new Promise((resolve, reject) => {
            axios.post(adminLogin, qs.stringify(params)).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * get方法，对应get请求
     * 获取所有管理员用户
    */
    adminListFn () {
        return axios.get(adminList)
    },
    /**
     * 获取某个管理员用户
     * @param {*} id 用户 id
     */
    // adminOneFn (id) {
    //     return axios.get(adminList, {
    //         params: {
    //             id
    //         }
    //     })
    // },
    adminOneFn (params) {
        return new Promise((resolve, reject) => {
            axios.get(adminList, {
                params: params
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 创建新的管理员用户
     * @param {string} params 参数
     */
    adminCreateFn (params) {
        return new Promise((resolve, reject) => {
            axios.post(adminCreate, qs.stringify(params)).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 更新指定管理员用户
     * @param {num} id 用户 id
     */
    adminUpdateFn (id) {
        return axios.put(adminUpdate, {
            params: {
                id
            }
        })
    },
    /**
     * 删除指定管理员用户
     * @param {*} id 用户 id
     */
    adminDestroyeFn (id) {
        return axios.delete(adminDestroy, {
            params: {
                id
            }
        })
    },
    /**
     * 获取所有商品
     * @param {*} params 用户可选参数
     */
    GoodsListFn (params) {
        return new Promise((resolve, reject) => {
            axios.get(goods, {
                params: params
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 获取指定商品
     * @param {num} id 商品id
     * @param {*} params 商品可选参数
     */
    GoodsDetailFn (id, params) {
        return new Promise((resolve, reject) => {
            axios.get(`${goods}/${id}`, {
                params: { id, params }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 创建新商品
     * @param {*} params 商品可选参数
     */
    GoodsCreateFn (params) {
        return new Promise((resolve, reject) => {
            axios.post(goods, qs.stringify(params)).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 更新指定商品
     * @param {num} id 商品id
     * @param {*} params 商品可选参数
     */
    GoodsUpdateFn (id, params) {
        return new Promise((resolve, reject) => {
            axios.put(`${goods}/${id}`, qs.stringify(params)).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    /**
     * 删除指定商品
     * @param {num} id 商品id
     * @param {*} params 商品可选参数
     */
    GoodsDeleteFn (id, params) {
        return new Promise((resolve, reject) => {
            axios.delete(`${goods}/${id}`, {
                params: { id, params }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}