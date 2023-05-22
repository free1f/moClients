import { useState, useEffect } from "react";
import {
  initialClients,
  ACTIVE,
  compareByName,
  compareRevereByName,
  statuses,
} from "../../utils";
import { TableForm } from "../../components";
import { useGlobalContext } from "../../contexts/MainContext";
import { useDebounce } from "../../hooks/useDebounce";
import Select from "../Select";
import styles from "./styles.module.scss";

const Table = () => {
  const [list, setList] = useState(initialClients);
  const [status, setStatus] = useState(ACTIVE);
  const [orderByAsc, setOrderByAsc] = useState(false);
  const [email, setEmail] = useState<string>("");
  const { globalState, dispatchGlobal } = useGlobalContext();
  const inputHandler = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    (e) => setEmail(e.target.value),
    1000
  );

  useEffect(() => {
    setList(globalState.list);
  }, [globalState.list]);

  useEffect(() => {
    const listFiltered = globalState.list.filter((element) =>
      element.email.includes(email)
    );
    setList(listFiltered);
  }, [email]);

  const sortByName = () => {
    const copyList = [...list];
    const orderedList = orderByAsc
      ? copyList.sort(compareRevereByName)
      : copyList.sort(compareByName);
    setList(orderedList);
    setOrderByAsc(!orderByAsc);
    dispatchGlobal({
      type: "UPDATE_CLIENT",
      payload: {
        newList: orderedList,
      },
    });
  };

  const updateOption = (value: string) => {
    const isValidOption = statuses.includes(value);
    if (isValidOption) {
      const listFiltered = globalState.list.filter((el) => el.status === value);
      setStatus(value);
      return setList(listFiltered);
    }
    return setList(globalState.list);
  };

  const editClient = (index: number) => {
    dispatchGlobal({
      type: "EDIT_ROW",
      payload: {
        editRow: index,
      },
    });
  };

  const removeClient = (index: number) => {
    let clients = [...globalState.list];
    clients.splice(index, 1);
    dispatchGlobal({
      type: "UPDATE_CLIENT",
      payload: {
        newList: clients,
      },
    });
  };

  return (
    <section className="tableContainer">
      <section className="headerContainer">
        <div style={{ display: "flex" }}>
          <div className="header">Name</div>
          <div className="header">Date of birth</div>
          <div className="header">Email</div>
          <div className="header">Status</div>
          <div className="header">Actions</div>
        </div>
        <div className="filterContainer">
          <div className="orderByName">
            <button onClick={() => sortByName()}>↑↓</button>
          </div>
          <div className="searchByEmail">
            <input
              type="text"
              placeholder="Search by email..."
              onChange={inputHandler}
            />
          </div>
          <div className="filterByStatus">
            <Select updateOption={updateOption} />
          </div>
        </div>
      </section>
      <section className="listContainer">
        {list.length ? (
          list.map((client, index) => {
            return globalState.editRow != index ? (
              <div
                key={`${client.name}-${index}`}
                className="inputFormContainer"
              >
                <div className="body">{client.name}</div>
                <div className="body">{client.date}</div>
                <div className="body">{client.email}</div>
                <div className="body">{client.status}</div>
                <div className="body">
                  <button
                    className="buttonAction"
                    onClick={() => editClient(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="buttonAction"
                    onClick={() => removeClient(index)}
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <TableForm
                key={`${client.name}-${index}`}
                initName={client.name}
                initDate={client.date}
                initEmail={client.email}
                initStatus={client.status}
                edit={true}
                index={index}
              />
            );
          })
        ) : (
          <div className="noResults">
            <div>Nothing to see here...</div>
          </div>
        )}
        {globalState.activateForm && <TableForm />}
      </section>
    </section>
  );
};

export default Table;
