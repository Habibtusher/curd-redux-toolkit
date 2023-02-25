import editImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransactions,
} from "../../Features/transaction/TransactionSlice";
import numberWithCommas from "../../utils/thousandSeparator";
export default function Transaction({ transaction }) {
  const { name, type, amount, id } = transaction;

  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(editActive(transaction));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)  }</p>
        <button onClick={handleEdit} className="link">
          <img alt="" className="icon" src={editImage} />
        </button>
        <button
          onClick={() => dispatch(removeTransactions(id))}
          className="link"
        >
          <img alt="" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
