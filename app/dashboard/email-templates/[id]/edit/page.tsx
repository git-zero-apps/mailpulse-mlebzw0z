"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditEmailTemplatePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) setError(error.message);
      else setRecord(data);
      setFetching(false);
    }
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates: Record<string, unknown> = {
      name: formData.get("name"),
      body_html: formData.get("body_html"),
      thumbnail_url: formData.get("thumbnail_url"),
      category: formData.get("category"),
      is_public: formData.get("is_public") === "on",
    };

    const { error: updateError } = await supabase
      .from("email_templates")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/email-templates");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Email Template not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/email-templates" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Email Templates
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Email Template</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input id="name" name="name" type="text" className="input" defaultValue={String(record.name ?? "")} required />
        </div>
        <div>
          <label htmlFor="body_html" className="label">Body Html</label>
          <textarea id="body_html" name="body_html" rows={4} className="input" defaultValue={String(record.body_html ?? "")} required />
        </div>
        <div>
          <label htmlFor="thumbnail_url" className="label">Thumbnail Url</label>
          <input id="thumbnail_url" name="thumbnail_url" type="url" className="input" defaultValue={String(record.thumbnail_url ?? "")} />
        </div>
        <div>
          <label htmlFor="category" className="label">Category</label>
          <input id="category" name="category" type="text" className="input" defaultValue={String(record.category ?? "")} />
        </div>
        <div className="flex items-center gap-3">
          <input id="is_public" name="is_public" type="checkbox" defaultChecked={!!record.is_public} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_public" className="text-sm font-medium text-gray-700">Is Public</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Email Template"}
          </button>
          <Link href="/dashboard/email-templates" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
