import mongoose, { Schema, Document, Model } from 'mongoose';
import { Event } from './event.model'; // Import to ensure Event is registered and for cross-referencing

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Event', 
      required: true, 
      index: true // Index added for faster relational queries
    },
    email: { 
      type: String, 
      required: true,
      trim: true,
      lowercase: true,
      // Regex to strictly validate email formatting
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    }
  },
  { timestamps: true } // Auto-generates createdAt and updatedAt
);

// Pre-save hook to validate if the referenced Event exists in the database
bookingSchema.pre('save', async function (next) {
  if (this.isModified('eventId')) {
    try {
      const eventExists = await Event.findById(this.eventId);
      if (!eventExists) {
        return next(new Error(`Validation Error: Event with ID ${this.eventId} does not exist.`));
      }
    } catch (error: any) {
      return next(error);
    }
  }
  next();
});

// Cache model to prevent OverwriteModelError during Next.js hot-reloads
export const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
