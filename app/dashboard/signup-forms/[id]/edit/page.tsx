"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditSignupFormPage() {
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
        .from("signup_forms")
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
      list_id: formData.get("list_id"),
      fields: formData.get("fields"),
      submit_button_text: formData.get("submit_button_text"),
      success_message: formData.get("success_message"),
      redirect_url: formData.get("redirect_url"),
      embed_code: formData.get("embed_code"),
      public_url: formData.get("public_url"),
      submission_count: formData.get("submission_count") ? Number(formData.get("submission_count")) : null,
    };

    const { error: updateError } = await supabase
      .from("signup_forms")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/signup-forms");
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
        <p className="text-sm text-red-700">Signup Form not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/signup-forms" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Signup Forms
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Signup Form</h1>
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
          <label htmlFor="list_id" className="label">List Id</label>
          <input id="list_id" name="list_id" type="text" className="input" defaultValue={String(record.list_id ?? "")} required />
        </div>
        <div>
          <label htmlFor="fields" className="label">Fields</label>
          <input id="fields" name="fields" type="text" className="input" defaultValue={String(record.fields ?? "")} />
        </div>
        <div>
          <label htmlFor="submit_button_text" className="label">Submit Button Text</label>
          <input id="submit_button_text" name="submit_button_text" type="text" className="input" defaultValue={String(record.submit_button_text ?? "")} />
        </div>
        <div>
          <label htmlFor="success_message" className="label">Success Message</label>
          <input id="success_message" name="success_message" type="text" className="input" defaultValue={String(record.success_message ?? "")} />
        </div>
        <div>
          <label htmlFor="redirect_url" className="label">Redirect Url</label>
          <input id="redirect_url" name="redirect_url" type="url" className="input" defaultValue={String(record.redirect_url ?? "")} />
        </div>
        <div>
          <label htmlFor="embed_code" className="label">Embed Code</label>
          <input id="embed_code" name="embed_code" type="text" className="input" defaultValue={String(record.embed_code ?? "")} />
        </div>
        <div>
          <label htmlFor="public_url" className="label">Public Url</label>
          <input id="public_url" name="public_url" type="url" className="input" defaultValue={String(record.public_url ?? "")} />
        </div>
        <div>
          <label htmlFor="submission_count" className="label">Submission Count</label>
          <input id="submission_count" name="submission_count" type="number" className="input" defaultValue={String(record.submission_count ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Signup Form"}
          </button>
          <Link href="/dashboard/signup-forms" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
