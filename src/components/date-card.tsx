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
    return dateList.map(date => {
      if(date === null) {
        return (<div className="date-item empty"></div> )
      }else{
        return <DateItem date={date} className='date-item' key={date.toString()} />
      }
    })
  }

  return (
    <div className="date-card">
      <div className="date-card-header">
        {
          WEEKS_MAP.map(it => {
            return (<div className='date-card-header-item' key={it}>{it}</div>)
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