import { useState } from "react";
import { statuses, isValidForm } from "../../utils";
import { useGlobalContext } from "../../contexts/MainContext";
import Select from "../Select";

type InitTableProps = {
  initName?: string;
  initDate?: string;
  initEmail?: string;
  edit?: boolean;
  index?: number;
};

const Table = ({
  initName,
  initDate,
  initEmail,
  edit,
  index,
}: InitTableProps) => {
  const [name, setName] = useState(initName || "");
  const [date, setDate] = useState(initDate || "");
  const [email, setEmail] = useState(initEmail || "");
  const [status, setStatus] = useState(statuses[0]);
  const [error, setError] = useState("");
  const { globalState, dispatchGlobal } = useGlobalContext();

  const saveNewClient = () => {
    const isValid = isValidForm({ name, date, email });
    if (!isValid) return setError("Be sure all fields are properly filled");
    dispatchGlobal({
      type: "ADD_CLIENT",
      payload: {
        user: {
          name,
          date,
          email,
          status,
        },
      },
    });
    hideForm();
    setError("");
  };

  const updateClient = () => {
    const isValid = isValidForm({ name, date, email });
    if (!isValid) return setError("Be sure all fields are properly filled");
    const clientList = [...globalState.list];
    if (typeof index === "number")
      clientList[index] = { name, date, email, status };
    dispatchGlobal({
      type: "UPDATE_CLIENT",
      payload: {
        newList: clientList,
      },
    });
    dispatchGlobal({
      type: "EDIT_ROW",
      payload: {
        editRow: -1,
      },
    });
    hideForm();
    setError("");
  };

  const hideForm = () => {
    dispatchGlobal({
      type: "ACTIVATE_FORM",
      payload: {
        activateForm: false,
      },
    });
  };

  const updateOption = (val: string) => {
    setStatus(val);
  };

  return (
    <>
      <section
        className="inputFormContainer"
        style={{ display: "flex", width: "100%" }}
      >
        <div className="inputForm">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputForm">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="inputForm">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputForm">
          <Select initStatus={status} updateOption={updateOption} />
        </div>
        <div className="inputForm">
          <button onClick={() => (edit ? updateClient() : saveNewClient())}>
            Save
          </button>
        </div>
      </section>
      <section
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        <div style={{ color: "red" }}>{error}</div>
      </section>
    </>
  );
};

export default Table;
