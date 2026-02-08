"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewListSubscriberPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const record: Record<string, unknown> = {
      list_id: formData.get("list_id"),
      subscriber_id: formData.get("subscriber_id"),
      added_at: formData.get("added_at"),
    };

    const { error: insertError } = await supabase.from("list_subscribers").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/list-subscribers");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/list-subscribers" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to List Subscribers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add List Subscriber</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="list_id" className="label">List Id</label>
          <input id="list_id" name="list_id" type="text" className="input" placeholder="Enter list id" required />
        </div>
        <div>
          <label htmlFor="subscriber_id" className="label">Subscriber Id</label>
          <input id="subscriber_id" name="subscriber_id" type="text" className="input" placeholder="Enter subscriber id" required />
        </div>
        <div>
          <label htmlFor="added_at" className="label">Added At</label>
          <input id="added_at" name="added_at" type="datetime-local" className="input" placeholder="Enter added at" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create List Subscriber"}
          </button>
          <Link href="/dashboard/list-subscribers" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
