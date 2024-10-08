import MultipleInput from "./input/multi-select";
import InputRange from "./input/input-range";

export const Header = ({
  products,
  preProducts,
  categories,
  loading,
  filterLoading,
  setProducts,
  setFilterValue,
}) => {
  const generateUniqueKey = (id, type) => `${type}-${id}`;

  const handleGetFiltersValue = (id, title) => {
    setFilterValue({
      id,
      path: `/category/${title}`,
      type: "filter",
    });
  };

  const handleRemoveFilterValue = () => {
    setFilterValue({});
  };

  const handleGetMaxAndMinValue = (max, min) => {
    let savePreData = preProducts;
    if (min || max) {
      savePreData = savePreData.filter(
        (item) => item.price >= min && item.price <= max,
      );
    }
    setProducts(savePreData);
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-3xl">Live Filter</h1>
        <span className="text-black/70">{products.length}</span>
      </div>
      <div className="flex gap-2 self-center">
        <InputRange
          initialMin={0}
          initialMax={1000}
          min={0}
          max={1000}
          step={10}
          priceCap={10}
          icon={true}
          text={"Price"}
          onGetMaxAndMinValue={handleGetMaxAndMinValue}
        />

        {!filterLoading && (
          <MultipleInput
            data={categories}
            text={"Category"}
            defaultValue={categories?.[0]?.name}
            icon={true}
            generate={generateUniqueKey}
            onGetValue={handleGetFiltersValue}
            onRemoveValue={handleRemoveFilterValue}
          />
        )}
      </div>
    </div>
  );
};
