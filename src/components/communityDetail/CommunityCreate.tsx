'use client'

import React, { FormEvent, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import {
  useCoummunityItem,
  validateFormBlank,
} from '@/query/communityDetail/mutation'
import useInput from '@/hooks/useInput'
import goback from '@/../public/images/goback.svg'
import { ADD_BOARD_STICK, ALLOW_SHADOW } from './communityCss'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import Swal from 'sweetalert2'
import CommunityQuillEditor from './CommunityQuillEditor'
import ReactQuill from 'react-quill'
import CommunityAddMusic from './CommunityAddMusic'

type CommunityForm = {
  boardTitle: string
  content: string
}

const CommunityCreate = () => {
  const quillRef = useRef<ReactQuill>(null)
  const router = useRouter()
  const refTitle = useRef<HTMLInputElement>(null)
  const { chooseMusic, setChooseMusic } = useMusicSearchedStore()
  const { addCommunityMutation } = useCoummunityItem()
  const { data: userSessionInfo, status } = useSession()
  const musicId = chooseMusic?.musicId as string
  const musicTitle = chooseMusic?.musicTitle
  const artist = chooseMusic?.artist
  const thumbnail = chooseMusic?.thumbnail

  const {
    form: communityForm,
    setForm: setCommunityForm,
    onChange: onChangeHandler,
    reset,
  } = useInput<CommunityForm>({
    boardTitle: '',
    content: '',
  })

  const { boardTitle, content } = communityForm

  const onSumitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const { firstBlank: titleBlank, secondBlank: contentBlack } =
      validateFormBlank(boardTitle, content)

    if (!boardTitle || titleBlank === '') {
      await Swal.fire({
        text: '제목을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })

      return
    }

    if (!content || contentBlack === '') {
      await Swal.fire({
        text: '내용을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    if (!chooseMusic) {
      await Swal.fire({
        text: '음악 선택은 필수입니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    if (userSessionInfo && userSessionInfo.user.uid) {
      const { uid } = userSessionInfo.user
      const newData = {
        boardTitle,
        content: content,
        userId: uid,
        musicId,
      }
      addCommunityMutation.mutate(newData)
      await Swal.fire({
        text: '등록이 완료됐습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      reset()
      setChooseMusic(null)
      router.push('/community')
    }
    if (!userSessionInfo) {
      Swal.fire({
        text: '오류로 인해 정보를 저장할 수 없습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }
  }

  if (status === 'unauthenticated') {
    Swal.fire({
      text: '로그인한 유저만 이용 가능합니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
    router.replace('/')
    return null
  }

  useEffect(() => {
    if (refTitle.current !== null && typeof window !== 'undefined') {
      refTitle.current.focus()
    }
  }, [])
  if (typeof window !== 'undefined') {
    return (
      <div>
        {/* {typeof window !== 'undefined' && ( */}
        <div>
          <form onSubmit={onSumitHandler} className='flex flex-col gap-[32px]'>
            <div
              className={`mt-[32px] flex h-[72px] w-[100%] items-center justify-between rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[24px] py-[12px] tracking-[-0.03em] ${ADD_BOARD_STICK}`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  router.replace('/community')
                  setChooseMusic(null)
                }}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
              >
                <Image
                  src={goback}
                  alt='이전으로 아이콘'
                  width={24}
                  height={24}
                />
              </button>
              <div className='mx-[auto] text-center'>
                <h3>글쓰기</h3>
              </div>
              <button
                className={`flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
              >
                <p>등록하기</p>
              </button>
            </div>

            <div>
              <div className='w-full'>
                <input
                  type='text'
                  name='boardTitle'
                  value={boardTitle}
                  ref={refTitle}
                  maxLength={40}
                  onChange={onChangeHandler}
                  className=' mb-4 w-full rounded-lg border-none bg-[rgba(255,255,255,0.1)] p-2 placeholder:text-[#ffffff5a]'
                  placeholder='제목을 입력해 주세요.'
                />
              </div>

              {typeof window !== 'undefined' && (
                <article className='h-[200px]'>
                  <CommunityQuillEditor
                    content={content}
                    setCommunityForm={setCommunityForm}
                  />
                </article>
              )}
            </div>
          </form>
          <div className='mt-[88px]'>
            <CommunityAddMusic
              thumbnail={thumbnail}
              musicTitle={musicTitle}
              artist={artist}
            />
          </div>
        </div>
        {/* )} */}
      </div>
    )
  } else {
    return null
  }
}

export default CommunityCreate
