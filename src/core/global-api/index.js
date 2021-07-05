/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {   // 如果非生成环境给 Vue.config 赋值的化会有下面警告
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 初始化 Vue.config 对象
  // src\platforms\web\runtime\index.js 中给 config 初始化了一些属性
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 静态方法
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API  设置对象响应式
  Vue.observable = <>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)

  // ASSET_TYPES = ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 设置 keep-alive 组件 （extend：浅拷贝一个对象）
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)                // 注册 Vue.use() 用来注册插件
  initMixin(Vue)              // 注册 Vue.mixin() 实现混入
  initExtend(Vue)             // 注册 Vue.extend() 基于传入的 options 返回一个组件的构造函数
  // 注册 Vue.directive()、 Vue.component()、 Vue.filter()
  initAssetRegisters(Vue)     
}
