import { lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import queryClient from './api/client'
import './app.scss'
import { GlobalProvider } from './context/GlobalContext'

const MovieListIndex = lazy(() => import('./page/MovieListIndex'))
const MovieDetailIndex = lazy(() => import('./page/MovieDetailIndex'))
const SearchResultIndex = lazy(() => import('./page/SearchResultIndex'))
const ErrorNotFound = lazy(() => import('./components/error/ErrorNotFound'))

const App: React.FC = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route element={<MovieListIndex />} path='/' />
            <Route element={<MovieDetailIndex />} path='/detail' />
            <Route element={<SearchResultIndex />} path='/search' />
            <Route element={<ErrorNotFound />} path='/*' />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
