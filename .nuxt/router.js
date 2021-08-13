import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _40ea7635 = () => interopDefault(import('../pages/annuaire/index.vue' /* webpackChunkName: "pages/annuaire/index" */))
const _581cc381 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _6ee3c7e4 = () => interopDefault(import('../pages/help.vue' /* webpackChunkName: "pages/help" */))
const _4441dd7e = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _2b2db480 = () => interopDefault(import('../pages/planning.vue' /* webpackChunkName: "pages/planning" */))
const _0d066ac2 = () => interopDefault(import('../pages/profil.vue' /* webpackChunkName: "pages/profil" */))
const _7e3f9374 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _75ee50f6 = () => interopDefault(import('../pages/annuaire/hopital/index.vue' /* webpackChunkName: "pages/annuaire/hopital/index" */))
const _c73901f4 = () => interopDefault(import('../pages/annuaire/new/index.vue' /* webpackChunkName: "pages/annuaire/new/index" */))
const _35ba1b38 = () => interopDefault(import('../pages/annuaire/specialites/index.vue' /* webpackChunkName: "pages/annuaire/specialites/index" */))
const _eda96d6e = () => interopDefault(import('../pages/annuaire/tous/index.vue' /* webpackChunkName: "pages/annuaire/tous/index" */))
const _7258abcc = () => interopDefault(import('../pages/hopital/informations.vue' /* webpackChunkName: "pages/hopital/informations" */))
const _a5afc6f8 = () => interopDefault(import('../pages/service/informations.vue' /* webpackChunkName: "pages/service/informations" */))
const _4dc331d0 = () => interopDefault(import('../pages/stages/liste.vue' /* webpackChunkName: "pages/stages/liste" */))
const _7b49ab67 = () => interopDefault(import('../pages/annuaire/hopital/_department/index.vue' /* webpackChunkName: "pages/annuaire/hopital/_department/index" */))
const _739e6c6e = () => interopDefault(import('../pages/annuaire/specialites/_specialite/index.vue' /* webpackChunkName: "pages/annuaire/specialites/_specialite/index" */))
const _50d89dba = () => interopDefault(import('../pages/annuaire/tous/_contact.vue' /* webpackChunkName: "pages/annuaire/tous/_contact" */))
const _0c8c5c31 = () => interopDefault(import('../pages/annuaire/hopital/_department/_hospital/index.vue' /* webpackChunkName: "pages/annuaire/hopital/_department/_hospital/index" */))
const _741d4d3a = () => interopDefault(import('../pages/annuaire/specialites/_specialite/_contact.vue' /* webpackChunkName: "pages/annuaire/specialites/_specialite/_contact" */))
const _0e6fc1d2 = () => interopDefault(import('../pages/annuaire/hopital/_department/_hospital/_contact.vue' /* webpackChunkName: "pages/annuaire/hopital/_department/_hospital/_contact" */))
const _1a81b582 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/annuaire",
    component: _40ea7635,
    name: "annuaire"
  }, {
    path: "/dashboard",
    component: _581cc381,
    name: "dashboard"
  }, {
    path: "/help",
    component: _6ee3c7e4,
    name: "help"
  }, {
    path: "/onboarding",
    component: _4441dd7e,
    name: "onboarding"
  }, {
    path: "/planning",
    component: _2b2db480,
    name: "planning"
  }, {
    path: "/profil",
    component: _0d066ac2,
    name: "profil"
  }, {
    path: "/settings",
    component: _7e3f9374,
    name: "settings"
  }, {
    path: "/annuaire/hopital",
    component: _75ee50f6,
    name: "annuaire-hopital"
  }, {
    path: "/annuaire/new",
    component: _c73901f4,
    name: "annuaire-new"
  }, {
    path: "/annuaire/specialites",
    component: _35ba1b38,
    name: "annuaire-specialites"
  }, {
    path: "/annuaire/tous",
    component: _eda96d6e,
    name: "annuaire-tous"
  }, {
    path: "/hopital/informations",
    component: _7258abcc,
    name: "hopital-informations"
  }, {
    path: "/service/informations",
    component: _a5afc6f8,
    name: "service-informations"
  }, {
    path: "/stages/liste",
    component: _4dc331d0,
    name: "stages-liste"
  }, {
    path: "/annuaire/hopital/:department",
    component: _7b49ab67,
    name: "annuaire-hopital-department"
  }, {
    path: "/annuaire/specialites/:specialite",
    component: _739e6c6e,
    name: "annuaire-specialites-specialite"
  }, {
    path: "/annuaire/tous/:contact",
    component: _50d89dba,
    name: "annuaire-tous-contact"
  }, {
    path: "/annuaire/hopital/:department/:hospital",
    component: _0c8c5c31,
    name: "annuaire-hopital-department-hospital"
  }, {
    path: "/annuaire/specialites/:specialite/:contact",
    component: _741d4d3a,
    name: "annuaire-specialites-specialite-contact"
  }, {
    path: "/annuaire/hopital/:department/:hospital/:contact",
    component: _0e6fc1d2,
    name: "annuaire-hopital-department-hospital-contact"
  }, {
    path: "/",
    component: _1a81b582,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
