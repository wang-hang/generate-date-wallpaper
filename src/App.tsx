import React, {useState} from 'react';
import { Button, Upload, Icon, DatePicker } from 'antd'
import { UploadProps, UploadFile, RcFile } from 'antd/lib/upload/interface'
import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

import DateCard from './components/date-card'
import { getBase64, getImageSize } from './utils'
import './App.css';


moment.locale('zh-cn')
const { MonthPicker } = DatePicker

interface IState  {
  imgSrc?: string
  file?: UploadFile
  previewWidth?: number
  previewHeight?: number
  selectDate: Date
}

const App: React.FC = () => {
  const initState: IState = {
    imgSrc: '',
    file: undefined,
    previewWidth: 0,
    previewHeight: 0,
    selectDate: new Date(),
  }
  const [state, setSate] = useState(initState)

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

  return (
    <div className="App">
      <div className="operator">
        <Upload {...uploadProps} ><Button><Icon type="upload"/ >Click To Upload</Button></Upload>
        <MonthPicker onChange={handleMonthChange} locale={locale}  />
        <Button type="primary">生成</Button>
      </div>
      <div className='preview' style={previewContainerStyle} >
        {state.imgSrc
        && 
        <img src={state.imgSrc} alt="preview" className='preview-img' />}
        <div className="date-card-container">
          {
            state.imgSrc
            &&
            <DateCard date={state.selectDate} />
          }          
        </div>
      </div>
    </div>
  );
}

export default App;
