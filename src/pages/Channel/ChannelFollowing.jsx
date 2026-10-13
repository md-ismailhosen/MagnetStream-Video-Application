import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannel } from "../../redux/slices/SubscriptionSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ChannelFollowing = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subscribedChannels, isLoading, errorMessage } = useSelector(
    (state) => state.subscription,
  );

  useEffect(() => {
    if (user?._id) dispatch(getSubscribedChannel(user._id));
  }, [dispatch, user?._id]);

  if (isLoading) return <LoadingSpinner />;
  if (errorMessage)
    return <p className="py-8 text-center text-red-500">{errorMessage}</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Subscriptions</h2>
      {subscribedChannels.length === 0 ? (
        <p className="py-8 text-center text-text-muted">
          No subscriptions yet.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {subscribedChannels.map(({ _id, channelDetails }) => (
            <li key={_id} className="flex items-center gap-4 py-4">
              <img
                src={channelDetails?.avatar || "/default-avatar.png"}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{channelDetails?.fullName}</p>
                <p className="text-sm text-text-muted">
                  @{channelDetails?.userName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ChannelFollowing;
