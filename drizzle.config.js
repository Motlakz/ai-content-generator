/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:iVvhRay0Crl4@ep-dark-flower-a5hc0dti.us-east-2.aws.neon.tech/content_blox?sslmode=require",
  }
};
