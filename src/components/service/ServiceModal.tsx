import { PersonalModal } from '@/types/personal/type'
import { OPEN_ANOTHER_SHADOW } from '../login/loginCss'
import commu from '@/../public/images/Property 1=message-chat-circle.svg'
import people from '@/../public/images/Property 1=user-01.svg'
import Image from 'next/image'
import cd from '@/../public/images/cdIcon.svg'
import goOut from '@/../public/images/XIcon.png'

const ServiceModal = ({ isOpen, onClose }: PersonalModal) => {
  if (!isOpen) return null

  const onCloseHandler = () => {
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center '>
      <div className='fixed inset-0 bg-primary-black opacity-70'></div>

      <div
        className={`fixed z-10 h-[500px] w-[400px] space-y-10 rounded-[36px] rounded-xl border-opacity-10 bg-modal-black p-4 ${OPEN_ANOTHER_SHADOW}   `}
      >
        <div className='flex pt-[40px]'>
          <p className=' w-[400px] text-center text-xl font-bold text-white'>
            💡V-UP 이용방법💡
          </p>
          <button onClick={onCloseHandler}>
            <Image src={goOut} alt='나가기' width={22} height={23} />
          </button>
        </div>
        <div
          className='
          h-[330px] overflow-y-scroll'
        >
          <p className='flex gap-2 text-lg font-bold text-white'>
            <Image src={cd} alt='cd 아이콘' width={22} height={23} />
            뮤직 플레이어
          </p>
          <div>
            <ul className=' gap-4 pt-[16px] text-sm font-medium text-white text-opacity-70'>
              <li>
                - LP플레이어
                <span className='font-bold text-white'>
                  &nbsp;하단 좌측 버튼
                </span>
                을 눌러
                <span className='font-bold text-white'>
                  &nbsp;재생목록과 가사
                </span>
                를 볼 수 있습니다.
              </li>
              <li className='pt-1'>
                - LP플레이어
                <span className='font-bold text-white'>
                  &nbsp;하단 우측 버튼
                </span>
                을 눌러 곡을 마이플레이리스트에 담을 수 있습니다.
              </li>
              <li className='pt-1'>
                -
                <span className='font-bold text-white'>
                  &nbsp;재생 컨트롤러 좌,우 버튼
                </span>{' '}
                을 활성화하면
                <span className='font-bold text-white'>
                  &nbsp;반복재생, 셔틀재생을
                </span>
                이용할 수 있습니다. &nbsp; (반복 재생은 한 곡 반복만 가능 )
              </li>
              <li className='pt-1'>
                {' '}
                - 현재
                <span className='font-bold text-white'>
                  &nbsp;재생목록의 음악 제목을 클릭 &nbsp;
                </span>
                시 해당{' '}
                <span className='font-bold text-white'> &nbsp;노래가 재생</span>
                됩니다.
              </li>
              <li className='pt-1'>
                음악 추가는
                <span className='font-bold text-white'>
                  &nbsp;제목순으로 정렬
                </span>
                됩니다.
              </li>
              <li className='pt-1'>
                - 재생목록의 체크버튼은 곡 삭제 및 플리 추가에만 사용됩니다.
              </li>
            </ul>
          </div>
          <p className=' flex gap-2 pt-[32px] text-lg font-bold text-white'>
            <Image src={commu} alt='커뮤니티 아이콘' height={24} width={24} />
            커뮤니티
          </p>
          <div className='pt-[16px] text-sm font-medium text-white text-opacity-70'>
            <ul>
              <li className='pt-1'>
                - <span className='font-bold text-white'>&nbsp;작성자</span>{' '}
                또는 댓글 목록에
                <span className='font-bold text-white'>
                  &nbsp;유저 이미지 클릭 &nbsp;
                </span>
                시 해당
                <span className='font-bold text-white'>
                  &nbsp;유저의 마이페이지로 이동
                </span>
                가능 합니다.
              </li>
              <li className='pt-1'>
                - 게시글 내 음악 정보에
                <span className='font-bold text-white'>&nbsp;음표 버튼</span>
                클릭 시
                <span className='font-bold text-white'>
                  &nbsp; 현재 재생 목록
                </span>
                에 추가,
                <span className='font-bold text-white'>&nbsp; + 버튼</span>
                클릭 시
                <span className='font-bold text-white'>
                  &nbsp; 마이 플레이 리스트
                </span>
                에 추가 됩니다.
              </li>
              <li className='pt-1'>
                - 게시글 등록 시
                <span className='font-bold text-white'>&nbsp; 음악 검색</span>은
                <span className='font-bold text-white'>&nbsp; 영어 대문자</span>{' '}
                또는
                <span className='font-bold text-white'>&nbsp;소문자 하나</span>
                를 넣고 검색해주세요. (ex : V 또는 v)
              </li>
            </ul>
          </div>

          <p className='flex gap-2 pt-[32px] text-lg font-bold text-white'>
            <Image
              src={people}
              alt='마이페이지 아이콘'
              height={24}
              width={24}
            />
            마이페이지
          </p>
          <div>
            <ul className='list-disc pt-[16px] text-sm font-medium text-white text-opacity-70'>
              <li>
                - 마이페이지
                <span className='font-bold text-white'>
                  &nbsp;팔로우 리스트에서 유저를 클릭 시 해당 유저의 프로필로
                  이동
                </span>
                할 수 있습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal
