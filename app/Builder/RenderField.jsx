"use client";

export default function RenderField({ field, register }) {
  const rules = {};

  if (field.required) rules.required = "This field is required";
  if (field.minLength) rules.minLength = { value: +field.minLength, message: "Too short" };
  if (field.maxLength) rules.maxLength = { value: +field.maxLength, message: "Too long" };

  switch (field.type) {
    case "text":
      return (
        <input
          {...register(field.id, rules)}
          className="border p-2 w-full"
          type="text"
        />
      );

    case "number":
      return (
        <input
          {...register(field.id, rules)}
          className="border p-2 w-full"
          type="number"
        />
      );

    case "date":
      return (
        <input
          {...register(field.id, rules)}
          className="border p-2 w-full"
          type="date"
        />
      );

    default:
      return null;
  }
}
