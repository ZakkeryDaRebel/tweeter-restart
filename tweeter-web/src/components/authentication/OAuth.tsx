import { useContext } from "react";
import { ToastActionsContext } from "../toaster/ToastContexts";
import { ToastType } from "../toaster/Toast";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OAuth = () => {
  const { displayToast } = useContext(ToastActionsContext);

  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayToast(
      ToastType.Info,
      message,
      3000,
      undefined,
      "text-white bg-primary",
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-link btn-floating mx-1"
        onClick={() =>
          displayInfoMessageWithDarkBackground(
            "LinkedIn registration is not implemented.",
          )
        }
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="linkedInTooltip">LinkedIn</Tooltip>}
        >
          <FontAwesomeIcon icon={["fab", "linkedin"]} />
        </OverlayTrigger>
      </button>
    </>
  );
};
