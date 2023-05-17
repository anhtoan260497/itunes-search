import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Result from "./pages/Result";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, setAmount, setIsExplicit, setIsSearch, setKeyword, setPlayId } from "./features/SearchSlice";
import Loading from "./components/Loading";
import Filter from "./components/Filter";

function App() {

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.searchResult.isLoading)
  const keyword = useSelector(state => state.searchResult.keyword)
  const isExplicit = useSelector(state => state.searchResult.isExplicit)
  const amount = useSelector(state => state.searchResult.amount)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(!location.search) return
    const search = location.search.slice(1,location.search.length)
    const searchArr = search.split('&')
    const termKeyword = (searchArr.filter(item => item.includes('term')))
    const noExplicit = (searchArr.filter(item => item.includes('explicit')))
    const amountArr = (searchArr.filter(item => item.includes('limit')))
    const keyword =  termKeyword?.[0]?.slice(termKeyword[0].indexOf('=')+1,termKeyword[0].length) // get keyword from query
    const amount = amountArr?.[0]?.slice(amountArr[0].indexOf('=')+1,amountArr[0].length)
    if(noExplicit.length > 0 ) dispatch(setIsExplicit(true))
    dispatch(setKeyword(keyword.replace(/%20/g, " "))) 
    dispatch(setAmount(amount || 15))
    dispatch(getSearchResult(keyword))
    dispatch(setIsSearch(true)) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleTypingKeyword = (e) => {
   dispatch(setKeyword(e.target.value)) 
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(getSearchResult(keyword))
    dispatch(setPlayId(''))
    navigate(`/search?term=${keyword}${!isExplicit ? '&explicit=no' : ''}&limit=${amount}`)
  }

  return (
    <div className="App">
      <div className="header-container flex justify-center items-center gap-3">
        <img className="header-logo" src="/images/itunes.png" alt="" />
        <h1>iTunes Search</h1>
      </div>
      <hr />
      <div className="input-search-container-fluid mt-4 flex justify-center">
        <form className="input-search-container" onSubmit={e => handleSubmitForm(e)}>
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
          <input
            className="input-search flex items-center pl-7 rounded-md"
            placeholder="Search"
            value={keyword || ''}
            onChange={e =>  handleTypingKeyword(e)}
          />
         {(keyword && !isLoading) ? <button type="submit">
            <FontAwesomeIcon
              className="submit-icon cursor-pointer"
              icon={faArrowRight}
            />
          </button> : (keyword && isLoading) ? <Loading /> : '' }
        </form>
      </div>
      <Filter />

      <Routes>
        <Route path="/search" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
