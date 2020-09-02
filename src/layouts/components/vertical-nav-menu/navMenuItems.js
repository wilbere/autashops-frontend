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
    name: "Tablero",
    slug: "dashboard",
    icon: "ActivityIcon",
  },
  {
    url: "/admin/products",
    name: "Productos",
    slug: "products",
    icon: "PackageIcon",
  },
  {
    url: "/admin/scores",
    name: "Cuentas",
    slug: "scores",
    icon: "DollarSignIcon",
  },
  {
    url: "/admin/clients",
    name: "Clientes",
    slug: "clients",
    icon: "UsersIcon",
  },
  {
    url: "/admin/shipping",
    name: "Envíos",
    slug: "shipping",
    icon: "TruckIcon",
  },
  {
    url: "/admin/suppliers",
    name: "Proveedores",
    slug: "suppliers",
    icon: "AwardIcon",
  },
  {
    url: "/admin/settings",
    name: "Configuración",
    slug: "settings",
    icon: "SettingsIcon",
    submenu: [
      {
        url: '/admin/settings/brands',
        name: 'Marcas',
        slug: 'brands'
      },
      {
        url: '/admin/settings/categories',
        name: 'Categorías',
        slug: 'categories'
      },
      {
        url: '/admin/settings/currencies',
        name: 'Monedas',
        slug: 'currencies'
      },
      {
        url: '/admin/settings/taxes',
        name: 'Impuestos',
        slug: 'taxes'
      },
      {
        url: '/admin/settings/units',
        name: 'Unidades',
        slug: 'units'
      },
      {
        url: '/admin/settings/warehouses',
        name: 'Almacenes',
        slug: 'warehouses'
      },
    ]
  },

]
