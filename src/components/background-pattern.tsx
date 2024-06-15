export function BackgroundPattern() {
  return (
    <>
      <div class="[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] top-0 left-0 fixed -z-10 w-screen h-screen" />
      <div
        class="absolute inset-y-0 right-1/2 -z-20 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      ></div>
    </>
  );
}
