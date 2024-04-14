import { getRandomMusicData } from '@/shared/main/api'
import Pagination from '@/util/Pagination '
import { modalPaging } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import NoSearchResultItem from './NoSearchResultItem'

const GenreRandomMusic = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryFn: () => getRandomMusicData(),
    queryKey: ['mainGenreMusic'],
  })
  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }

  const { currentItems, nextPage, prevPage, totalPages } = modalPaging(
    data,
    currentPage,
    setCurrentPage,
  )
  return (
    <div>
      <div className='focus-bold h-[28px] text-[20px] leading-[140%]'>
        이런 음악은 어떠신가요? 🎶
      </div>
      <div>
        {currentItems?.map((item: any) => {
          return <NoSearchResultItem key={item.musicId} item={item} />
        })}
      </div>
      <div className='mb-[82px]'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default GenreRandomMusic
