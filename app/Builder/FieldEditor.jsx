"use client";

import { useState } from "react";

export default function FieldEditor({ field, onSave, close }) {
  const [form, setForm] = useState({
    id: field.id,
    type: field.type || "text",
    label: field.label || "",
    required: field.required || false,
    minLength: field.minLength || "",
    maxLength: field.maxLength || "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-xl w-96">
        <h2 className="text-xl font-bold mb-3">
          {form.id ? "Edit Field" : "Add Field"}
        </h2>

        <div className="space-y-4">
          <div>
            <label>Label</label>
            <input
              className="border p-2 w-full"
              value={form.label}
              onChange={(e) => update("label", e.target.value)}
            />
          </div>

          <div>
            <label>Type</label>
            <select
              className="border p-2 w-full"
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="flex gap-3 items-center h-4">
            <label>Required</label>
            <input
              type="checkbox"
              checked={form.required}
              onChange={(e) => update("required", e.target.checked)}
            />
          </div>

          {/* Validation */}
          {form.type === "text" && (
            <>
              <div>
                <label>Min Length</label>
                <input
                  className="border p-2 w-full"
                  type="number"
                  value={form.minLength}
                  onChange={(e) => update("minLength", e.target.value)}
                />
              </div>

              <div>
                <label>Max Length</label>
                <input
                  className="border p-2 w-full"
                  type="number"
                  value={form.maxLength}
                  onChange={(e) => update("maxLength", e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button className="px-4 py-2 border" onClick={close}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
