/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '/admin/',
            component: () => import('./layouts/main/Main.vue'),
            redirect : '/admin/dashboard',
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/admin/dashboard',
                name: 'home',
                component: () => import('./views/Home.vue'),
                meta: {
                  rule: 'admin'
                }
              },
              {
                path: '/admin/profile',
                name: 'profile',
                component: () => import('./views/pages/user-settings/UserSettings.vue'),
                meta: {
                  rule: 'admin'
                }
              },
              {
                path: '/admin/settings/warehouses',
                name: 'warehouses',
                component: () => import('./views/pages/settings/warehouses/Warehouses.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Almacenes', active: true}
                  ],
                  pageTitle: 'Almacenes'
                }
              },
              {
                path: '/admin/settings/units',
                name: 'units',
                component: () => import('./views/pages/settings/units/Units.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Unidades', active: true}
                  ],
                  pageTitle: 'Unidades'
                }
              },
              {
                path: '/admin/settings/currencies',
                name: 'currencies',
                component: () => import('./views/pages/settings/currencies/Currencies.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Monedas', active: true}
                  ],
                  pageTitle: 'Monedas'
                }
              },
              {
                path: '/admin/settings/categories',
                name: 'categories',
                component: () => import('./views/pages/settings/categories/Categories.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Categorias', active: true}
                  ],
                  pageTitle: 'Categorias'
                }
              },
              {
                path: '/admin/settings/taxes',
                name: 'taxes',
                component: () => import('./views/pages/settings/taxes/Taxes.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Impuestos', active: true}
                  ],
                  pageTitle: 'Impuestos'
                }
              },
              {
                path: '/admin/settings/brands',
                name: 'Brands',
                component: () => import('./views/pages/settings/brands/Brands.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Configuración' },
                    { title: 'Marcas', active: true}
                  ],
                  pageTitle: 'Marcas'
                }
              },
              {
                path: '/admin/products/',
                name: 'Products',
                component: () => import('./views/pages/products/Products.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Productos', active: true}
                  ],
                  pageTitle: 'Productos'
                }
              },
              {
                path: '/admin/products/create',
                name: 'New Products',
                component: () => import('./views/pages/products/CreateProduct.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Productos', url: '/admin/products'},
                    { title: 'Nuevo', active: true}
                  ],
                  pageTitle: 'Nuevo Producto'
                }
              },
              {
                path: '/admin/clients/',
                name: 'Clients',
                component: () => import('./views/pages/clients/Clients.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Clientes', active: true}
                  ],
                  pageTitle: 'Clientes'
                }
              },
              {
                path: '/admin/suppliers/',
                name: 'Suppliers',
                component: () => import('./views/pages/suppliers/Suppliers.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Proveedores', active: true}
                  ],
                  pageTitle: 'Proveedores'
                }
              },
              {
                path: '/admin/shipping/',
                name: 'Shipping',
                component: () => import('./views/pages/shipping/Shipping.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Envíos', active: true}
                  ],
                  pageTitle: 'Envíos'
                }
              },
              {
                path: '/admin/scores/',
                name: 'Scores',
                component: () => import('./views/pages/scores/Scores.vue'),
                meta: {
                  rule: 'admin',
                  breadcrumb: [
                    { title: 'Home', url: '/admin/dashboard' },
                    { title: 'Cuentas', active: true}
                  ],
                  pageTitle: 'Cuentas'
                }
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '/admin/',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/admin/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue'),
                meta: {
                  rule: 'guest'
                },
              },
              {
                path: '/admin/register',
                name: 'page-register',
                component: () => import('@/views/pages/Register.vue'),
                meta: {
                  rule: 'guest'
                },
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue'),
                meta: {
                  rule: 'guest'
                },
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
