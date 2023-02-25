import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransactions,
  updateTransactions,
} from "../Features/transaction/TransactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, error, editing } = useSelector(
    (state) => state.transaction
  );


  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTransactions({
        id: editing?.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    resetForm();
    setEditMode(false)
  };
  const resetForm = () => {
    setAmount("");
    setName("");
    setType("");
  };
  const cancelEditMode = () => {
    setEditMode(false);
    resetForm();
  };
  useEffect(() => {
    const { id, type, name, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setAmount(amount);
      setName(name);
      setType(type);
    } else {
      resetForm();
      setEditMode(false);
    }
  }, [editing]);
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="transaction_name"
            placeholder="enter title"
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              onChange={(e) => setType("expense")}
              checked={type === "expense"}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="enter amount"
            type="number"
            name="transaction_amount"
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
      {!isLoading && isError && <p className="error">{error}</p>}
      {editMode && (
        <button onClick={() => cancelEditMode()} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
