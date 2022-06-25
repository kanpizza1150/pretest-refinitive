import React, { ChangeEvent, FC, ReactElement, useEffect, useMemo, useState } from 'react'
import * as Styled from './styled'
import axios from 'axios'
enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
const Q2: FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [status, setStatus] = useState<Status>(Status.IDLE)
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async (): Promise<void> => {
    setStatus(Status.LOADING)
    try {
      const response = await axios.get('https://api.publicapis.org/categories')
      if (response.status === 200) {
        setStatus(Status.SUCCEEDED)
        setData(response.data.categories)
      }
    } catch (e) {
      setStatus(Status.FAILED)
    }
  }

  const filteringData = (key: string) =>
    data.map((item: string) => item.toLowerCase().includes(key.toLowerCase()) && <div key={item}>{item}</div>)

  const filterData = useMemo(() => {
    switch (status) {
      case Status.SUCCEEDED:
        return <>{filteringData(keyword)}</>
      case Status.LOADING:
        return <>Loading...</>
      case Status.FAILED:
        return <>Something went wrong.</>
      default:
        return <>...</>
    }
  }, [keyword, status])

  return (
    <div>
      <input
        value={keyword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setKeyword(e.target.value)
        }}
        placeholder='Search...'
      />
      {filterData}
    </div>
  )
}

export default Q2
