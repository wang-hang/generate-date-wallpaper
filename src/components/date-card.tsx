import React, {useState, useEffect} from 'react'

import DateItem from './date-item'
import { fillDateList } from '../utils'
import { WEEKS_MAP } from '../constants'

interface IProps{
  date: Date
}

type dateListType = Array<Date|null>

const DateCard = (props: IProps) => {

  const renderDateList = (dateList: dateListType) => {
    return dateList.map((date, index) => {
      if(date === null) {
        return (<div className="date-item empty" key={index}></div> )
      }else{
        return <DateItem date={date} className='date-item' key={date.toString()} />
      }
    })
  }

  return (
    <div className="date-card">
      <div className="date-card-header">
        {
          WEEKS_MAP.map((it, index) => {
            let cls = ['date-card-header-item']
            if(index === 0 || index === 6){ // 周六日
              cls.push('is-holiday')
            }
            return (<div className={cls.join(' ')} key={it}>{it}</div>)
          })
        }
      </div>
      <div className="date-card-body">
        {renderDateList(fillDateList(props.date))}
      </div>
    </div>
  )
}

export default DateCard