"use client";

// import { deleteTool } from "@/lib/tools/actions"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { use } from "react";
import { Category } from "@/types/showcase";
import Empty from "@/components/shared/empty";
import { deleteCategory } from "@/lib/categories/actions";

export default function CategoryTable({
  data,
}: {
  data: Promise<Category[]>;
}) {
  const categories = use(data)

  if (categories.length <= 0) {
    return (
      <Empty classes="text-black" message="No categories found" />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.name}>
            <TableCell>{category.name}</TableCell>
            <TableCell className="text-right">
              <form onSubmit={async() => await deleteCategory(category.name)}>
                <Button type="submit" variant="destructive">
                  <Trash />
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
