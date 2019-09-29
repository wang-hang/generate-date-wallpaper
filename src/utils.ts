type dateListType = Array<Date|null>

/**
 * @param {Number} m 月份
 * @returns {Number} 此月的天数
 */
export const getMonthDays = (m: number):number => {
  const date = new Date()
  date.setMonth(m + 1)// date的实际月份是 m+1月
  date.setDate(0) // 0设置为了上一个月 即m月的最后一天
  const days = date.getDate() // 获取那一天是多少号 从而得出是m月有几天
  return days
}

/**
 * @param {Number} m 月份
 * @description 获取某月的第一天是周几
  */
export const getMonthFirstDay = (m: number): number => {
  const date = new Date()
  date.setMonth(m, 1)
  const day = date.getDay()
  return day
}

 export const getBase64  = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

export const getImageSize = (src: string) => {
  return new Promise<{width: number,height: number }>((resolve) => {
    const img = new Image()
    img.style.cssText = `
        visibility: hidden;
        position: fixed;
        z-index: -9999
      `
    img.src = src
    document.body.appendChild(img)
    img.onload = () => {
      const result = {width: img.width, height: img.height}
      document.body.removeChild(img)
      resolve(result)
    }
    })
}

export const fillDateList = (date: Date): dateListType => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const days = getMonthDays(month) // 本月有多少天
  const firstDay = getMonthFirstDay(month) // 本月第一天是周几 0是周日
  const dateList:dateListType = []

  for(let i = 1; i <= days; i++){
      dateList.push(new Date(year, month, i))
  }
  for(let i = 0;i < firstDay - 1;i++){ // 头部填充不是本月的日期为null
    dateList.unshift(null)
  }
  return dateList
}
