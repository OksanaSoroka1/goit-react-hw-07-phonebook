import css from '../../styles/filter.module.css';
import * as actions from '../../store/items/actions';
import { useSelector, useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);
  return (
    <div className={css.container}>
      <p className={css.text}>Find contact by name</p>
      <label>
        <input
          onChange={e => dispatch(actions.changeFilter(e.target.value))}
          type="text"
          name="filter"
          value={filter}
        />
      </label>
    </div>
  );
};

export default Filter;
