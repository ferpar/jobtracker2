import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const jobApplicationInputSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  companyUrl: z.string(),
  location: z.string(),
  appliedDate: z.date(),
  contactPerson: z.string(),
  contactEmail: z.string(),
  notes: z.string(),
  resumeUrl: z.string(),
  jobDescriptionUrl: z.string(),
});

export const jobApplicationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
      return ctx.db.jobApplication.findMany({
        where: {
          userId: ctx.session.user.id
        },
        include: {
          statuses: true
        }
      })
    }),
  create: protectedProcedure
    .input(jobApplicationInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.jobApplication.create({
        data: {
          ...input, 
          userId: ctx.session.user.id,
          statuses: {
            create: {
              status: 'Applied',
              date: input.appliedDate
            }
          }
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.jobApplication.update({
        where: {
          id: input.id,
        },
        data: {
          deleted: true
        }
      })
    }),
});