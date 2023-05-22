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
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "20%" }}>Name</div>
          <div style={{ width: "20%" }}>Date of birth</div>
          <div style={{ width: "20%" }}>Email</div>
          <div style={{ width: "20%" }}>Status</div>
          <div style={{ width: "20%" }}>Actions</div>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
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
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        {list.length ? (
          list.map((client, index) => {
            return globalState.editRow != index ? (
              <div
                key={`${client.name}-${index}`}
                style={{ display: "flex", width: "100%" }}
              >
                <div style={{ width: "20%" }}>{client.name}</div>
                <div style={{ width: "20%", wordWrap: "break-word" }}>
                  {client.date}
                </div>
                <div style={{ width: "20%", wordWrap: "break-word" }}>
                  {client.email}
                </div>
                <div style={{ width: "20%" }}>{client.status}</div>
                <div style={{ width: "20%" }}>
                  <button onClick={() => editClient(index)}>Edit</button>
                  <button onClick={() => removeClient(index)}> Remove</button>
                </div>
              </div>
            ) : (
              <TableForm
                key={`${client.name}-${index}`}
                initName={client.name}
                initDate={client.date}
                initEmail={client.email}
                edit={true}
                index={index}
              />
            );
          })
        ) : (
          <div>
            <div>Nothing to see here...</div>
          </div>
        )}
        {globalState.activateForm && <TableForm />}
      </section>
    </section>
  );
};

export default Table;
