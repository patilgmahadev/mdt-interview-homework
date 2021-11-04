import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { get } from "lodash";
import { transferApi, payeeApi } from "../../common/Api/Account";

import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

export default function BalTransfer() {
  const [payee, setPayee] = useState([]);
  const [fields, setFields] = useState({
    description: "",
    amount: "",
    date: new Date(),
    recipientAccountNo: "",
  });

  const history = useHistory();

  const loadInitalData = async () => {
    try {
      const payeeData = await payeeApi();
      if (get(payeeData, "data.status", "") === "success") {
        setPayee(get(payeeData, "data.data", []));
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  useEffect(() => {
    loadInitalData();
  }, []);

  const cancel = (event) => {
    event.preventDefault();
    if(window.confirm('Do you want to redirect Dashboard?')) {
      history.push("/dashboard");
    }
  };
  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    // TBD: check token expiry time
    event.preventDefault();
    const resp = await transferApi(fields);
    if (get(resp, "data.status", "") === "success") {
      alert("You have transfered successfully");
      history.push("/dashboard");
    }
  };

  return (
    <Fragment>
      <div className="transferPagetop"> Make a Transfer </div>
      <form className="transferPage" onSubmit={handleSubmit}>
        <select
          className="transferSelect"
          name="recipientAccountNo"
          onChange={handleChange}
          required
        >
          <option className="repText" value="">
            {" "}
            Recepient{" "}
          </option>
          {payee.map((item) => {
            return (
              <option key={item.id} value={item.accountNo}>
                {item.accountHolderName}
              </option>
            );
          })}
        </select>
        <div>
          <DatePicker
            selected={fields.date}
            onChange={(date) =>
              setFields((prev) => ({
                ...prev,
                date,
              }))
            }
          />
        </div>
        <div>
          <input
            type="text"
            required
            placeholder="Description"
            value={fields.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            required
            type="number"
            placeholder="amount"
            name="amount"
            value={fields.amount}
            onChange={handleChange}
          />
        </div>
        <div className="transferPageBtn">
          <div>
            <button className="btnLogout" onClick={cancel}>
              Cancel
            </button>
          </div>
          <div>
            <button className="btnLogout transferSubmit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
