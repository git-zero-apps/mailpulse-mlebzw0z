// Auto-generated database types from ZERO Builder
// Do not edit manually
export interface Profiles {
  id: string;
  full_name: string;
  email: string;
  role: string;
  sender_name: string | null;
  sender_email: string | null;
  reply_to_email: string | null;
  subscription_plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  sendgrid_api_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilesInsert {
  full_name: string;
  email: string;
  role?: string;
  sender_name: string | null;
  sender_email: string | null;
  reply_to_email: string | null;
  subscription_plan?: string;
  subscription_status?: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  sendgrid_api_key: string | null;
}

export interface Subscribers {
  id?: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  source: string;
  tags?: unknown | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscribersInsert {
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status?: string;
  source?: string;
  tags?: unknown | null;
  subscribed_at?: string;
  unsubscribed_at: string | null;
}

export interface SubscriberLists {
  id?: string;
  user_id: string;
  name: string;
  description: string | null;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriberListsInsert {
  user_id: string;
  name: string;
  description: string | null;
  subscriber_count?: number;
}

export interface ListSubscribers {
  id?: string;
  list_id: string;
  subscriber_id: string;
  added_at: string;
}

export interface ListSubscribersInsert {
  list_id: string;
  subscriber_id: string;
  added_at?: string;
}

export interface Campaigns {
  id?: string;
  user_id: string;
  name: string;
  subject_line: string;
  preview_text: string | null;
  body_html: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_list_id: string | null;
  recipient_segment: Record<string, unknown> | null;
  total_recipients?: number | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignsInsert {
  user_id: string;
  name: string;
  subject_line: string;
  preview_text: string | null;
  body_html: string;
  status?: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_list_id: string | null;
  recipient_segment: Record<string, unknown> | null;
  total_recipients?: number | null;
}

export interface CampaignAnalytics {
  id?: string;
  campaign_id: string;
  total_sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  complained: number;
  link_clicks?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignAnalyticsInsert {
  campaign_id: string;
  total_sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  bounced?: number;
  unsubscribed?: number;
  complained?: number;
  link_clicks?: Record<string, unknown> | null;
}

export interface EmailTemplates {
  id?: string;
  user_id: string | null;
  name: string;
  body_html: string;
  thumbnail_url: string | null;
  category: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplatesInsert {
  user_id: string | null;
  name: string;
  body_html: string;
  thumbnail_url: string | null;
  category: string | null;
  is_public?: boolean;
}

export interface SignupForms {
  id?: string;
  user_id: string;
  name: string;
  list_id: string;
  fields: Record<string, unknown>;
  submit_button_text: string;
  success_message: string;
  redirect_url: string | null;
  embed_code: string | null;
  public_url: string | null;
  submission_count: number;
  created_at: string;
  updated_at: string;
}

export interface SignupFormsInsert {
  user_id: string;
  name: string;
  list_id: string;
  fields?: Record<string, unknown>;
  submit_button_text?: string;
  success_message?: string;
  redirect_url: string | null;
  embed_code: string | null;
  public_url: string | null;
  submission_count?: number;
}

export interface EmailEvents {
  id?: string;
  campaign_id: string | null;
  subscriber_id: string | null;
  event_type: string;
  sendgrid_message_id: string | null;
  email: string;
  url: string | null;
  ip: string | null;
  user_agent: string | null;
  reason: string | null;
  raw_event: Record<string, unknown> | null;
  created_at: string;
}

export interface EmailEventsInsert {
  campaign_id: string | null;
  subscriber_id: string | null;
  event_type: string;
  sendgrid_message_id: string | null;
  email: string;
  url: string | null;
  ip: string | null;
  user_agent: string | null;
  reason: string | null;
  raw_event: Record<string, unknown> | null;
}

export interface TeamMembers {
  id?: string;
  owner_id: string;
  member_id: string;
  role: string;
  invited_at: string;
  accepted_at: string | null;
}

export interface TeamMembersInsert {
  owner_id: string;
  member_id: string;
  role?: string;
  invited_at?: string;
  accepted_at: string | null;
}
