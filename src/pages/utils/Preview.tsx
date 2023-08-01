import { EditButton, ListButton } from "react-admin";

export const RenderPreviewActions = () => {
  return (
    <div className="flex justify-between">
      <ListButton />
      <div>
        <EditButton />
      </div>
    </div>
  );
};