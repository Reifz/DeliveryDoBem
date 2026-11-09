export type ApprovalStatus = 'pending' | 'confirmed' | 'demo';

export interface ApprovedValue<T> { status: ApprovalStatus; value: T; }
export interface ActionInfo { frequency: string; day: ApprovedValue<string>; time: ApprovedValue<string>; address: ApprovedValue<string>; }
export interface PixConfig { mode: 'demo' | 'live'; key: ApprovedValue<string>; beneficiary: ApprovedValue<string>; city: ApprovedValue<string>; }
export interface VolunteerFormConfig { mode: 'demo' | 'live'; endpoint?: string; privacyPolicy: ApprovedValue<string>; }
export interface GalleryItem { src: string; alt: string; caption?: string; width: number; height: number; }
export type VideoItem =
  | { kind: 'local'; src: string; title: string; width?: number; height?: number; poster?: string }
  | { kind: 'embed'; url: string; title: string; caption?: string; width?: number; height?: number };
export interface GuideInfo { summary: string; url: ApprovedValue<string>; }
export interface ContactInfo { label: string; value: string; href: string; status: ApprovalStatus; external?: boolean; }
export interface SiteContent {
  action: ActionInfo;
  pix: PixConfig;
  volunteerForm: VolunteerFormConfig;
  gallery: GalleryItem[];
  carousel: GalleryItem[];
  videos: VideoItem[];
  guide: GuideInfo;
  contacts: ContactInfo[];
  heroSlides: GalleryItem[];
}
