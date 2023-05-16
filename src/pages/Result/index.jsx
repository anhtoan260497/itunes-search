import React, { useMemo } from "react";
import SearchItem from "../../components/SearchItem";
import "./styles.scss";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import NoResult from "../../components/NoResult";


function Result() {
  const result = useSelector((state) => state.searchResult.result);
  const isSearch = useSelector((state) => state.searchResult.isSearch);
  const isLoading = useSelector((state) => state.searchResult.isLoading);

  const renderSearchItem = useMemo(() => {
    if (result.length > 0) {
      return result.map((item, idx) => (
        <SearchItem
          key={idx}
          index = {idx}
          poster={item.artworkUrl100}
          price={item.trackPrice}
          name={item.trackName}
          artist={item.artistName}
          album={item.collectionName}
          preview={item.previewUrl}
        />
      ));
    }

    if (result.length === 0 && isSearch) return <NoResult />;
  }, [isSearch, result]);

  return (
    <div className="result-container flex gap-2">
      {!isLoading ? renderSearchItem : <Loading />}
    </div>
  );
}

export default Result;
