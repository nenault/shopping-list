import "bulma/css/bulma.css";
import "bulma-list/css/bulma-list.css";
import ShoppingList from "./components/ShoppingList.js";

export default function App() {
  return (
    <div className="container is-max-desktop">
      <h1 className="title is-4 mb-4 mt-6">Shopping list</h1>
      <ShoppingList />
    </div>
  );
}
