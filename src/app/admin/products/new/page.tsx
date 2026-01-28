"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PRODUCT_TYPES } from "@/utils/product";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import axios from "axios";

import { productSchema, ProductFormData } from "@/schema/product.schema";
import { toast } from "sonner";

export default function NewProduct() {
  const [preview, setPreview] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      color: "",
      link: "",
      category: "women",
      type: undefined,
      sizes: [],
      image: undefined,
    },
  });

  const submitHandler: SubmitHandler<ProductFormData> = async (data) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("title", data.title);
      formData.append("color", data.color);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("link", data.link);

      // Sizes (array)
      data.sizes.forEach((size) => {
        formData.append("sizes", size);
      });

      // Image (File)
      if (data.image) {
        formData.append("image", data.image);
      }

      const result = await axios.post("/api/admin/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result?.data?.success) {
        toast.success("Product created successfully");
        // Reset form
        setPreview(null);
        setSizes([]);
        setCurrentSize("");
        reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  /* -------------------- Sizes Logic -------------------- */

  const addSize = async () => {
    if (!currentSize.trim()) return;

    const newSizes = [...sizes, currentSize.trim()];
    setSizes(newSizes);
    setValue("sizes", newSizes);
    await trigger("sizes");

    setCurrentSize("");
  };

  const removeSize = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
    setValue("sizes", newSizes);
  };

  /* -------------------- UI -------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 text-slate-600"
    >
      <div className="rounded-2xl border bg-card shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-slate-700">
          Create New Product
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* Title & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Title</Label>
              <Input {...register("title")} placeholder="Enter product title" />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Input {...register("color")} placeholder="Enter product color" />
              {errors.color && (
                <p className="text-xs text-destructive">
                  {errors.color.message}
                </p>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <Label>Sizes</Label>

            <div className="flex gap-2">
              <Input
                value={currentSize}
                onChange={(e) => setCurrentSize(e.target.value)}
                placeholder="Enter size (e.g. 42, XL)"
              />
              <Button type="button" variant="outline" onClick={addSize}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg min-h-12.5">
              <AnimatePresence>
                {sizes.map((size, index) => (
                  <motion.div
                    key={size}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Badge className="pl-3 pr-1 py-1 gap-2 border">
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="hover:bg-destructive hover:text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>

              {sizes.length === 0 && (
                <p className="text-xs text-muted-foreground m-auto">
                  No sizes added
                </p>
              )}
            </div>
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label>Link</Label>
            <Input {...register("link")} placeholder="https://..." />
            {errors.link && (
              <p className="text-xs text-destructive">{errors.link.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setValue("image", file);
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  className="w-12 h-12 rounded object-cover border"
                  alt="preview"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full uppercase tracking-wider font-bold"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
