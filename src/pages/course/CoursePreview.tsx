import { ReviewAction, ReviewItem, ReviewStatus, ReviewType } from "@/common/types";
import HtmlField from "@/components/HtmlField";
import { get } from "lodash";
import { Fragment, memo } from "react";
import {
  Button,
  EditButton,
  ListButton,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useDataProvider,
  useRecordContext,
} from "react-admin";
import { RenderRequestToolbar} from "../utils/Review";

const RenderActions = () => {
  return (
    <div className="flex justify-between">
      <ListButton />
      <div>
        <EditButton />
      </div>
    </div>
  );
};

const Preview = memo(() => {
  const record = useRecordContext();
  const title = get(record, "title");
  const htmlBrBase64 = get(record, "htmlBrBase64");
  return (
    <Fragment>
      <h1 className="text-center">{title}</h1>
      <HtmlField base64={htmlBrBase64} />
    </Fragment>
  );
});
const CoursePreview = () => {
  const record = useRecordContext();
  return (
    <Show
      queryOptions={{ meta: { type: "preview" } }}
      actions={<RenderActions />}
    >
      <Preview />
      {/* <SimpleShowLayout  >
                <TextField source="title" label=""/>
                <HtmlField source="htmlBrBase64" label=""/>
            </SimpleShowLayout> */}
      <SimpleForm toolbar={<RenderRequestToolbar type={ReviewType.METHODOLOGY}  />}>
        <TextInput source="message" />
      </SimpleForm>
    </Show>
  );
};
export default CoursePreview;
