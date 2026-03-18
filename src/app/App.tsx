import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./components/ecommerce/CartContext";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}