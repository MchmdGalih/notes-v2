export default function NoteFoundPage() {
  return (
    <section className="flex flex-col items-center  justify-center mt-40">
      <div className="flex flex-col items-center ">
        <div className="text-center">
          <h3 className="relative font-rubic text-[16px] font-bold uppercase text-[#262626] m-0 tracking-[3px] pl-[6px]">
            Opps! Page Not Found
          </h3>
          <h1 className="text-center font-rubic text-[120px] font-bold uppercase text-[#262626]">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <h3 className="font-rubic text-[12px] font-bold uppercase text-[#262626] m-0 tracking-[3px] pl-[6px]">
            we are sorry, but the page you requested was not found
          </h3>
        </div>
      </div>
    </section>
  );
}
