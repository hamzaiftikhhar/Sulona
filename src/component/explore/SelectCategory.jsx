// component/explore/SelectCategory.jsx
import "./SelectCategory.css";

function SelectCategory({ checkBoxState, handleCheckBox }) {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="electronics"
            checked={checkBoxState.electronics}
            onChange={handleCheckBox}
          />
          Electronics
        </label>
        <label>
          <input
            type="checkbox"
            name="clothing"
            checked={checkBoxState.clothing}
            onChange={handleCheckBox}
          />
          Clothing
        </label>
        <label>
          <input
            type="checkbox"
            name="books"
            checked={checkBoxState.books}
            onChange={handleCheckBox}
          />
          Books
        </label>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
}

export default SelectCategory;