import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {
  AUTHOR_BY_GITHUB_ID_QUERY,
  AUTHOR_BY_GOOGLE_ID_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-clients";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email } = user;
      let image;

      // Default placeholder values
      const defaultImage = "https://avatar.iran.liara.run/public"; // Replace with your placeholder image URL
      const defaultBio = "No bio available";

      // Determine which provider is being used
      if (account?.provider === "github") {
        image = profile?.avatar_url || defaultImage; // Use avatar_url for GitHub
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: profile?.id,
            name,
            username: profile?.login || "unknown", // Default username if not provided
            email,
            image,
            bio: profile?.bio || defaultBio,
          });
        }
      } else if (account?.provider === "google") {
        image = profile?.picture || defaultImage; // Use picture for Google
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: profile?.sub });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: profile?.sub,
            name,
            email,
            image,
            bio: profile?.description || defaultBio,
          });
        }
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userQuery =
          account.provider === "github"
            ? AUTHOR_BY_GITHUB_ID_QUERY
            : AUTHOR_BY_GOOGLE_ID_QUERY;

        const user = await client
          .withConfig({ useCdn: false })
          .fetch(userQuery, {
            id: account.provider === "github" ? profile.id : profile.sub,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
