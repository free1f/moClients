import { Title, Table } from "../../components";
import { useGlobalContext } from "../../contexts/MainContext";

const Home = () => {
  const { dispatchGlobal } = useGlobalContext();

  return (
    <>
      <div>
        <Title />
        <section
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "2rem",
          }}
        >
          <button
            style={{ marginRight: "1rem" }}
            onClick={() =>
              dispatchGlobal({
                type: "ACTIVATE_FORM",
                payload: {
                  activateForm: true,
                },
              })
            }
          >
            + Add
          </button>
          <button
            onClick={() =>
              dispatchGlobal({
                type: "DISCARD_CHANGES",
              })
            }
          >
            Discard
          </button>
        </section>
        <Table />
      </div>
    </>
  );
};

export default Home;
