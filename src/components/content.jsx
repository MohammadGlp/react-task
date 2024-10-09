export const Content = ({ products }) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {products.map((item) => (
        <div
          key={item.id}
          className="p-2 shadow-lg rounded-md h-full hover:shadow-lg hover:shadow-amber-400"
        >
          <img
            src={item.thumbnail}
            alt={`picture item ${item.id}`}
            className="w-full h-72 object-contain"
            loading="lazy"
            height={288}
          />
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-semibold font-sans">{item.title}</h1>
            <p>
              {item.description.length > 50
                ? item.description.slice(0, 51) + "..."
                : item.description}
            </p>
            <span>{item.price}$</span>
          </div>
        </div>
      ))}
    </div>
  );
};
