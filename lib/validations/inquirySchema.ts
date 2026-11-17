import { z } from "zod";

export const createInquirySchema = z.object({
  academyId: z.string().min(1, "Academy ID is required"),
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  studentAge: z.coerce.number().int().min(4, "Age must be at least 4").max(40, "Age must be under 40"),
  dateOfBirth: z.string().optional(),
  playingRole: z.string().min(2, "Playing role is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  guardianEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional(),
  preferredBatch: z.string().optional(),
  experienceYears: z.string().optional(),
});

export const createCricketerBookingSchema = z.object({
  cricketerId: z.string().optional().default("custom"),
  cricketerName: z.string().min(2, "Cricketer name is required"),
  eventType: z.string().min(2, "Event type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  backupDate: z.string().optional(),
  duration: z.string().default("2-3 Hours"),
  venue: z.string().optional(),
  budgetRange: z.string().optional(),
  organizationName: z.string().optional(),
  contactName: z.string().min(2, "Contact person name is required"),
  contactPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  contactEmail: z.string().email().optional().or(z.literal("")),
  eventDescription: z.string().optional(),
});

export const createExpertBookingSchema = z.object({
  expertId: z.string().min(1, "Expert ID is required"),
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  bookingDate: z.string().min(1, "Booking date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  serviceMode: z.string().default("ground"),
  locationDetails: z.string().optional(),
  notes: z.string().optional(),
  totalFee: z.number().nonnegative().default(0),
});

export const createFoundationApplicationSchema = z.object({
  applicantName: z.string().min(2, "Applicant name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  email: z.string().email().optional().or(z.literal("")),
  district: z.string().min(2, "District is required"),
  clubOrAcademy: z.string().optional(),
  playingRole: z.string().min(2, "Playing role is required"),
  injuryCategory: z.string().min(2, "Injury category is required"),
  dateOfInjury: z.string().min(1, "Date of injury is required"),
  venue: z.string().optional(),
  injuryDescription: z.string().min(10, "Please describe the injury in at least 10 characters"),
  hospitalName: z.string().optional(),
  doctorName: z.string().optional(),
  estimatedCost: z.string().optional(),
  playzoneOrderId: z.string().optional(),
  documentStorageKeys: z.array(z.string()).optional().default([]),
});

export const createPreOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  deliveryAddress: z.string().optional(),
  productInfo: z.string().min(2, "Product information is required"),
  referenceUrl: z.string().optional(),
  attachedImageUrl: z.string().optional(),
});
