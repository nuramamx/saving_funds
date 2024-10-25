import { Edit, FloppyDisk, Xmark, XmarkCircle } from "iconoir-react";
import { useState } from "react";
import useAuthStore from "../../core/stores/auth-store";

type EditInlineActionButtonParams = {
  rowId: number;
  onEditMode: (rowId: number, active: boolean) => void;
  onSaveClick: (rowId: number) => void;
};

export default function EditInlineActionButton({ rowId, onSaveClick, onEditMode }: EditInlineActionButtonParams) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user} = useAuthStore();

  const handleEdit = (id: number) => {
    setEditMode(true);
    if (onEditMode) onEditMode(id, true);
  };

  const handleSave = (rowId: number) => {
    if (onSaveClick) onSaveClick(rowId);
    setEditMode(false);
  };

  const handleCancel = (id: number) => {
    setEditMode(false);
    if (onEditMode) onEditMode(id, false);
  };

  return (
    <>
      {user.role === 'ADMIN' && (
        <>
          {editMode ? (
            <>
            <button onClick={() => handleSave(rowId)}><FloppyDisk /></button>&nbsp;&nbsp;
            <button onClick={() => handleCancel(rowId)}><XmarkCircle /></button>&nbsp;&nbsp;
            </>
          ) : (
            <>
            <button onClick={() => handleEdit(rowId)}><Edit /></button>&nbsp;&nbsp;
            </>
          )}
        </>
      )}
    </>
  )
}

export type { EditInlineActionButton };