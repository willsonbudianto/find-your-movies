import Main from '../components/layout/Main'
import { SearchProvider } from '../context/SearchContext'
import SearchResultPage from './search/SearchResult'

const SearchResultIndex = (): JSX.Element => {
  return (
    <SearchProvider>
      <Main>
        <SearchResultPage />
      </Main>
    </SearchProvider>
  )
}

export default SearchResultIndex
