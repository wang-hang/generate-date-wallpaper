import React, {useState, useRef} from 'react';
import { Button, Upload, Icon, DatePicker, Select } from 'antd'
import { UploadProps, UploadFile, RcFile } from 'antd/lib/upload/interface'
import moment from 'moment'
import html2canvas from 'html2canvas'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import domtoimage from 'dom-to-image'

import DateCard from './components/date-card'
import { getBase64, getImageSize, canvasToImg } from './utils'
import { DIRECTION_MAP, dateCardStyle } from './constants'
import './App.css';


moment.locale('zh-cn')
const { MonthPicker } = DatePicker
const { Option } = Select

interface IState  {
  imgSrc?: string
  file?: UploadFile
  previewWidth?: number
  previewHeight?: number
  selectDate: Date
  direction: string
}

const App: React.FC = () => {
  const initState: IState = {
    imgSrc: '',
    file: undefined,
    previewWidth: 0,
    previewHeight: 0,
    selectDate: new Date(),
    direction: 'rt',
  }
  const [state, setSate] = useState(initState)
  const previewEl = useRef(null)

  const uploadProps: UploadProps = {
    name: 'img',
    action: '/',
    onChange: async ({file}) => {
      const url = await getBase64(file as RcFile)
      const imgRect = await getImageSize(url)
      setSate({...state, imgSrc: url, file,previewWidth: imgRect.width, previewHeight: imgRect.height })
    },
    beforeUpload: () => false,
    showUploadList: false,
  }
  const previewContainerStyle = {
    width: state.previewWidth,
  }

  const handleMonthChange = (date: any) => {
    if(date) {
      setSate({...state, selectDate: date.toDate()})
    }
  }

  const handleButtonClick = () => {
    //@ts-ignore
    const dom = document.querySelector('#preview-container').cloneNode(true)
    const hidenContainer = document.querySelector('.hiden-container')
    const newId = `${+Date.now()}`
    //@ts-ignore
    dom.setAttribute('id', newId)
    //@ts-ignore
    hidenContainer.appendChild(dom)
    const newDom = document.getElementById(newId)
    //@ts-ignore
    newDom.style.transform = `scale(${state.previewWidth / 800})`

    //@ts-ignore
    html2canvas(newDom).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a')
      link.download = 'a.jpeg'
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
      link.href = dataUrl
      link.click()
      //@ts-ignore
      hidenContainer.removeChild(newDom)
    })
    .catch((err: any) => {
      console.log(err)
    })

  }

  const handleSelectChange = (value:string) => {
    setSate({...state, direction: value})
  }

  return (
    <div className="App">
      <div className="operator">
        <Upload {...uploadProps} ><Button><Icon type="upload"/ >选择图片</Button></Upload>
        <MonthPicker onChange={handleMonthChange} locale={locale} defaultValue={moment()} />
        <Select defaultValue={DIRECTION_MAP.rt} onChange={handleSelectChange}>
          {Object.keys(DIRECTION_MAP).map(dir => {
            return (<Option value={dir} key={dir}>{DIRECTION_MAP[dir]}</Option>)
          })}
        </Select>
        <Button type="primary" onClick={handleButtonClick} disabled={!state.imgSrc}>生成</Button>
      </div>
        <div className='preview max_width' id="preview-container" style={previewContainerStyle} ref={previewEl} >
          {state.imgSrc
          && 
          <img src={state.imgSrc} alt="preview" className='preview-img' />}
          <div className="date-card-container" style={dateCardStyle[state.direction]}>
            {
              state.imgSrc
              &&
              <DateCard date={state.selectDate} />
            }          
          </div>
        </div>
        <div className="hiden-container"></div> {/* 用于隐藏d插入的om */}
    </div>
  );
}

export default App;
