"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewTeamMemberPage() {
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
      owner_id: formData.get("owner_id"),
      member_id: formData.get("member_id"),
      role: formData.get("role"),
      invited_at: formData.get("invited_at"),
      accepted_at: formData.get("accepted_at"),
    };

    const { error: insertError } = await supabase.from("team_members").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/team-members");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/team-members" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Team Members
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Team Member</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="owner_id" className="label">Owner Id</label>
          <input id="owner_id" name="owner_id" type="text" className="input" placeholder="Enter owner id" required />
        </div>
        <div>
          <label htmlFor="member_id" className="label">Member Id</label>
          <input id="member_id" name="member_id" type="text" className="input" placeholder="Enter member id" required />
        </div>
        <div>
          <label htmlFor="role" className="label">Role</label>
          <input id="role" name="role" type="text" className="input" placeholder="Enter role" />
        </div>
        <div>
          <label htmlFor="invited_at" className="label">Invited At</label>
          <input id="invited_at" name="invited_at" type="datetime-local" className="input" placeholder="Enter invited at" />
        </div>
        <div>
          <label htmlFor="accepted_at" className="label">Accepted At</label>
          <input id="accepted_at" name="accepted_at" type="datetime-local" className="input" placeholder="Enter accepted at" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Team Member"}
          </button>
          <Link href="/dashboard/team-members" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
