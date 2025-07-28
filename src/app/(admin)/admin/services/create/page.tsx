"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getCategories } from "@/lib/categories/data";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import CategoryForm from "../../categories/components/CategoryForm"; // reuse
import { PlusIcon } from "lucide-react";

export default function CreateServicePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data.map((cat) => cat.name));
    }
    loadCategories();
  }, []);

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Create Service</h1>

      <form className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="name" placeholder="Service title" required />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            placeholder="Brief description (max 200 chars)"
            maxLength={200}
            rows={3}
            className="resize-none"
          />
        </div>

        {/* Selected Badges (Temporary UI) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Selected Categories</label>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                {cat}
                <button
                  type="button"
                  className="ml-1 text-xs"
                  onClick={() =>
                    setSelectedCategories((prev) => prev.filter((c) => c !== cat))
                  }
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Placeholder for Category Combobox */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>
          <div className="border rounded-md p-2 text-sm text-muted-foreground">
            [Searchable Multi-Select Combobox Coming Next]
          </div>
        </div>

        {/* Inline category creation dialog */}
        <div className="flex items-center gap-2 text-sm pt-2">
          <span>Can’t find a category?</span>
          <CategoryForm />
        </div>

        <Button type="submit" className="mt-4">
          Save Service
        </Button>
      </form>
    </div>
  );
}
