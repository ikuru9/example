// nextjs 서버에서 instrumentation 기능을 이용하여 server 를 한번 실행시킨다.
export async function register() {
  // msw 실행
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled" && process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("../mocks/server"); // setupServer 로 정의한 인스턴스

    server.listen({
      onUnhandledRequest: "bypass",
    });
    console.debug(" 🚧 MSW와 함께 실행됩니다.(by server)");
  }
}
