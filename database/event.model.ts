import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // Auto-generated in pre-save hook
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
  },
  { timestamps: true } // Auto-generates createdAt and updatedAt
);

// Pre-save hook for auto-generating slug and normalizing date/time
eventSchema.pre('save', function (next) {
  // Generate a URL-friendly slug if the title is modified
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove special characters
      .replace(/[\s_-]+/g, '-')     // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
  }

  // Normalize date to ISO format if modified
  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      return next(new Error('Invalid date format provided for Event.'));
    }
    this.date = parsedDate.toISOString();
  }

  // Ensure time format consistency (trim spaces and capitalize for AM/PM consistency)
  if (this.isModified('time')) {
    this.time = this.time.trim().toUpperCase();
  }

  next();
});

// Cache model to prevent OverwriteModelError during Next.js hot-reloads
export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
