/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
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
                    { title: 'Warehouses', active: true}
                  ],
                  pageTitle: 'Warehouses'
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
                    { title: 'Units', active: true}
                  ],
                  pageTitle: 'Units'
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
                    { title: 'Currencies', active: true}
                  ],
                  pageTitle: 'Currencies'
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
                    { title: 'Categories', active: true}
                  ],
                  pageTitle: 'Categories'
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
                    { title: 'Taxes', active: true}
                  ],
                  pageTitle: 'Taxes'
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
