import useInput from '@/hooks/useInput'
import { modalMusicSearchData } from '@/shared/search/api'
import { MusicInfoType } from '@/types/types'
import Image from 'next/image'
import React, { FormEvent, useRef, useState } from 'react'

const MusicSearchModal = ({
  setIsModal,
}: {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [musicList, setMusicList] = useState<MusicInfoType[]>([])
  const { form: keywordInput, onChange } = useInput({
    keyword: '',
  })
  const { keyword } = keywordInput
  const keywordRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!keyword) {
      alert('검색 키워드를 입력해 주세요')
      return keywordRef.current?.focus()
    }

    const getMusicData = async (keyword: string) => {
      const data = await modalMusicSearchData(keyword)

      if (data && data?.length > 0) {
        setMusicList(data)
      } else {
        alert('검색 결과가 없습니다')
      }
    }
    getMusicData(keyword)
  }

  const onAddMusicBoardHandler = async (e: FormEvent) => {
    e.preventDefault()
    // store에 정보 저장
    //
  }

  return (
    <div className='fixed w-full h-screen inset-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white h-3/5 w-3/5 flex flex-col items-center rounded-md pb-10'>
        <form onSubmit={onSubmitHandler}>
          <input
            type='text'
            name='keyword'
            value={keyword}
            ref={keywordRef}
            onChange={onChange}
            className='border  border-black'
          />
          <button type='submit' className='m-3'>
            검색
          </button>
          <button onClick={() => setIsModal(false)}>닫기</button>
        </form>
        {musicList.map((item) => {
          return (
            <div key={item.musicId} className='flex flex-col gap-2'>
              <div>
                <Image
                  src={item.thumbnail}
                  alt='Album Thumbnail'
                  width={100}
                  height={100}
                />
                <div>제목 {item.musicTitle}</div>
                <div>가수 {item.artist}</div>
                <div>발매일 {item.release}</div>
                <div className='flex mt-5 gap-3'>
                  <button>선택</button>
                  <button onClick={() => setIsModal(false)}>취소</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MusicSearchModal
