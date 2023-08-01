import HtmlField from "@/components/HtmlField";
import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { RaRecord, useInput } from "react-admin";

interface ActivityReviewRecord extends RaRecord {
  reviewed?: ActivityView;
  applied?: ActivityView;
  // html: string;
  // title: string;
  // date: Date;
}
interface ActivityView {
  html: string;
  title: string;
  date: Date;
}
interface ActivityReviewEditProps {
  record: ActivityReviewRecord;
}
const ActivityReviewEdit =  ()=> {
  const [showReviewed, setShowReviewed] = useState(true);
  const appliedClass = showReviewed ? 'w-1/2' : 'w-full'
  const buttonText = showReviewed ? 'hide ' : 'compare';
  console.log('activity review')
  const {field:applied}  = useInput({source: 'applied'})
  const {field:reviewed} = useInput({source: 'reviewed'})

  return (
    <Fragment >
      <div className="w-full">
        <div className="">
          <Button variant="contained" onClick={() => setShowReviewed(!showReviewed)}>{buttonText}</Button>
        </div>
        <div className="flex flex-wrap">
          <div className={appliedClass}>
            <p className="text-left">Applied</p>
            <div>
              <h1>{applied.value.title}</h1>
              <HtmlField base64={applied.value.html} />
            </div>

          </div>

            {showReviewed &&
          <div className="w-1/2">
            <p className="text-right">History</p>
              <h1>{reviewed.value.title}</h1>
              <HtmlField base64={reviewed.value.html} />
          </div>
}
        </div>

      </div>
    </Fragment>
  );
};
export default ActivityReviewEdit;
