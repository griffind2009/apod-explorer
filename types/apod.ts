export type ApodMediaType = 'image' | 'video' | string;

export interface Apod {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: ApodMediaType;
  service_version?: string;
  copyright?: string;
  thumbnail_url?: string;
}
