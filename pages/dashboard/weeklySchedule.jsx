import FeedSchedule from "../../components/Feed/FeedSchedule"

function news() {
  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Weekly Schedule</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <div className="items-center w-full border-collapse bg-white">
              <FeedSchedule />
              <FeedSchedule />
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

export default news;
