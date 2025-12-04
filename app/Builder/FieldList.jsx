"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FieldList({ fields, setFields, onEdit }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <div className="mt-4">
      {fields.length === 0 && (
        <p className="text-gray-400">No fields added yet.</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((f) => (
            <SortableField key={f.id} field={f} onEdit={onEdit} setFields={setFields} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableField({ field, onEdit, setFields }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 border rounded flex justify-between mt-2 bg-white"
    >
      <div>
        <p className="font-semibold">{field.label}</p>
        <p className="text-sm text-gray-500">{field.type}</p>
      </div>

      <div className="flex gap-2">
        <button className="text-blue-600" onClick={() => onEdit(field)}>
          Edit
        </button>
        <button
          className="text-red-600"
          onClick={() =>
            setFields((prev) => prev.filter((f) => f.id !== field.id))
          }
        >
          Delete
        </button>

        <button {...attributes} {...listeners} className="cursor-move text-gray-700">
          ⇅
        </button>
      </div>
    </div>
  );
}
