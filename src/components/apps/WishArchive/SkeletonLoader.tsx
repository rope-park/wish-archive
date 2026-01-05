/**
 * Skeleton Loader Component
 * Beautiful loading animation
 */

'use client';

export function TimelineSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {[1, 2, 3].map((monthIdx) => (
        <div key={monthIdx} className="animate-pulse">
          {/* Month Header Skeleton */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="flex-1">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-48 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
          </div>

          {/* Event Cards Skeleton */}
          <div className="ml-12 sm:ml-16 space-y-3 sm:space-y-4">
            {[1, 2, 3].map((cardIdx) => (
              <div
                key={cardIdx}
                className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 p-3 sm:p-4"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 bg-gray-200 rounded-full" />
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
