import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchHistory } from "../../redux/slices/userSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import VideoThumbnailCard from "../../components/Video/VideoThumbnailCard";

const WatchHistoryPage = () => {
  const dispatch = useDispatch();
  const { watchHistory, isLoading, errorMessage } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(fetchWatchHistory());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (errorMessage)
    return <p className="p-6 text-center text-red-500">{errorMessage}</p>;

  return (
    <section className="p-6 text-text-primary">
      <h1 className="mb-6 text-2xl font-semibold">Watch history</h1>
      {watchHistory.length === 0 ? (
        <p className="py-12 text-center text-text-muted">
          Your watch history is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {watchHistory.map((video) => (
            <VideoThumbnailCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WatchHistoryPage;
