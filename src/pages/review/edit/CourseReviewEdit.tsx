import { ReviewStatus, ReviewType, Syllabus } from "@/common/types";
import AvatarR from "@/components/Avatar";
import HtmlField from "@/components/HtmlField";
import SyllabusTree from "@/components/SyllabusTree";
import { Avatar, Button } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link, RaRecord, useDataProvider, useInput } from "react-admin";
import { useSearchParams } from "react-router-dom";

interface CourseContentRecord<T extends ReviewAble> extends RaRecord {
  reviewed?: T;
  applied?: T;
}

interface ReviewAble {}

interface CourseSyllabus extends ReviewAble {
  syllabus: Syllabus[];
}
interface CourseContent extends ReviewAble {
  id: string;
  title: string;
  description?: string;
  html?: string;
  videoLink?: string;
  review: ReviewStatus;
  isRemovedAfterReview?: boolean;
}
interface Avatar {
  name: string;
  avatar: string;
  id: string;
}
// interface for ChapterView
const renderAvatar = (members: Avatar[]) => {
  return members.map((member: Avatar) => {
    return (
      <AvatarR
        src={member.avatar}
        key={member.id}
        name={member.name}
        // path={`/member/${member.id}`}
        id = {member.id}
      />
    );
  });
};

const renderContent = (content?: CourseContent, type?: ReviewType) => {
  // console.log('content',content,'type',type)
  if (!content) {
    return <div>No Content</div>;
  }

  switch (type) {
    case ReviewType.CHAPTER: {
      return (
        <Fragment>
          {/* <div>{content.review === ReviewStatus.APPLIED ? 'Applied': 'Latest'}</div> */}
          <div>{content.title}</div>
          <div>{content.description}</div>
        </Fragment>
      );
    }
    case ReviewType.SECTION: {
      // console.log("html", content.html);
      return (
        <Fragment>
          {/* <div>{content.review === ReviewStatus.APPLIED ? 'Applied': 'Latest'}</div> */}
          {/* <div>{content.html}</div> */}
          <HtmlField base64={content.html} />
        </Fragment>
      );
    }
  }
};
// render toc
const CourseReviewEdit = () => {
  const [query, setQuery] = useSearchParams();
  const dataProvider = useDataProvider();
  const [content, setContent] = useState<CourseContentRecord<CourseContent>>({
    id: "",
  });
  const { field: applied } = useInput({ source: "applied" });
  // const { field: reviewed } = useInput({ source: "reviewed" });
  const { field: courseId } = useInput({ source: "id" });
  const optId = query.get("optId") ?? "";
  const optType: ReviewType =
    (query.get("optType") as ReviewType) ?? ReviewType.COURSE;
  // useSearchParam("type", "SYLLABUS");
  const [showReviewed, setShowReviewed] = useState(true);
  // const appliedClass = showReviewed ? "w-1/2" : "w-full";
  const reviewedFlag = showReviewed && content.id === optId && content.reviewed 
  // && content.reviewed.review === ReviewStatus.APPLIED
  const reviewedDisabled =! (content.reviewed && content.id === optId)
  const buttonText = reviewedFlag ? "hide " : "compare";
  // console.log("activity review");
  useEffect(() => {
    const helper = async () => {
      const { data } = await dataProvider.getOne("review", {
        id: optId,
        meta: { type: optType },
      });
      console.log("data", data);
      setContent(data);
      // setIsLoading(false);
      // console.log("role", data);
    };
    helper();
  }, [optId, optType]);
  // console.log(content)
  const chapterContent = useMemo(
    () => renderContent(content.applied, optType),
    [content.applied, optType]
  );
  const sectionContent = useMemo(
    () => renderContent(content.reviewed, optType),
    [content.reviewed, optType]
  );
  const tree = useMemo(
    () => (
      <SyllabusTree
        syllabus={applied.value.syllabus}
        courseId={courseId.value}
        onCheck={() => {}}
        targetId={optId}
        targetType={optType}
        treeType="Review"
      />
    ),
    [applied, courseId, optId, optType]
  );

  return (
      <div className="relative w-full ">
          <div className="fixed h-[calc(100vh-140px)] overflow-auto mb-4">
            {tree}
          </div>
        <header className="fixed top-24 right-10  items-center">
          <Button
            variant="contained"
            disabled={reviewedDisabled}
            onClick={() => setShowReviewed(!showReviewed)}
          >
            {buttonText}
          </Button>
        </header>
        <div className="h-full ml-72">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className={`${reviewedFlag? 'col-span-1':'col-span-2'} border-gray-50 border-8 p-10`}>
                <p className="text-left">{content.applied?.review === ReviewStatus.APPLIED? 'Applied':'Latest'}</p>
                <div>
                    <div >{chapterContent}</div>
                </div>
              </div>

              { reviewedFlag&& (
                <div className="border-gray-50 border-8 p-10">
                  <p className="text-right">History</p>
                  <div>{sectionContent}</div>
                </div>
              )}
            </div>
        </div>
      </div>
  );
};
export default CourseReviewEdit;
