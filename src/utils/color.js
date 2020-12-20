/**
 * color转rgb 获取颜色rgb值 用于计算
 * @param {string} hexcolor
 * @return {Array} rgb颜色值 数组
 */
const colorToRgb = hexcolor => {
  let r
  let g
  let b
  if (hexcolor.substr(0, 3) === 'rgb') {
    const start = hexcolor.indexOf('(') + 1
    const length = hexcolor.indexOf(')') - start
    const rgb = hexcolor.substr(start, length).split(',')
    r = parseInt(rgb[0])
    g = parseInt(rgb[1])
    b = parseInt(rgb[2])
  } else {
    hexcolor = hexcolor.substr(0, 1) === '#' ? hexcolor.substr(1) : hexcolor
    if (hexcolor.length === 3) {
      const rgb = hexcolor.split('')
      hexcolor = `${rgb[0]}${rgb[0]}${rgb[1]}${rgb[1]}${rgb[2]}${rgb[2]}`
    }
    r = parseInt(hexcolor.substr(0, 2), 16)
    g = parseInt(hexcolor.substr(2, 2), 16)
    b = parseInt(hexcolor.substr(4, 2), 16)
  }
  return [r, g, b]
}

/**
 * 颜色减淡
 * @param {string} color hex颜色值
 * @param {number} level 0-1
 * @return {string} rgb颜色值
 */
const colorLighten = (color, level = 1) => {
  const rgb = colorToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  }
  return `rgb(${rgb.join(',')})`
}

/**
 * 颜色加深
 * @param {string} color hex颜色值
 * @param {number} level 0-1
 * @return {string} rgb颜色值
 */
const colorDark = (color, level = 1) => {
  const rgb = colorToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level))
  }
  return `rgb(${rgb.join(',')})`
}

/**
 * 计算出具有较高对比度的颜色是白色还是黑色
 * @param {string} hexcolor hex颜色 或者rgb颜色
 * 传入一个hex颜色值会自动对比用这个颜色做为背景，文字应该用白色还是黑色
 */
const getContrastYIQ = hexcolor => {
  let yiq
  const [r, g, b] = colorToRgb(hexcolor)
  yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'black' : 'white'
}

/**
 * 验证是否是合法的颜色值
 * @param {string} color 颜色值
 */
const isColorString = color => {
  const re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
  const re2 = /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i
  const re3 = /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i
  return re2.test(color) || re1.test(color) || re3.test(color);
}

export {
  colorToRgb,
  colorLighten,
  colorDark,
  getContrastYIQ,
  isColorString
}
