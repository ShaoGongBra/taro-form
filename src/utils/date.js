/**
 * 日期对象转换为指定格式的字符串
 * @param {string} formatStr 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
 * @param {Date|string|number} date Date日期对象或者时间戳或者带毫秒的时间戳, 如果缺省，则为当前时间
 * YYYY/yyyy/YY/yy 表示年份  
 * MM/M 月份  
 * W/w 星期  
 * dd/DD/d/D 日期  
 * hh/HH/h/H 时间  
 * mm/m 分钟  
 * ss/SS/s/S 秒  
 * @return string 指定格式的时间字符串
 */
const dateToStr = (formatStr = "yyyy-MM-dd HH:mm:ss", date) => {
  date = timeStampToDate(date)
  let str = formatStr
  let Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, date.getFullYear())
  str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))
  str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
  str = str.replace(/M/g, (date.getMonth() + 1))
  str = str.replace(/w|W/g, Week[date.getDay()])

  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
  str = str.replace(/d|D/g, date.getDate())

  str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
  str = str.replace(/h|H/g, date.getHours())
  str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
  str = str.replace(/m/g, date.getMinutes())

  str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
  str = str.replace(/s|S/g, date.getSeconds())

  return str
}

/**
 * 将10位或者13位的时间戳转为时间对象
 * @param {Date|string|number} date Date日期对象或者时间戳或者带毫秒的时间戳, 如果缺省，则为当前时间
 * @return {Date}
 */
const timeStampToDate = (date = new Date()) => {
  //传入数字自动计算
  if (typeof date !== 'object') {
    date = String(date)
    const len = date.length
    if (len == 10) {
      date += '000'
      date = new Date(date * 1)
    } else if (len == 13) {
      date = new Date(date * 1)
    } else if (len < 10) {
      let num = (Array(10).join(0) + date).slice(-10) 
      num += '000'
      date = new Date(num * 1)
    } else {
      date = new Date()
    }
  }
  return date
}

/**
 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 * @param {string} strInterval 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
 * @param {Date} dtStart 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param {Date} dtEnd 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒 
 */
const dateDiff = (strInterval, dtStart, dtEnd) => {
  switch (strInterval) {
    case 's': return parseInt((dtEnd - dtStart) / 1000)
    case 'n': return parseInt((dtEnd - dtStart) / 60000)
    case 'h': return parseInt((dtEnd - dtStart) / 3600000)
    case 'd': return parseInt((dtEnd - dtStart) / 86400000)
    case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7))
    case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1)
    case 'y': return dtEnd.getFullYear() - dtStart.getFullYear()
  }
}

/**
 * 日期计算  
 * @param {string} strInterval 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
 * @param {int} num 对应数值
 * @param {Date} date  日期对象
 * @return {Date} 返回计算后的日期对象
 */
const dateAdd = (strInterval, num, date = new Date()) => {
  switch (strInterval) {
    case 's': return new Date(date.getTime() + (1000 * num))
    case 'n': return new Date(date.getTime() + (60000 * num))
    case 'h': return new Date(date.getTime() + (3600000 * num))
    case 'd': return new Date(date.getTime() + (86400000 * num))
    case 'w': return new Date(date.getTime() + ((86400000 * 7) * num))
    case 'm': return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    case 'y': return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  }
}

/**
 * 判断闰年
 * @param {Date|string} date Date日期对象或者时间字符串
 * @return {boolean}
 */
const isLeapYear = (date = new Date()) => {
  if (typeof date !== 'object') {
    date = strToDate(date)
  }
  return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)))
}

/**
 * 字符串转换为日期对象
 * @param {string} dateStr 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
 * @return {Date} 转换后的日期对象
 */
const strToDate = dateStr => {
  const reCat = /(\d{1,4})/gm
  return new Date(...dateStr.match(reCat).map((item, index) => index === 1 ? --item : item))
}

/**
 * 把指定格式的字符串转换为日期对象
 * @param {string} formatStr 待转换的时间的时间格式 yyyy-MM-dd HH:mm:ss
 * @param {string} dateStr 待转换的时间字符串
 * @return {Date} 转换后的日期对象
 */
const strFormatToDate = (formatStr, dateStr) => {
  let year = 0
  let start = -1
  const len = dateStr.length
  if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
    year = dateStr.substr(start, 4)
  }
  let month = 0
  if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
    month = parseInt(dateStr.substr(start, 2)) - 1
  }
  let day = 0
  if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
    day = parseInt(dateStr.substr(start, 2))
  }
  let hour = 0
  if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
    hour = parseInt(dateStr.substr(start, 2))
  }
  let minute = 0
  if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
    minute = dateStr.substr(start, 2)
  }
  let second = 0
  if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
    second = dateStr.substr(start, 2)
  }
  return new Date(year, month, day, hour, minute, second)
}

/**
 * 日期对象转换为毫秒数
 */
const dateToLong = (date = new Date()) => {
  return date.getTime()
}

/**
 * 毫秒转换为日期对象
 * @param {number} dateVal 日期的毫秒数
 * @return {Date} 转换后的日期对象
 */
const longToDate = dateVal => {
  return new Date(dateVal)
}

/**
 * 判断字符串是不是一个数字
 * @param {string} str 字符串
 * @return {boolean}
 */
const isNumber = str => {
  let regExp = /^\d+$/g
  return regExp.test(str)
}

/**
 * 判断字符串是否为日期格式
 * @param {string} str 字符串
 * @param {string} formatStr 日期格式， 如下 yyyy-MM-dd
 * @return {boolean}
 */
const isDate = (str, formatStr = "yyyyMMdd") => {
  const yIndex = formatStr.indexOf("yyyy")
  if (yIndex == -1) {
    return false
  }
  const year = str.substring(yIndex, yIndex + 4)
  const mIndex = formatStr.indexOf("MM")
  if (mIndex == -1) {
    return false
  }
  const month = str.substring(mIndex, mIndex + 2)
  const dIndex = formatStr.indexOf("dd")
  if (dIndex == -1) {
    return false
  }
  const day = str.substring(dIndex, dIndex + 2)
  if (!isNumber(year) || year > "2100" || year < "1900") {
    return false
  }
  if (!isNumber(month) || month > "12" || month < "01") {
    return false
  }
  if (day > getMaxDay(year, month) + "" || day < "01") {
    return false
  }
  return true
}

/**
 * 返回月份的最大天数
 * @param {number} year 年
 * @param {number} month 月
 * @return {number} 当前月的最大天数
 */
const getMaxDay = (year, month) => {
  if (month == 4 || month == 6 || month == 9 || month == 11)
    return 30
  if (month == 2)
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
      return 29
    else
      return 28
  return 31
}

/**
 * 取得当前日期所在月的最大天数
 * @param {Date} date 日期对象
 * @return {number}
 */
const maxDayOfDate = (date = new Date()) => {
  date.setDate(1)
  date.setMonth(date.getMonth() + 1)
  const time = date.getTime() - 24 * 60 * 60 * 1000
  const newDate = new Date(time)
  return newDate.getDate()
}

/**
 * 取得指定日期数据信息
 * @param {string} interval 表示数据类型 y 年 M月 d日 w星期 ww周 h时 n分 s秒  
 * @param {Date} myDate 日期对象
 * @return {string|number}
 */
const datePart = (interval, myDate = new Date()) => {
  let partStr = ''
  const Week = ['日', '一', '二', '三', '四', '五', '六']
  switch (interval) {
    case 'y': partStr = myDate.getFullYear(); break
    case 'M': partStr = myDate.getMonth() + 1; break
    case 'd': partStr = myDate.getDate(); break
    case 'w': partStr = Week[myDate.getDay()]; break
    case 'ww': partStr = myDate.WeekNumOfYear(); break
    case 'h': partStr = myDate.getHours(); break
    case 'm': partStr = myDate.getMinutes(); break
    case 's': partStr = myDate.getSeconds(); break
  }
  return partStr
}

/**
 * 计算倒计时
 * @param {Date|string} time 根据类型传入不同的参数
 * @param {formatStr} formatStr d h m s ms 分别代表天、小时、分钟、秒、毫秒 将他们变为大写会补全为2位数 毫秒补全为3位数
 * @param {boolean} isEndTime true 第一个参数是结束时间 false 第一个参数是剩余秒数
 * @param {boolean} getAll true 返回所有类型时间
 * @return {object|str} 返回天时分秒对象 或者返回格式化后的时间字符串
 */
const endTime = (time, formatStr = 'd天H时M分S秒', isEndTime = false, getAll = false) => {
  if (isEndTime) {
    time = (timeStampToDate(time).getTime() - (new Date()).getTime())
  }
  time = Math.max(0, time)
  // 补全
  const completion = (number, length = 2) => {
    if (length === 2) {
      return `${number > 9 ? number : '0' + number}`
    } else {
      return `${number > 99 ? number : number > 9 ? '0' + number : '00' + number}`
    }
  }

  const data = {
    d: Math.floor(time / 1000 / 86400),
    h: Math.floor(time / 1000 / 3600 % 24),
    m: Math.floor(time / 1000 / 60 % 60),
    s: Math.floor(time / 1000 % 60),
    ms: Math.floor(time % 1000)
  }
  if (getAll) {
    return data
  }
  return formatStr
    .replace('d', data.d)
    .replace('D', completion(data.d))

    .replace('h', data.h)
    .replace('H', completion(data.h))

    .replace('ms', data.ms)
    .replace(/Ms|mS|MS/, completion(data.ms, 3))

    .replace('m', data.m)
    .replace('M', completion(data.m))

    .replace('s', data.s)
    .replace('S', completion(data.s))
}

/**
 * 倒计时类
 */
class countDown {
  // 剩余时间
  time = 0
  // 格式化类型
  formatStr
  onFunc = null
  // 监听时间
  onTime(func) {
    this.onFunc = func
  }
  // 监听倒计时结束
  stopFunc = null
  onStop(func) {
    this.stopFunc = func
  }
  // 定时器
  timer = null
  // 开始倒计时
  start(time, formatStr, isEndTime = false, interval = 1000) {
    if (this.timer) {
      this.stop()
    }
    if (isEndTime) {
      time = (timeStampToDate(time).getTime() - (new Date()).getTime())
    }
    this.formatStr = formatStr
    this.time = time
    this.onFunc && this.onFunc(endTime(this.time, this.formatStr))
    this.timer = setInterval(() => {
      this.time -= interval
      if (this.time <= 0) {
        this.stop()
        this.stopFunc && this.stopFunc()
        return
      }
      this.onFunc && this.onFunc(endTime(this.time, this.formatStr))
    }, interval)
  }

  // 停止执行
  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

/**
 * 时间美化 一般用户聊天界面显示消息发送时间
 * @param {Date|string} date 时间对象或时间戳
 */
const dateBeautiful = (date) => {
  date = timeStampToDate(date)
  const nowDate = new Date(date)
  date = {
    time: date.getTime(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  }
  const now = {
    time: nowDate.getTime(),
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate()
  }

  if (now.time - date.time < 60) {
    return '刚刚'
  } else if (now.time - date.time < 600) {
    return ((now.time - date.time) / 60 | 0) + '分钟前'
  } else if (date.year === now.year && date.month === now.month && date.day === now.day) {
    // 同一天
    return `${date.hour}:${date.minute}`
  } else if (date.year === now.year) {
    return `${date.month}-${date.day}`
  } else {
    return `${date.month}年`
  }
}

/**
 * 定时器类
 */
const Timer = {
  data: {
    timers: []
  },
  timer: null,
  timerOut: [],
  // 监听时间
  onTime(times, callback) {
    const { timers } = this.data
    const now = (new Date()).getTime()
    for (let i = 0, il = times.length; i < il; i++) {
      const item = times[i]
      if (now > item) {
        continue
      }
      let mark = false
      for (let j = 0, jl = timers.length; j < jl; j++) {
        const selfTime = timers[j].time
        const prevTime = j === 0 ? now : timers[j - 1].time
        // 在时间段内
        if (item > prevTime && item < selfTime) {
          timers.splice(j, 0, { time: item, callback: [callback] })
          mark = true
          break
        }
        // 等于当前的时间
        if (item === selfTime) {
          timers[j].callback.push(callback)
          mark = true
          break
        }
      }
      // 大于最后一项
      !mark && timers.push({ time: item, callback: [callback] })
    }
    if (!this.timer) {
      this.startTimer()
    }
  },
  offTime(callback) {
    const { timers } = this.data
    if (!callback) {
      timers.splice(0, timers.length)
      return
    }
    for (let i = timers.length - 1; i > 0; i--) {
      const callbacks = timers[i].callback
      for (let j = callbacks.length - 1; j >= 0; j--) {
        if (callbacks[j] === callback) {
          callbacks.splice(j, 1)
        }
      }
      if (callbacks.length === 0) {
        timers.splice(i, 1)
      }
    }
  },
  startTimer() {
    const { timers } = this.data
    this.clear()
    this.timer = setInterval(() => {
      const now = (new Date).getTime()
      let timeIndex = 0
      for (let i = 0, j = timers.length; i < j; i++) {
        if (timers[i].time > now + 6000) {
          break
        }
        timeIndex++
      }
      timers.splice(0, timeIndex).map(item => item.time - now > 0 && setTimeout(() => item.callback.map(func => func(item.time)), item.time - now))
    }, 5000)
  },
  clear() {
    this.timer && (clearInterval(this.timer), this.timer = null)
  }
}

export {
  dateToStr,
  dateDiff,
  dateAdd,
  isLeapYear,
  strToDate,
  strFormatToDate,
  dateToLong,
  longToDate,
  isDate,
  getMaxDay,
  maxDayOfDate,
  datePart,
  endTime,
  dateBeautiful,
  countDown,
  Timer
}