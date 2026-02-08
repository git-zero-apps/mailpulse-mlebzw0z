"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditCampaignPage() {
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
        .from("campaigns")
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
      subject_line: formData.get("subject_line"),
      preview_text: formData.get("preview_text"),
      body_html: formData.get("body_html"),
      status: formData.get("status"),
      scheduled_at: formData.get("scheduled_at"),
      sent_at: formData.get("sent_at"),
      recipient_list_id: formData.get("recipient_list_id"),
      recipient_segment: formData.get("recipient_segment"),
      total_recipients: formData.get("total_recipients") ? Number(formData.get("total_recipients")) : null,
    };

    const { error: updateError } = await supabase
      .from("campaigns")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/campaigns");
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
        <p className="text-sm text-red-700">Campaign not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/campaigns" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Campaigns
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Campaign</h1>
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
          <label htmlFor="subject_line" className="label">Subject Line</label>
          <input id="subject_line" name="subject_line" type="text" className="input" defaultValue={String(record.subject_line ?? "")} required />
        </div>
        <div>
          <label htmlFor="preview_text" className="label">Preview Text</label>
          <input id="preview_text" name="preview_text" type="text" className="input" defaultValue={String(record.preview_text ?? "")} />
        </div>
        <div>
          <label htmlFor="body_html" className="label">Body Html</label>
          <textarea id="body_html" name="body_html" rows={4} className="input" defaultValue={String(record.body_html ?? "")} required />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" defaultValue={String(record.status ?? "")} />
        </div>
        <div>
          <label htmlFor="scheduled_at" className="label">Scheduled At</label>
          <input id="scheduled_at" name="scheduled_at" type="datetime-local" className="input" defaultValue={String(record.scheduled_at ?? "")} />
        </div>
        <div>
          <label htmlFor="sent_at" className="label">Sent At</label>
          <input id="sent_at" name="sent_at" type="datetime-local" className="input" defaultValue={String(record.sent_at ?? "")} />
        </div>
        <div>
          <label htmlFor="recipient_list_id" className="label">Recipient List Id</label>
          <input id="recipient_list_id" name="recipient_list_id" type="text" className="input" defaultValue={String(record.recipient_list_id ?? "")} />
        </div>
        <div>
          <label htmlFor="recipient_segment" className="label">Recipient Segment</label>
          <input id="recipient_segment" name="recipient_segment" type="text" className="input" defaultValue={String(record.recipient_segment ?? "")} />
        </div>
        <div>
          <label htmlFor="total_recipients" className="label">Total Recipients</label>
          <input id="total_recipients" name="total_recipients" type="number" className="input" defaultValue={String(record.total_recipients ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Campaign"}
          </button>
          <Link href="/dashboard/campaigns" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
