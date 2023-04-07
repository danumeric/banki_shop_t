import Vue from 'vue'
import VBtnCustom from '@/components/base/VBtnCustom'
import VInputCustom from '@/components/base/VInputCustom'

const components = {
  VBtnCustom,
  VInputCustom,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

Vue.filter('formattedPrice', (value) => {
  if (!value) return
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
})
