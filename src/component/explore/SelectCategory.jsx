// component/explore/SelectCategory.jsx
import "./SelectCategory.css";

function SelectCategory({ checkBoxState, handleCheckBox }) {
  const categories = [
    { name: "male", label: "male" },
    { name: "female", label: "Female" },
    { name: "kids", label: "kids" }
  ];

  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="checkbox-group">
        {categories.map(category => (
          <label key={category.name}>
            <input
              type="checkbox"
              name={category.name}
              checked={checkBoxState[category.name]}
              onChange={handleCheckBox}
            />
            {category.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;