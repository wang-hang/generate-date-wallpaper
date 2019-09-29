import React from 'react'

interface Props {
  date: Date,
  className: string,
}

function DateItem(props: Props){
  const { date, className} = props
  return (
    <div className={className}>{date.getDate()}</div>
  )
}

export default DateItem