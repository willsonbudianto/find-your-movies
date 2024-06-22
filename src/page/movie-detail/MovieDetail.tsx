import isEmpty from 'lodash'
import { Suspense, useEffect } from 'react'
import { useGetMovieDetailData } from '../../api/query/movie-detail'
import { useGlobalContext } from '../../context/GlobalContext'
import { useMovieDetailContext } from '../../context/MovieDetailContext'
import UtilGetParam from '../../utils/UtilGetParam'

const MovieDetail: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { state: movieDetailContext, handleChangeState: changeSearchContext } =
    useMovieDetailContext()

  const id = UtilGetParam('id')

  const { data: movieDetailData, isFetching: isFetchingMovieDetailData } = useGetMovieDetailData(
    {
      id,
    },
    {
      enabled: true,
    },
  )

  useEffect(() => {
    if (isFetchingMovieDetailData) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingMovieDetailData])

  if (isEmpty(movieDetailData)) {
    return null
  }

  return <Suspense fallback={null}>Ayam</Suspense>
}

export default MovieDetail
