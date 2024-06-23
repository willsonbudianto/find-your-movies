import isEmpty from 'lodash/isEmpty'
import { Suspense } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CastCard from '../../../components/card/CastCard'
import { useMovieDetailContext } from '../../../context/MovieDetailContext'

const MovieDetailCastSlider: React.FC = (): React.ReactElement | null => {
  const { state: movieDetailContext } = useMovieDetailContext()

  if (isEmpty(movieDetailContext?.cast)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <div className='flex flex-col py-2'>
        <p className='text-2xl text-white font-bold px-3'>Cast</p>
        <div className='flex flex-row'>
          <Swiper
            breakpoints={{
              445: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              660: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 35,
              },
            }}
            className='z-0'
            modules={[Navigation]}
            navigation={true}
            slidesPerView={2}
            spaceBetween={15}
          >
            {movieDetailContext?.cast?.map((cast: any) => {
              const { id, name, original_name, character, profile_path }: any = cast

              return (
                <SwiperSlide className='flex items-center justify-center h-[400px]' key={id}>
                  <CastCard
                    character={character}
                    id={id}
                    name={name}
                    original_name={original_name}
                    profile_path={profile_path}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </Suspense>
  )
}

export default MovieDetailCastSlider
