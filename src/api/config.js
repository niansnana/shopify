/*
 * @Author: niansnana
 * @Begin: 2020-03-30 16:49:07
 * @Update: 
 * @Update log: 归类API接口
*/
const api = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/' : ''
// ===================管理员接口
export const adminList = api + 'admin'  // 获取所有管理员用户
export const adminCreate = api + 'admin/add'    // 创建管理员
export const adminLogin = api + 'admin/login'
export const adminUpdate = api + 'admin/update'    // 更新管理员
export const adminDestroy = api + 'admin/delete'    // 删除管理员

// ===================商品管理
export const goods = api + 'goods'

