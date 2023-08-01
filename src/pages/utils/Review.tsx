import { ReviewAction, ReviewItem, ReviewStatus, ReviewType } from "@/common/types";
import { useDataProvider, useRecordContext } from "react-admin";
import get from 'lodash/get'
import { memo } from "react";
import { Button } from "@mui/material";

interface RenderRequestToolbarProps {
    from?: ReviewStatus;
    type: ReviewType
}
export const RenderRequestToolbar = memo(({from, type}:RenderRequestToolbarProps) => {
  const dataProvider = useDataProvider();
  const record = useRecordContext();
  const id = get(record, "id");
  const isModified = get(record, "isModified");
  const fromStatus = from ?? get(record, "review");
  const message = get(record, "message");
    const payLoad = {
      reviews: [{ id: id ,type: type}],
      message,
      action: ReviewAction.REQUEST,
      from: fromStatus,
    };
  const handleReviewAction = () => {
    dataProvider.create("review", { data: payLoad }).then(() => {
    });
  };

  return <Button onClick={handleReviewAction} disabled={fromStatus === ReviewStatus.APPLIED || !isModified}  sx={{m:2}}>Request</Button>;
});