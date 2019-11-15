/*
 * @Author: your name
 * @Date: 2019-03-14 13:59:41
 * @LastEditTime: 2019-11-13 10:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\mock\navlist.js
 */
var data = [
    {
        path: '/home',
        name: '首页'
    },
    {
        name: '系统组件',
        child: [
            {
                name: '介绍',
                path: '/components'
            },
            {
                name: '功能类',
                child: [
                    {
                        path: '/components/permission',
                        name: '详细鉴权'
                    },
                    {
                        path: '/components/pageTable',
                        name: '表格分页'
                    }
                ]
            },
            {
                name: '布局类',
                child: [
                    {
                        path: '/components/pageTitle',
                        name: '页面标题'
                    },
                    {
                        path: '/components/pageSection',
                        name: '子区域'
                    },
                    {
                        path: '/components/pageSearch',
                        name: '搜索条'
                    },
                    {
                        path: '/components/pageToolbar',
                        name: '工具条'
                    }
                ]
            },
            {
                name: '辅助类',
                child: [
                    {
                        path: '/components/pageNotes',
                        name: '引用说明'
                    }
                ]
            }
        ]
    },
    {
        name: '完整示例',//
        child: [
            {
                path: '/example/table',
                name: '商品一览页面',
                permission: ['edit']
            },{
                path: '/example/itemList',
                name: '商品活动',
                permission: ['edit']
            },{
                path: '/example/dictList',
                name: '数据字典',
                permission: ['edit']
            },{
                path: '/example/promoList',
                name: '促销一览页面',
                permission: ['edit']
            },{
                path: '/example/orderList',
                name: '订单一览页面',
                permission: ['edit']
            },{
                path: '/example/xiaoquList',
                name: '小区一览页面',
                permission: ['edit']
            },
            {
                path: '/example/charts',
                name: '图表页面'
            },
            {
                path: '/example/map',
                name: '地图页面'
            }
        ]
    },
    {
        path: '/i18n',
        name: '国际化'
    },
    {
        path: '/theme',
        name: '主题切换'
    }
]

export default [{
    path: '/user/navlist',
    data: data
}]