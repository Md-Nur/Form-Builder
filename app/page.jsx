"use client";

import { useEffect, useState } from "react";
import FieldList from "./builder/FieldList";
import FieldEditor from "./builder/FieldEditor";
import RenderField from "./builder/RenderField";
import { useForm } from "react-hook-form";

export default function Page() {
  const [fields, setFields] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [fieldId, setFieldId] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("form-fields");
    if (raw) setFields(JSON.parse(raw));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("form-fields", JSON.stringify(fields));
  }, [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted:", data);

    // Save submitted data in localStorage
    localStorage.setItem("form-data", JSON.stringify(data));

    // Optionally, show a success message or reset form
    alert("Data saved to localStorage!");
    reset(); // clear form inputs
  };

  return (
    <main className="m-3 p-3">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE – builder */}
        <div>
          <h1 className="text-2xl mb-3 font-bold">Form Builder</h1>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setEditingField({})}
          >
            + Add Field
          </button>

          <FieldList
            fields={fields}
            setFields={setFields}
            onEdit={(f) => setEditingField(f)}
          />

          {editingField && (
            <FieldEditor
              field={editingField}
              close={() => setEditingField(null)}
              onSave={(field) => {
                if (field.id) {
                  // update existing
                  setFields((prev) =>
                    prev.map((f) => (f.id === field.id ? field : f))
                  );
                } else {
                  // create new
                  field.id = fieldId;
                  setFieldId((prev) => prev + 1);
                  setFields((prev) => [...prev, field]);
                }
                setEditingField(null);
              }}
            />
          )}
        </div>

        {/* RIGHT SIDE – preview */}
        <div>
          <h1 className="text-2xl mb-3 font-bold">Preview</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border p-4 rounded-md"
          >
            {fields.map((field) => (
              <div key={field.id}>
                <label className="font-semibold">{field.label}</label>
                <RenderField
                  field={field}
                  register={register}
                  errors={errors}
                />
                {errors[field.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[field.id].message}
                  </p>
                )}
              </div>
            ))}

            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
