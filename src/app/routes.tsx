import { createBrowserRouter, Outlet } from "react-router";
import { LoginPage } from "./components/LoginPage";
import { DealerLandingPage } from "./components/dealer/DealerLandingPage";
import { PLPPage } from "./pages/PLPPage";
import { PDPPage } from "./pages/PDPPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { OrdersPage } from "./pages/OrdersPage";
import { LoyaltyPage } from "./pages/LoyaltyPage";
import { SchemesPage } from "./pages/SchemesPage";
import { SupportPage } from "./pages/SupportPage";
import { DemoPanel } from "./components/ecommerce/DemoPanel";

function RootLayout() {
  return (
    <>
      <Outlet />
      <DemoPanel />
    </>
  );
}

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: LoginPage },
      { path: "/dealer", Component: DealerLandingPage },
      { path: "/dealer/products", Component: PLPPage },
      { path: "/dealer/products/:id", Component: PDPPage },
      { path: "/dealer/cart", Component: CartPage },
      { path: "/dealer/checkout", Component: CheckoutPage },
      { path: "/dealer/order-confirmation", Component: ThankYouPage },
      { path: "/dealer/orders", Component: OrdersPage },
      { path: "/dealer/loyalty", Component: LoyaltyPage },
      { path: "/dealer/schemes", Component: SchemesPage },
      { path: "/dealer/support", Component: SupportPage },
    ],
  },
]);
