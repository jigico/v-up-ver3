import { supabase } from '../supabase/supabase'

export const getSearchedMusicData = async (
  keyword: string,
  selectedTabs: string,
) => {
  if (selectedTabs === 'musicInfo') {
    const { data } = await supabase
      .from('musicInfo')
      .select('musicId, musicTitle, artist, thumbnail, release, musicSource')
      .or(`musicTitle.like.%${keyword}%,artist.like.%${keyword}%`)
      .order('musicTitle', { ascending: false })
    return data
  }
}

export const getSearchedCommunityData = async (
  keyword: string,
  selectedTabs: string,
) => {
  if (selectedTabs === 'community') {
    const { data } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail)',
      )
      .like('boardTitle', `%${keyword}%`)
      .order('date', { ascending: false })
    return data
  }
}

export const modalMusicSearchData = async (keyword: string) => {
  const { data } = await supabase
    .from('musicInfo')
    .select('musicId, musicTitle, artist, thumbnail, release, musicSource')
    .or(`musicTitle.like.%${keyword}%,artist.like.%${keyword}%`)
    .order('musicTitle', { ascending: false })
  return data
}
