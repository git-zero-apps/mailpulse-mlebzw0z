"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditEmailEventPage() {
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
        .from("email_events")
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
      campaign_id: formData.get("campaign_id"),
      subscriber_id: formData.get("subscriber_id"),
      event_type: formData.get("event_type"),
      sendgrid_message_id: formData.get("sendgrid_message_id"),
      email: formData.get("email"),
      url: formData.get("url"),
      ip: formData.get("ip"),
      user_agent: formData.get("user_agent"),
      reason: formData.get("reason"),
      raw_event: formData.get("raw_event"),
    };

    const { error: updateError } = await supabase
      .from("email_events")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/email-events");
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
        <p className="text-sm text-red-700">Email Event not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/email-events" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Email Events
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Email Event</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="campaign_id" className="label">Campaign Id</label>
          <input id="campaign_id" name="campaign_id" type="text" className="input" defaultValue={String(record.campaign_id ?? "")} />
        </div>
        <div>
          <label htmlFor="subscriber_id" className="label">Subscriber Id</label>
          <input id="subscriber_id" name="subscriber_id" type="text" className="input" defaultValue={String(record.subscriber_id ?? "")} />
        </div>
        <div>
          <label htmlFor="event_type" className="label">Event Type</label>
          <input id="event_type" name="event_type" type="text" className="input" defaultValue={String(record.event_type ?? "")} required />
        </div>
        <div>
          <label htmlFor="sendgrid_message_id" className="label">Sendgrid Message Id</label>
          <input id="sendgrid_message_id" name="sendgrid_message_id" type="text" className="input" defaultValue={String(record.sendgrid_message_id ?? "")} />
        </div>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" name="email" type="email" className="input" defaultValue={String(record.email ?? "")} required />
        </div>
        <div>
          <label htmlFor="url" className="label">Url</label>
          <input id="url" name="url" type="url" className="input" defaultValue={String(record.url ?? "")} />
        </div>
        <div>
          <label htmlFor="ip" className="label">Ip</label>
          <input id="ip" name="ip" type="text" className="input" defaultValue={String(record.ip ?? "")} />
        </div>
        <div>
          <label htmlFor="user_agent" className="label">User Agent</label>
          <input id="user_agent" name="user_agent" type="text" className="input" defaultValue={String(record.user_agent ?? "")} />
        </div>
        <div>
          <label htmlFor="reason" className="label">Reason</label>
          <input id="reason" name="reason" type="text" className="input" defaultValue={String(record.reason ?? "")} />
        </div>
        <div>
          <label htmlFor="raw_event" className="label">Raw Event</label>
          <input id="raw_event" name="raw_event" type="text" className="input" defaultValue={String(record.raw_event ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Email Event"}
          </button>
          <Link href="/dashboard/email-events" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
