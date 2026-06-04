import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/business/Dashboard";
import InventoryManagement from "@/pages/business/InventoryManagement";
import AiMedicine from "@/pages/business/AiMedicine";
import InventoryManagement1 from "@/pages/business/InventoryManagement1";

const AppRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // 可扩展更多业务页面
      {
        index: true,
        path: "inventoryManagement",
        element: <InventoryManagement />,
      },
      {
        index: true,
        path: "inventoryManagement1",
        element: <InventoryManagement1 />,
      },
      { index: true, path: "aiMedicine", element: <AiMedicine /> },
    ],
  },
];

export default AppRoutes;
