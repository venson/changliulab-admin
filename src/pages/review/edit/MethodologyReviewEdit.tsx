import AvatarR from "@/components/Avatar";
import HtmlField from "@/components/HtmlField";
import { Avatar, Button } from "@mui/material";
import { Fragment, useState } from "react";
import { RaRecord, useInput } from "react-admin";

interface MethodologyReviewRecord extends RaRecord {
  reviewed?: MethodologyView;
  applied?: MethodologyView;
  // html: string;
  // title: string;
  // date: Date;
}
interface Avatar{
  name:string;
  avatar: string;
  id: string;
}
interface MethodologyView {
  html: string;
  title: string;
  isPublic: boolean;
}
const MethodologyReviewEdit = () => {
  const [showReviewed, setShowReviewed] = useState(true);
  const {field:applied}  = useInput({source: 'applied'})
  const {field:reviewed} = useInput({source: 'reviewed'})
  const appliedClass = showReviewed ? 'w-1/2' : 'w-full'
  const buttonText = showReviewed ? 'hide ' : 'compare';

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
              <div className="flex justify-between">
                <h2>{applied.value.title}
                </h2>
              </div>
              <HtmlField base64={applied.value.html} />
            </div>

          </div>

            {showReviewed &&
          <div className="w-1/2">
            <p className="text-right">History</p>
              <div className="flex justify-between">
                <h2>{reviewed.value.title}
                </h2>
              </div>
              <h1>{reviewed.value.title}</h1>
              <HtmlField base64={reviewed.value.html} />
          </div>
}
        </div>

      </div>
    </Fragment>
  );
};
export default MethodologyReviewEdit;
