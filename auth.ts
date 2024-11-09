import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-clients";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email } = user;
      let image;

      // Determine which provider is being used
      if (account?.provider === 'github') {
        // For GitHub
        image = profile?.avatar_url; // Use avatar_url for GitHub
        const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: profile?.id,
            name,
            username: profile?.login,
            email,
            image,
            bio: profile?.bio || "",
          });
        }
      } else if (account?.provider === 'google') {
        // For Google
        image = profile?.picture; // Use picture for Google
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
            bio: profile?.description || "",
          });
        }
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userQuery = account.provider === 'github'
            ? AUTHOR_BY_GITHUB_ID_QUERY
            : AUTHOR_BY_GOOGLE_ID_QUERY;

        const user = await client
            .withConfig({ useCdn: false })
            .fetch(userQuery, { id: account.provider === 'github' ? profile.id : profile.sub });

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