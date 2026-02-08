"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewCampaignAnalyticPage() {
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
      campaign_id: formData.get("campaign_id"),
      total_sent: formData.get("total_sent") ? Number(formData.get("total_sent")) : null,
      delivered: formData.get("delivered") ? Number(formData.get("delivered")) : null,
      opened: formData.get("opened") ? Number(formData.get("opened")) : null,
      clicked: formData.get("clicked") ? Number(formData.get("clicked")) : null,
      bounced: formData.get("bounced") ? Number(formData.get("bounced")) : null,
      unsubscribed: formData.get("unsubscribed") ? Number(formData.get("unsubscribed")) : null,
      complained: formData.get("complained") ? Number(formData.get("complained")) : null,
      link_clicks: formData.get("link_clicks"),
    };

    const { error: insertError } = await supabase.from("campaign_analytics").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/campaign-analytics");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/campaign-analytics" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Campaign Analytics
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Campaign Analytic</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="campaign_id" className="label">Campaign Id</label>
          <input id="campaign_id" name="campaign_id" type="text" className="input" placeholder="Enter campaign id" required />
        </div>
        <div>
          <label htmlFor="total_sent" className="label">Total Sent</label>
          <input id="total_sent" name="total_sent" type="number" className="input" placeholder="Enter total sent" />
        </div>
        <div>
          <label htmlFor="delivered" className="label">Delivered</label>
          <input id="delivered" name="delivered" type="number" className="input" placeholder="Enter delivered" />
        </div>
        <div>
          <label htmlFor="opened" className="label">Opened</label>
          <input id="opened" name="opened" type="number" className="input" placeholder="Enter opened" />
        </div>
        <div>
          <label htmlFor="clicked" className="label">Clicked</label>
          <input id="clicked" name="clicked" type="number" className="input" placeholder="Enter clicked" />
        </div>
        <div>
          <label htmlFor="bounced" className="label">Bounced</label>
          <input id="bounced" name="bounced" type="number" className="input" placeholder="Enter bounced" />
        </div>
        <div>
          <label htmlFor="unsubscribed" className="label">Unsubscribed</label>
          <input id="unsubscribed" name="unsubscribed" type="number" className="input" placeholder="Enter unsubscribed" />
        </div>
        <div>
          <label htmlFor="complained" className="label">Complained</label>
          <input id="complained" name="complained" type="number" className="input" placeholder="Enter complained" />
        </div>
        <div>
          <label htmlFor="link_clicks" className="label">Link Clicks</label>
          <input id="link_clicks" name="link_clicks" type="text" className="input" placeholder="Enter link clicks" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Campaign Analytic"}
          </button>
          <Link href="/dashboard/campaign-analytics" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
