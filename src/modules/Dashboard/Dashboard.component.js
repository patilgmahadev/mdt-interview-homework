import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { get, capitalize } from "lodash";

import { balancesApi, transactionsApi } from "../../common/Api/Account";

import "../../App.css";

export default function Dashboard() {
  const [accBalance, setAccBalanace] = useState("");
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();

  const handleTransfer = (event) => {
    event.preventDefault();
    history.push("/transfer");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };

  const loadInitalData = async () => {
    try {
      const accBalanceData = await balancesApi();
      if (get(accBalanceData, "data.status", "") === "success") {
        setAccBalanace(get(accBalanceData, "data.balance", 0));
      }

      const transactionData = await transactionsApi();
      if (get(transactionData, "data.status", "") === "success") {
        setTransactions(get(transactionData, "data.data", []));
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  useEffect(() => {
    // TDB validate token expiry time then only allow to process
    loadInitalData();
  }, []);

  return (
    <Fragment>
      <div className="btnLogoutDiv">
        <button className="btnLogout" data-testid="dashboard-logoutbtn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="displayBalance">
        <p>You have </p>
        <p className="accountBal" data-testid="dashboard-balance">SGD {accBalance}</p> <p>in your account </p>
      </div>
      <hr className="line" />
      <div className="transactionTable">
        <div>
          <h2>Your Activity</h2>
        </div>
        <table>
          <tbody>
            {transactions.map((item) => {
              const toFrom =
                get(item, "type", "") === "transfer" ? "to" : "from";

              return (
                <tr key={get(item, "id", "")}>
                  <td className="transactionDate">
                    {moment(get(item, "date", "")).format("DD MMM")}
                  </td>
                  <td className="tdDetails">
                    {capitalize(get(item, "type", ""))} {toFrom}{" "}
                    {get(item, `${toFrom}.accountHolderName`, "")}
                  </td>
                  <td className={get(item, "type", "")}>
                    {get(item, "type", "") === "transfer" ? "-" : ""}
                    {get(item, "amount", 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btnTransfer" onClick={handleTransfer}>
          Make a transfer
        </button>
      </div>
    </Fragment>
  );
}
