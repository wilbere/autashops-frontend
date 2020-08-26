/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
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
    icon: "SettingsIcon",
    submenu: [
      {
        url: '/admin/settings/brands',
        name: 'Brands',
        slug: 'brands'
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
      {
        url: '/admin/settings/taxes',
        name: 'Tax',
        slug: 'taxes'
      },
      {
        url: '/admin/settings/units',
        name: 'Units',
        slug: 'units'
      },
      {
        url: '/admin/settings/warehouses',
        name: 'Warehouses',
        slug: 'warehouses'
      },
    ]
  },
]
