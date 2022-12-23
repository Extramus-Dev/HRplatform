import { Circle } from "@mui/icons-material";
import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
} from "@mui/icons-material";
import { ApplicantDocumentList } from "../../components/ApplicantDocumentList";
import { DocumentList } from "../../components/DocumentList";

export default function Documents() {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Title Container */}
      <div className="flex flex-col gap-4 justify-between rounded-t px-4 mb-4 pb-6 border-b-2 border-gray-400">
        <div className="font-semibold text-2xl">
          <h3>Applicant Documents</h3>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Circle className="text-xs text-green-500" />
              The documents have been received electronically and are correct
            </div>
            <div className="flex gap-2 items-center">
              <Circle className="text-xs text-red-500" />
              The documents has been reviewed but it is incorrect
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Circle className="text-xs text-blue-500" />
              The documents need to be reviewed
            </div>
            <div className="flex gap-2 items-center">
              <Circle className="text-xs text-gray-400" />
              The documents has not submitted yet
            </div>
          </div>
        </div>
      </div>
      <ApplicantDocumentList />
    </div>
  );
}