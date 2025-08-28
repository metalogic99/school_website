import { Form, Content } from "@/components/contact";

const page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  return (
    <section>
      <div className="bg-white md:bg-transparent md:py-20">
        <div className="grid gap-y-6 pb-28 pt-10 2xl:container md:mx-auto md:grid-cols-2 lg:w-full">
          <Content lang={lang} />
          <Form lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default page;
