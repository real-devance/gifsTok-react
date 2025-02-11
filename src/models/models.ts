// Model representing a GIF item
export type GifItem = {
  id: string; // Unique identifier for the GIF
  content_description: string; // Description of the GIF content
  media_formats: {
    gif: { url: string }; // URL for the standard GIF format
    tinywebm: {url: string};
  };
};
