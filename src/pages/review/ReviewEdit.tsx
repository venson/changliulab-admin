import {
  FC,
  Fragment,
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Edit,
  Identifier,
  RaRecord,
  RecordContext,
  SimpleForm,
  TextInput,
  useDataProvider,
  useInput,
  useRecordContext,
  useRedirect,
  useRefresh,
} from "react-admin";
import { get } from "lodash";
import ActivityReviewEdit from "./edit/ActivityReviewEdit";
import MethodologyReviewEdit from "./edit/MethodologyReviewEdit";
import ResearchReviewEdit from "./edit/ResearchReviewEdit";
import CourseReviewEdit from "./edit/CourseReviewEdit";
import {
  ReviewAction,
  ReviewItem,
  ReviewStatus,
  ReviewType,
} from "@/common/types";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export const CourseContext = createContext<any>(undefined);

const ReviewEdit: FC = () => {
  const refresh = useRefresh();
  const [query, setQuery] = useSearchParams();
  const dataProvider = useDataProvider();
  const [reviews, setReviews] = useState<Map<String, ReviewItem>>(new Map());
  const [expand, setExpand] = useState<Set<String>>(new Set());
  const [message, setMessage] = useState("");
  const type = query.get("type") ?? "";
  const optId = query.get("optId") ?? "";
  const optType = query.get("optType") ?? "COURSE";
  const record = useRecordContext();

  const RenderReview = useMemo(() => {
    const edit = () => {
      switch (type) {
        case "ACTIVITY":
          return <ActivityReviewEdit />;
        case "METHODOLOGY":
          return <MethodologyReviewEdit />;
        case "RESEARCH":
          return <ResearchReviewEdit />;
        case "SYLLABUS":
          return <CourseReviewEdit />;
        default:
          return <Fragment />;
      }
    };
    return (
      <CourseContext.Provider
        value={{ reviews, setReviews, expand, setExpand }}
      >
        {edit()}
      </CourseContext.Provider>
    );
  }, [type, reviews, expand]);

  const handReviewAction = (
    reviews: ReviewItem[],
    message: string,
    action: ReviewAction
  ) => {
    const payLoad = {
      reviews: reviews,
      message,
      action,
      from: ReviewStatus.APPLIED,
    };
    console.log("payload ", payLoad);
    dataProvider.create("review", { data: payLoad }).then(() => {
      setReviews(new Map());
      refresh();
      console.log("success");
    });

    // const reviewVo = { id: record.id, action: action };
  };
  const getReviews = (): ReviewItem[] => {
    if (reviews.size === 0) {
      return [{ id: optId, type: optType as ReviewType }];
    }
    return Array.from(reviews.values());
  };

  const RenderButtons = (type: ReviewType) => {
    const navigate = useNavigate();
    const redirect = useRedirect();
    return (
      <div className="pl-72">
        <div className="justify-between flex px-8 pb-8 ">
          <Button
            onClick={() => {
              console.log("recoard", record);
              handReviewAction(getReviews(), message, ReviewAction.PASS);
            }}
            variant="contained"
            color="success"
          >
            Pass
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="error"
          >
            Reject
          </Button>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Return
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Edit
        queryOptions={{ meta: { type: type } }}
        className="h-[calc(100vh-80px)]"
        sx={{
          // height: '95%',
          "& .RaEdit-card": { height: "100%" },
          "& .RaEdit-main": { height: "100%" },
          // marginBottom:'auto'
        }}
      >
        <SimpleForm
          sx={{ height: "100%" }}
          toolbar={RenderButtons(type as ReviewType)}
        >
          {RenderReview}
          {/* <RenderReview /> */}
          <div className="ml-72">
            <TextField
              label="Review Message"
              value={message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(event.target.value)
              }
            />
          </div>
        </SimpleForm>
      </Edit>
    </Fragment>
  );
};

export default ReviewEdit;
