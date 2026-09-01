import React from "react";

const DiscoverSkeleton = () => {
  return (
    <div className="w-full flex gap-x-9 items-center overflow-hidden">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="relative min-w-11/12 sm:min-w-5/12 lg:min-w-1/4 h-90 sm:h-97.5 rounded-xl bg-gray-200 animate-pulse overflow-hidden flex flex-col justify-between p-4"
        >
          {/* Top placeholder badge */}
          <div className="flex justify-between items-center w-full">
            <div className="h-6 w-20 bg-gray-300/80 rounded-md"></div>
            <div className="h-6 w-16 bg-gray-300/80 rounded-md"></div>
          </div>

          {/* Bottom detail placeholder matching card structure */}
          <div className="w-full flex flex-col gap-2.5 rounded-xl bg-white/80 backdrop-blur-xs p-4 shadow-sm">
            <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded-md"></div>
            <div className="h-3.5 w-4/5 bg-gray-200 rounded-md"></div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-3.5 w-3.5 bg-gray-300 rounded-full"></div>
              <div className="h-3.5 w-2/3 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscoverSkeleton;
