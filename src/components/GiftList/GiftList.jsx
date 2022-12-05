import { useDispatch, useSelector } from "react-redux";
import { GoGift } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { BiSad } from "react-icons/bi";
import Styles from "./giftsList.module.css";
import { TEXTS } from "../../assets/TEXTS";
import { deleteGift } from "../../services/gifts";
import { remove } from "../../features/gifts/giftsSlice";

export default function GiftList() {
  const gifts = useSelector((state) => state.gifts);
  const dispatch = useDispatch();

  const handleDelete = async (gift_id) => {
    const gift_to_delete = gifts.find((gf) => gf.id === gift_id);

    if (gift_to_delete) {
      const response = await deleteGift(gifts, gift_to_delete);
      if (response.status !== 200) {
        return console.error(response);
      }
      dispatch(remove(gift_id));
    } else {
      location.reload();
    }
  };

  return (
    <section className={Styles["list-section"]}>
      {gifts.length ? (
        <h3>{TEXTS.giftList.subtitle}</h3>
      ) : (
        <h3 className={Styles["no-gifts"]}>
          {TEXTS.giftList.noGifts}
          <BiSad />
        </h3>
      )}
      <ul>
        {gifts.length
          ? gifts.map((gf) => (
              <div key={gf.id}>
                <li>
                  <GoGift />
                  {gf.title}
                </li>
                <div className={Styles.deleteGift}>
                  <BsTrash
                    className={Styles.trash}
                    onClick={() => handleDelete(gf.id)}
                  />
                  <span className="">{TEXTS.giftList.deleteIconHover}</span>
                </div>
              </div>
            ))
          : null}
      </ul>
    </section>
  );
}
