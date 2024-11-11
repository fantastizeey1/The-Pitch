import { auth } from "@/auth";
import EditForm from "@/components/EditForm";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) redirect("/");

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id: params.id });

  return (
    <section className="pink_container !min-h-[230px]">
      <h2 className="heading">Edit Your Profile</h2>
      <EditForm user={user} />
    </section>
  );
};

export default Page;
