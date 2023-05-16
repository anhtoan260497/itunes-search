import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAmount, setIsExplicit, setPrice } from "../../features/SearchSlice";
function Filter() {
  const dispatch = useDispatch();
  const isExplicit = useSelector((state) => state.searchResult.isExplicit);
  const price = useSelector((state) => state.searchResult.price);
  const amount = useSelector((state) => state.searchResult.amount);

  const handleChangeExplicit = (value) => {
    dispatch(setIsExplicit(value));
  };

  const handleChangeAmount = (e) => {
    dispatch(setAmount(parseInt(e.target.value)));
  };

  const handleChangePrice = (e) => {
    dispatch(setPrice(parseInt(e.target.value)));
  };

  return (
    <div className="filter-container flex items-center justify-center">
      <div className="explicit-container flex">
        <p>Get explicit version ?</p>
        <label>
          <input
            type="radio"
            name="explicit"
            value={true}
            checked={isExplicit}
            onChange={() => handleChangeExplicit(true)}
          />
          ✅
        </label>
        <label>
          <input
            type="radio"
            name="explicit"
            value={false}
            checked={!isExplicit}
            onChange={() => handleChangeExplicit(false)}
          />
          ❌
        </label>
      </div>

      <div className="clear"></div>

      <div className="amount flex">
        <p>Number of results: </p>
        <input
          className=""
          type="number"
          placeholder={amount}
          onChange={(e) => handleChangeAmount(e)}
        />
      </div>

      <div className="clear"></div>

      <div className="amount flex">
        <p>Max price: </p>
        <input
          className=""
          type="number"
          placeholder="0"
          value={price}
          onChange={(e) => handleChangePrice(e)}
        /> $
      </div>
    </div>
  );
}

export default Filter;
