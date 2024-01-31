export default function ProfileDetails() {
  function openAcademics() {
    document.getElementById("adademicshover").className =
      "flex justify-center items-center";
    document.getElementById("other").className = "hidden";
  }
  return (
    <>
      <div>
        <div
          id="other"
          className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0"
        >
          <div className="w-full">
            <label
              className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="lastName"
            >
              Academics
            </label>
            <div className="flex justify-center items-center">
              <input
                readOnly
                style={{ backgroundColor: "rgb(59,59,59)" }}
                className=" bg-inputbox flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                id="DOB"
              />{" "}
              <img
                onClick={openAcademics}
                src="../public/plus-button.png"
                className="w-[40px] hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Experiences
            </label>
            <div className="flex justify-center items-center">
              <input
                readOnly
                style={{ backgroundColor: "rgb(59,59,59)" }}
                className=" bg-inputbox flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />{" "}
              <img
                src="../public/plus-button.png"
                className="w-[40px] hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="lastName"
            >
              Courses
            </label>
            <div className="flex justify-center items-center">
              <p
                style={{ backgroundColor: "rgb(59,59,59)" }}
                className=" bg-inputbox flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="date"
                placeholder="Enter your DOB"
                id="DOB"
              >
                {" "}
              </p>
              <img
                src="../public/plus-button.png"
                className="w-[40px] hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="firstName"
            >
              Recent Activities
            </label>
            <div className="flex justify-center items-center">
              <p
                style={{ backgroundColor: "rgb(59,59,59)" }}
                className=" bg-inputbox flex h-12 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="date"
                placeholder="Enter your DOB"
                id="DOB"
              >
                {" "}
              </p>
              <img
                src="../public/plus-button.png"
                className="w-[40px] hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
