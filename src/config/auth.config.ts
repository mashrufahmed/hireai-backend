import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { UserRole } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';

export const auth = (prisma: PrismaService, configService: ConfigService) =>
  betterAuth({
    appName: configService.getOrThrow('APP_NAME'),
    secret: configService.getOrThrow('BETTER_AUTH_SECRET'),
    baseURL: configService.getOrThrow('BETTER_AUTH_URL'),

    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),

    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: Object.values(UserRole),
          required: false,
          input: false,
        },
      },
    },
    advanced: {
      useSecureCookies: configService.getOrThrow('NODE_ENV') === 'production', // HTTPS only
      cookiePrefix: 'hireai',
    },

    trustedOrigins: [configService.getOrThrow('FRONTEND_URL')],

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
  });

// const prisma = new PrismaClient({
//   adapter: new PrismaPg({
//     connectionString: process.env.DATABASE_URL,
//   }),
// });
// export const auth = betterAuth({
//   appName: process.env.APP_NAME,
//   secret: process.env.BETTER_AUTH_SECRET,
//   baseURL: process.env.BETTER_AUTH_URL,

//   database: prismaAdapter(prisma, {
//     provider: 'postgresql',
//   }),
//   user: {
//     additionalFields: {
//       role: {
//         type: 'string',
//         // type: Object.values(UserRole),
//         required: false,
//         input: true,
//       },
//     },
//   },
//   emailAndPassword: {
//     enabled: true,
//   },

//   advanced: {
//     useSecureCookies: process.env.NODE_ENV === 'production', // HTTPS only
//     cookiePrefix: 'hireai',
//   },

//   trustedOrigins: [process.env.FRONTEND_URL!],

//   session: {
//     expiresIn: 60 * 60 * 24 * 7, // 7 days
//     updateAge: 60 * 60 * 24, // 1 day
//   },
// });
