"use client";

import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Plus, X } from "lucide-react";

type Props = {
  name: string;
  label?: string;
  initial?: string[];
  placeholderPrefix?: string;
  required?: boolean;
  error?: string;
  onChange?: (values: string[]) => void;
};

export default function StringArrayInput({
  name,
  label,
  initial,
  placeholderPrefix = "Item",
  required = true,
  error,
  onChange,
}: Props) {
  const [values, setValues] = useState<string[]>(() =>
    initial && initial.length > 0 ? initial : [""]
  );

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  const handleChange = (index: number, value: string) => {
    setValues((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const addField = () => setValues((prev) => [...prev, ""]);

  const removeField = (index: number) => {
    setValues((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length === 0 ? [""] : updated;
    });
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {values.map((value, index) => (
        <div
          key={`${name}-${index}`}
          className="flex items-center space-x-2 mb-2"
        >
          <Input
            value={value}
            placeholder={`${placeholderPrefix} #${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
            required={required}
          />
          {index === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addField}
            >
              <Plus className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeField(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}

      {error && <small className="text-sm text-red-500">{error}</small>}

      {/* Hidden inputs for form submission */}
      {values.map((value, index) => (
        <input
          key={`hidden-${name}-${index}`}
          type="hidden"
          name={name}
          value={value}
        />
      ))}
    </div>
  );
}
