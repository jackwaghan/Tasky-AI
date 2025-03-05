export function GET() {
  return new Response(
    JSON.stringify({
      message: "done",
    })
  );
}
