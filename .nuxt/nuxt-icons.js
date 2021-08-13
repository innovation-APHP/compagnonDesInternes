export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.758fac.png","120x120":"/_nuxt/icons/icon_120.758fac.png","144x144":"/_nuxt/icons/icon_144.758fac.png","152x152":"/_nuxt/icons/icon_152.758fac.png","192x192":"/_nuxt/icons/icon_192.758fac.png","384x384":"/_nuxt/icons/icon_384.758fac.png","512x512":"/_nuxt/icons/icon_512.758fac.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
