export default function LoginPageSkeleton() {
  return (
    <div className="login__container animate-pulse">
      <section className="flex md:flex-row flex-col rounded-md shadow-sm mt-2">
        <div className="flex-1 h-64 bg-gray-300 rounded-md mb-4 md:mb-0 md:mr-4"></div>

        <section className="flex-1 flex justify-center w-full m-auto">
          <div className="w-full max-w-sm h-64 bg-gray-300 rounded-md"></div>
        </section>
      </section>
    </div>
  );
}
