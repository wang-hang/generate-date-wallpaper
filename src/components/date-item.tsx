import React from 'react'
import { isWorkDay } from '../utils'

interface Props {
  date: Date,
  className: string,
}

function DateItem(props: Props){
  const { date, className} = props
  const cls = [className]
  if(!isWorkDay(date)){
    cls.push('is-holiday')
  }
  return (
    <div className={cls.join(' ')}>{date.getDate()}</div>
  )
}

export default DateItem