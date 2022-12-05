import { TEXTS } from "../../assets/TEXTS";
import Styles from "./inputGift.module.css";

import { AiOutlineCheck } from "react-icons/ai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../features/gifts/giftsSlice";
import { setGifts } from "../../services/gifts";

export default function InputGift() {
  const inputData = useRef();
  const dispatch = useDispatch();
  const gifts = useSelector((state) => state.gifts);

  const handlesubmit = async (event) => {
    event.preventDefault();
    const newGift = {
      id: "aaa" + inputData.current.value + Date.now(),
      title: inputData.current.value,
      description: "",
    };
    const response = await setGifts([...gifts, newGift]);
    if (response.status !== 200) {
      return console.error(response);
    }
    dispatch(add(newGift));
    inputData.current.value = "";
  };

  return (
    <form className={Styles.form} onSubmit={handlesubmit}>
      <input
        ref={inputData}
        type="text"
        placeholder={TEXTS.inputGift.placeholder}
      />
      <button>
        <AiOutlineCheck />
        {TEXTS.inputGift.button}
      </button>
    </form>
  );
}
