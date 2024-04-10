import type { MusicPreference, UserChar } from '@/types/main/types'
import { supabase } from '../supabase/supabase'
import { genreMatch } from '@/util/main/util'
import { mbtiMatch, SentenceMatch } from '@/util/personal/util'

//mbti 선호도, 비선호도 조회하는 값
//선호도
export const getPreference = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus) // MBTI를 숫자로 변환
  let { data: musicPreferences, error } = await supabase
    .from('musicPreferences')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', mbtiCode)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//비선호도
export const getDislike = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus) // MBTI를 숫자로 변환
  let { data: musicPreferences, error } = await supabase
    .from('musicDislikes')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', mbtiCode)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//mbti별 선호도 상위 장르 음악
export const recommendMusic = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus) // MBTI를 숫자로 변환
  try {
    let { data, error } = await supabase
      .from('musicPreferences')
      .select('hiphop, dance, ballad, rnb, rock')
      .eq('mbti', mbtiCode)
      .limit(1)
      .single()

    //추천 음악 선별 로직
    const entries = Object.entries(data as MusicPreference)
    //선호도 상위 3개 음악 추천
    entries.sort((a, b) => b[1] - a[1])
    const topArr = entries.slice(0, 3)

    //해당하는 음악 장르 코드 추출
    const genreCodes = topArr.map((item) => genreMatch(item[0]))
    return genreCodes as number[]
  } catch (error) {
    return []
  }
}

export const getRecommendMusic = async (musicPreferenceData) => {
  let { data: musicInfo, error } = await supabase
    .from('musicInfo')
    .select('*')
    .in('genre', musicPreferenceData)
    .limit(3)

  return musicInfo
}
////////////////////////////////////////////
//조회 - 지수님
export const getUserChar = async (
  userId: string,
): Promise<UserChar | undefined> => {
  try {
    let { data, error } = await supabase
      .from('userInfo')
      .select('userChar')
      .eq('userId', userId)
      .limit(1)
      .single()
    if (error) {
      return {} as UserChar
    }
    return data as UserChar | undefined
  } catch (error) {
    return undefined
  }
}

//userInfo에 userChar 넣는 값
export const insertUserChar = async ({
  userId,
  personalUser,
}: {
  userId: string
  personalUser: UserChar
}) => {
  const mbtiCode = mbtiMatch(personalUser.mbti) // MBTI를 숫자로 변환
  const mbtiSentence = SentenceMatch(personalUser.mbti)
  const { data, error } = await supabase
    .from('userInfo')
    .update({
      userChar: {
        ...personalUser,
        mbti: mbtiCode,
        resultSentence: mbtiSentence,
      },
    }) // 숫자로 변환된 MBTI 저장
    .eq('userId', userId)
    .select()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
}

//퍼스널 뮤직에 추가하는 값
export const inssertPersonalMusic = async (personalMusic) => {
  const { userChar, recommend } = personalMusic
  const mbtiSentence = SentenceMatch(userChar.mbti)
  const musicIds = recommend.map((item) => item.musicId)

  // let { data: personalUid } = await supabase
  //   .from('personalMusic')
  //   .select('userId')

  // if (personalUid?.[0].userId.includes(userChar.uid)) {
  //   console.log('존재하는 유저')
  //   return
  // }

  const { data, error } = await supabase
    .from('personalMusic')
    .insert([
      { resultSentence: mbtiSentence, userId: userChar.uid, result: musicIds },
    ])
    .select()
}
