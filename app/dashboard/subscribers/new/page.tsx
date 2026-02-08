"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewSubscriberPage() {
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
      user_id: user?.id,
      email: formData.get("email"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      status: formData.get("status"),
      source: formData.get("source"),
      tags: formData.get("tags"),
      subscribed_at: formData.get("subscribed_at"),
      unsubscribed_at: formData.get("unsubscribed_at"),
    };

    const { error: insertError } = await supabase.from("subscribers").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/subscribers");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/subscribers" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Subscribers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Subscriber</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" name="email" type="email" className="input" placeholder="Enter email" required />
        </div>
        <div>
          <label htmlFor="first_name" className="label">First Name</label>
          <input id="first_name" name="first_name" type="text" className="input" placeholder="Enter first name" />
        </div>
        <div>
          <label htmlFor="last_name" className="label">Last Name</label>
          <input id="last_name" name="last_name" type="text" className="input" placeholder="Enter last name" />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" placeholder="Enter status" />
        </div>
        <div>
          <label htmlFor="source" className="label">Source</label>
          <input id="source" name="source" type="text" className="input" placeholder="Enter source" />
        </div>
        <div>
          <label htmlFor="tags" className="label">Tags</label>
          <input id="tags" name="tags" type="text" className="input" placeholder="Enter tags" />
        </div>
        <div>
          <label htmlFor="subscribed_at" className="label">Subscribed At</label>
          <input id="subscribed_at" name="subscribed_at" type="datetime-local" className="input" placeholder="Enter subscribed at" />
        </div>
        <div>
          <label htmlFor="unsubscribed_at" className="label">Unsubscribed At</label>
          <input id="unsubscribed_at" name="unsubscribed_at" type="datetime-local" className="input" placeholder="Enter unsubscribed at" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Subscriber"}
          </button>
          <Link href="/dashboard/subscribers" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
