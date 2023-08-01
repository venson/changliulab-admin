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
import { RenderPreviewActions } from "../utils/Preview";
import { Avatars } from "@/components/Avatar";



const Preview = memo(() => {
  const record = useRecordContext();
  const title = get(record, "title");
  const htmlBrBase64 = get(record, "htmlBrBase64");
  const members = get(record,'members')
  return (
    <Fragment>
      <h1 className="text-center">{title}</h1>
      <Avatars avatars={members}/>
      <HtmlField base64={htmlBrBase64} />
    </Fragment>
  );
});
const ResearchPreview = () => {
  const record = useRecordContext();
  return (
    <Show
      queryOptions={{ meta: { type: "preview" } }}
      actions={<RenderPreviewActions />}
    >
      <Preview />
      {/* <SimpleShowLayout  >
                <TextField source="title" label=""/>
                <HtmlField source="htmlBrBase64" label=""/>
            </SimpleShowLayout> */}
      <SimpleForm toolbar={<RenderRequestToolbar type={ReviewType.RESEARCH}  />}>
        <TextInput source="message" />
      </SimpleForm>
    </Show>
  );
};
export default ResearchPreview;
