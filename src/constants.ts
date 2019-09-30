export const WEEKS_MAP = ['日', '一', '二', '三', '四', '五', '六']

type directionMapType = {
  [key: string]: string
}
export const DIRECTION_MAP: directionMapType = {
  'lt': "左上",
  'rt': '右上',
  'lb': '左下',
  'rb': '右下',
}

type dateCardStyleType = {
  [key:string]: object
}
export const dateCardStyle: dateCardStyleType = {
  'lt': {
    top: '40px',
    left: '40px',
  },
  'rt': {
    top: '40px',
    right: '40px',
  },
  'lb': {
    bottom: '40px',
    left: '40px',
  },
  'rb': {
    bottom: '40px',
    right: '40px',
  },
}