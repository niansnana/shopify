# Shopify

**全栈商城项目**

## 前言

既想写给2020的你，也想贪心写给10年、20年后的工程师们，现在的你站在浪潮之巅，面对魔幻的互联网世界，很容易把一条河流看成整片大海。未来的读者已经知道了这段技术发展历史，但难免会忽略一些细节。如果未来的工程师们真的创造出了时间旅行机器，可以让你回到2020年。那么这个项目就是你和当年工程师们的接口暗号，你能感知到他们在这个时代的键盘上留下的余温。

(上段文字灵感来源于何帆《变量》)

## 界面预览
![商品列表](https://cdn.jsdelivr.net/gh/niansnana/figurebed/blog/image/goods.jpg)

已完成功能

- [x] 增删改查
- [x] 商品检索
- [x] 分页功能
- [ ] 商品分类
- [ ] 权限管理
- [ ] 其他页面

## 使用方法

1. 运行项目

   ```sh
   # 下载项目
   git clone https://github.com/niansnana/shopify.git
   # 下载依赖包
   yarn install
   # 在线运行查看
   yarn serve
   # 打包项目（可选）
   yarn build
   ```

2. 接口调用

   - 地址：[shopifyAPI](https://github.com/niansnana/shopifyAPI)

   - 环境要求

     - Apache >= 2.4.39
     - Mysql >= 8.0.12
   
   - 使用方法
   
     ```sh
     # 下载项目包
     git clone https://github.com/niansnana/shopifyAPI.git
     # 数据库
     暂时不提供，你可以使用migration自动生成
     # 运行项目接口
     php artisan serve
     ```
   - 具体调用方法
   
     [点击查看](https://github.com/niansnana/shopifyAPI/blob/master/readme.md)

## 项目说明

这仅仅是练手项目，有许多瑕疵与槽点。

专业写bug的业余用户。