import { http, HttpResponse } from "msw";

// Mock API handlers
export const handlers = [
  // Example REST API
  http.get("/api/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
      },
    ]);
  }),

  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: "John Doe",
      email: "john@example.com",
    });
  }),

  http.post("/api/users", async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({
      ...newUser,
      id: Date.now(),
    });
  }),
];
