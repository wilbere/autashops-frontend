/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/admin/dashboard",
    name: "Dashboard",
    slug: "Dashboard",
    icon: "BarChart2Icon",
  },
  {
    url: "/admin/settings",
    name: "Settings",
    slug: "settings",
    icon: "FileIcon",
    submenu: [
      {
        url: '/admin/settings/warehouses',
        name: 'Warehouses',
        slug: 'warehouses'
      },
      {
        url: '/admin/settings/units',
        name: 'Units',
        slug: 'units'
      },
      {
        url: '/admin/settings/taxes',
        name: 'Tax',
        slug: 'taxes'
      },
      {
        url: '/admin/settings/categories',
        name: 'Categories',
        slug: 'categories'
      },
      {
        url: '/admin/settings/currencies',
        name: 'Currencies',
        slug: 'currencies'
      },
    ]
  },
]
