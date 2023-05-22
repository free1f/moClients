import { statuses } from "../../utils";

type InitSelectProps = {
  initStatus?: string;
  updateOption: Function;
};

const Select = ({ initStatus, updateOption }: InitSelectProps) => {
  return (
    <select value={initStatus} onChange={(e) => updateOption(e.target.value)}>
      {initStatus?.length ?? <option>Select</option>}
      {statuses.map((status) => {
        return (
          <option value={status} key={status}>
            {status}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
