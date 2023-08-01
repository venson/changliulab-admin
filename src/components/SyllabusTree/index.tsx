// component to render syllabus
import { ReviewItem, ReviewStatus, ReviewType, Syllabus} from "@/common/types";
import { CourseContext } from "@/pages/review/ReviewEdit";
import { Checkbox, Collapse, FormControlLabel, Icon } from "@mui/material";
import { checkPrime } from "crypto";
import { Fragment, memo, useCallback, useContext, useMemo, useState } from "react";
import { Button, Identifier, Link } from "react-admin";
type TreeType = 'Review'| 'Preview' |'Edit';
interface SyllabusProps {
  syllabus?: Syllabus[];
  onCheck: Function;
  courseId: Identifier;
  targetId: Identifier;
  targetType: ReviewType;
  treeType: TreeType;
}
interface ExpandIconProps {
  enable: boolean;
  expand: boolean;
  onClick: () => void;
}

const ExpandIcon = ({ enable, expand, onClick }: ExpandIconProps) => {
  return enable ? (
    <Icon className="mr-1" onClick={onClick}>
      {expand ? "expand_less" : "expand_more"}
    </Icon>
  ) : (
    <div className="w-10 h-10"></div>
  );
};
const chapterType = (chapter:Syllabus, id:Identifier, type: ReviewType ) => {
  const selected = 'bg-green-100 rounded p-1 overflow-hidden'
  const chapterFont = 'text-base'
  const sectionFont = 'text-sm'
  if(id === chapter.id){
    return  selected + chapterFont
  }else if(ReviewType.SECTION ===type &&
     chapter.children &&
      chapter.children.map((child)=>child.id).includes(id)){
    return selected + sectionFont
  }
  return ''
}

const checkDisable = (node: Syllabus ,treeType: TreeType) =>{
  if(treeType === 'Preview'){
    return node.review === ReviewStatus.APPLIED ||  !node.isModified 

  }else if(treeType ==='Review'){
    // console.log('enum',ReviewStatus.APPLIED,'target', node.review, 'compare', node.review !== ReviewStatus.APPLIED)
    return node.review !== ReviewStatus.APPLIED

  }
  return false;

}
const SyllabusTree = memo(({ syllabus, courseId,targetId, targetType, treeType }: SyllabusProps) => {
  const { reviews, setReviews, expand, setExpand} = useContext(CourseContext);
  const [selectAll ,setSelectAll ] = useState(false)

const handleCheckboxChange = useCallback(
  (event: React.ChangeEvent<HTMLInputElement>, chapterId:Identifier, type: ReviewType) => {
    event.stopPropagation();
    event.preventDefault();
    const newReviews = new Map(reviews);

    if (event.target.checked) {
      newReviews.set(type + chapterId, { id: chapterId, type: type });
    } else {
      newReviews.delete(type + chapterId);
    }
    setReviews(newReviews);
  },
  [reviews, setReviews]
);
    const handleExpand = useCallback(
    (chapterId:Identifier) => {
      setExpand((prevList:Set<Identifier>) =>
        {const newSet = new Set(prevList)
          if (newSet.has(chapterId)){ newSet.delete(chapterId)}
          else {newSet.add(chapterId)}
        return newSet;
        }

      );
    },
    [setExpand]
  );

  const renderToc = (nodes: Syllabus[], type: ReviewType) => {
    if (!syllabus || syllabus.length === 0) {
      return null;
    }
    return nodes.map((chapter: Syllabus, index) => {
      const { id, title, children} = chapter;

      return (
        <div key={chapter.id}>
          <div className="flex text-left items-center">
                  <ExpandIcon
              enable={!!chapter.children?.length}
              expand={expand.has(id)}
              onClick={() => handleExpand(id)}
            />
            <FormControlLabel
              checked={reviews.has(type+chapter.id)}
              control={
                <Checkbox
                size="small"
                disabled={checkDisable(chapter, treeType)}
                  onChange={(event)=>handleCheckboxChange(event, chapter.id, type)}
                />
              }
              label={
                <Link
                className={chapterType(chapter, targetId,targetType)}
                  to={`/review/${courseId}?type=SYLLABUS&optId=${chapter.id}&optType=${type}`}
                >
                  {chapter.title}
                </Link>
              }
            />
            <div></div>
          </div>
          <Collapse in={expand.has(id)}>

            <div className="pl-8">
              {renderToc(chapter.children || [], ReviewType.SECTION)}
            </div>
          </Collapse>
          <div className="pl-8">
          </div>
        </div>
      );
    });
  };
  const handleSelectClick = () =>{
    interface ReviewInfo{
      id: Identifier;
      from: ReviewStatus;
      to?: ReviewStatus;
      type: ReviewType;
      message?: string
    }
    const expandSyllabus = ({ id, review, type, children }: Syllabus): ReviewInfo[] => {
      let res: ReviewInfo[] = [];
      if (review === ReviewStatus.APPLIED) {
        res.push({ id, from: review, type });
      }
      if (children) {
        res = [...res, ...children.flatMap(expandSyllabus)];
      }
      return res;
    };
    const selected = syllabus?.flatMap((node)=>{
      return expandSyllabus(node)
    })
    setReviews(selected?.reduce((map, obj) => map.set(obj.type+obj.id, obj), new Map()))
    console.log(selected)
    // setSelectAll((prev) => !prev)


  }
  const handleClear = () =>{
    setReviews(new Set())


  }

  return (
    <Fragment>
      <Button className="text-xs" 
      onClick={handleSelectClick} 
      label={selectAll? 'Unselect All':'Select All'}/>
      <Button className="text-xs" 
      onClick={handleClear} 
      label='Clear'/>
      {/* <Button className="text-xs" label="Select none"/> */}
      {renderToc(syllabus || [], ReviewType.CHAPTER)}
    </Fragment>
  )
});

export default SyllabusTree;
