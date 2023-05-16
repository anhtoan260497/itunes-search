import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPlayId } from "../../features/SearchSlice";

SearchItem.propTypes = {
  poster: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  price: PropTypes.number,
  preview: PropTypes.string,
  index: PropTypes.number,
};

function SearchItem({ poster, name, artist, album, preview, index }) {

  const dispatch = useDispatch()
  

  const playId = useSelector((state) => state.searchResult.playId);

  const play = () => {
    if(playId){
      const audioTemp = document.getElementById(playId);
      dispatch(setPlayId(''))
      audioTemp.pause();
    }
    const audio = document.getElementById(`id-${name}-${index}`);
    dispatch(setPlayId(`id-${name}-${index}`))
    audio.play();
  };

  const pause = () => {
    const audio = document.getElementById(`id-${name}-${index}`);
    dispatch(setPlayId(''))
    audio.pause();
  }

  return (
    <div className="search-item-container rounded-md flex items-center">
      <img src={poster} alt={name} />
      <div className="search-item-info flex flex-col gap-2">
        <h3 className="search-item-track">{name}</h3>
        <p className="search-item-artist">{artist}</p>
        <p className="search-item-album">
          Album · <span>{album}</span>
        </p>
      </div>

      {playId !== `id-${name}-${index}` ? (
        <div className="play-pause-button">
          <button onClick={play}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <audio
            id={`id-${name}-${index}`}
            src={preview}
            type="audio/m4a"></audio>
        </div>
      ) : (
        <div className="play-pause-button">
          <button onClick={pause}>
            <FontAwesomeIcon icon={faPause} />
          </button>
          <audio
            id={`id-${name}-${index}`}
            src={preview}
            type="audio/m4a"></audio>
        </div>
      )}
    </div>
  );
}

export default SearchItem;
