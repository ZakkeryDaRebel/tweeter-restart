import { Link, useNavigate } from "react-router-dom";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import Post from "./Post";
import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoContexts";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfoActions } from "../userInfo/UserInfoHooks";

interface Props {
  item: Status;
  featureUrl: string;
}

const StatusItem = (props: Props) => {
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useContext(UserInfoContext);
  const { setDisplayedUser } = useUserInfoActions();

  const navigate = useNavigate();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`/feed/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.item.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.item.user.firstName} {props.item.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={`/story/${props.item.user.alias}`}
                onClick={navigateToUser}
              >
                {props.item.user.alias}
              </Link>
            </h2>
            {props.item.formattedDate}
            <br />
            <Post status={props.item} featurePath={props.featureUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
