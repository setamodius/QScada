const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Savronik Scada",
        component: () => import("pages/Dashboard.vue")
      },
      {
        path: "/mediumvoltage",
        name: "Medium Voltage",
        component: () => import("pages/MediumVoltage.vue")
      },
      {
        path: "/lighting",
        name: "Lighting",
        component: () => import("pages/Lighting.vue")
      },
      {
        path: "/ventilation",
        name: "Ventilation",
        component: () => import("pages/Ventilation.vue")
      },
      {
        path: "/usermanagement",
        name: "User Management",
        component: () => import("pages/UserManagement.vue")
      },
      {
        path: "/projectmanagement",
        name: "Project Management",
        component: () => import("pages/ProjectManagement.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
