import AvatarR from "@/components/Avatar";
import HtmlField from "@/components/HtmlField";
import { Avatar, Button } from "@mui/material";
import { Fragment, useState } from "react";
import { RaRecord, useInput } from "react-admin";

interface ResearchReviewRecord extends RaRecord {
  reviewed?: ResearchView;
  applied?: ResearchView;
  // html: string;
  // title: string;
  // date: Date;
}
interface Avatar{
  name:string;
  avatar: string;
  id: string;
}
interface ResearchView {
  html: string;
  title: string;
  members: Avatar[]
}
interface ResearchReviewEditProps {
  record: ResearchReviewRecord;
}
const renderAvatar = (members:Avatar[])=>{
  return members.map((member:Avatar)=>{
    return <AvatarR  src={member.avatar} key={member.id} name={member.name} path={`/member/${member.id}`}/>
  })
}
const ActivityReviewEdit = () => {
  const [showReviewed, setShowReviewed] = useState(true);
  const {field:applied}  = useInput({source: 'applied'})
  const {field:reviewed} = useInput({source: 'reviewed'})
  const haveReviewedContent =reviewed.value? true: false;
  const appliedClass = showReviewed && haveReviewedContent ? 'w-1/2' : 'w-full'
  const buttonText = showReviewed ? 'hide ' : 'compare';
  console.log('activity review')

  return (
    <Fragment >
      <div className="w-full">
        <div className="">
          <Button disabled={!haveReviewedContent} variant="contained" onClick={() => setShowReviewed(!showReviewed)}>{buttonText}</Button>
        </div>
        <div className="flex flex-wrap">
          <div className={appliedClass}>
            <p className="text-left">Applied</p>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-center font-bold">{applied.value.title}
                </h2>
                <div className="flex">
                {renderAvatar(applied.value.members || [])}
                </div>
              </div>
              <HtmlField base64={applied.value.html} />
            </div>

          </div>

            {showReviewed && haveReviewedContent &&
          <div className="w-1/2">
            <p className="text-right">History</p>
              <div className="flex justify-between">
                <h2>{reviewed.value.title}
                </h2>
                {renderAvatar(reviewed.value.members || [])}
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
export default ActivityReviewEdit;
