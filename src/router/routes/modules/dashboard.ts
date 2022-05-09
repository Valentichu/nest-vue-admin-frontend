export default {
  path: "dashboard",
  name: "dashboard",
  component: () => import("@/views/dashboard/index.vue"),
  meta: {
    name: "首页",
    requiresAuth: true,
    icon: "area-chart-outlined",
    order: 0,
  },
  children: [
    {
      path: "workplace",
      name: "Workplace",
      component: () => import("@/views/dashboard/workplace/index.vue"),
      meta: {
        name: "首页",
        requiresAuth: true,
        pemissions: ["*"],
      },
    },
  ],
};
