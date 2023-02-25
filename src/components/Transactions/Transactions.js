import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../Features/transaction/TransactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { isLoading, isError, error, transactions } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();
  let content = null;
  if (isLoading) {
    content = <p>Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p className="error">{error}</p>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p className="error">No Transaction Found</p>;
  }
  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
