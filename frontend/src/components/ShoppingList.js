import { useState } from "react";
import HandleShopping from "./HandleShopping";
import {
  useFetchShoppingsQuery,
  useAddShoppingMutation,
  useDeleteShoppingMutation,
} from "../store";

function Shoppinglist() {
  const { data, error, isLoading } = useFetchShoppingsQuery();
  const [addShopping] = useAddShoppingMutation();
  const [deleteShopping] = useDeleteShoppingMutation();
  const [errors, setErrors] = useState(false);

  const handleShoppingAdd = (shopping) => {
    addShopping(shopping).then((r) => {
      if (r.data.success === false) {
        setErrors("Déjà dans la liste");
        setTimeout(() => {
          setErrors(false);
        }, 1000);
      }
    });
  };
  const handleShoppingRemove = (shopping) => {
    deleteShopping(shopping);
  };
  const handleClick = (shopping) => {
    deleteShopping(shopping);
  };

  let content;
  if (isLoading) {
    content = <div>Chargement en cours</div>;
  } else if (error) {
    content = <div>Oups.. une erreur s'est produite</div>;
  } else {
    content = data.data.map((shopping) => {
      if (shopping.isDeleted === false) {
        return (
          <div className="list-item" key={shopping._id}>
            <div className="list-item-content">
              <div className="list-item-title">{shopping.text}</div>
            </div>
            <div className="list-item-controls">
              <button
                onClick={() => handleShoppingRemove(shopping)}
                className="delete is-medium"
              >
                X
              </button>
            </div>
          </div>
        );
      } else {
        return false;
      }
    });
  }

  return (
    <div className="tile is-ancestor">
      <div className="tile is-4 is-vertical is-parent">
        <div className="tile is-child box">
          <HandleShopping
            onCreate={handleShoppingAdd}
            onClick={handleClick}
            data={data}
          />
          {errors ? <div className="notification is-warning">{errors}</div> : null}
        </div>
      </div>
      <div className="tile is-parent">
        <div className="tile is-child box">
          <div className="list">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Shoppinglist;
