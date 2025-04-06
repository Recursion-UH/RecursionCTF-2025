import Image from "next/image";

interface ArticleCardProps {
  date: string;
  title: string;
  description: string;
}

const ArticleCard = (props: ArticleCardProps) => {
  const { date, title, description } = props;
  return (
    <main className="relative overflow-hidden rounded-lg">
      <section className="h-[400px] lg:h-[603px]">
        <Image
          fill
          src="/image/code.webp"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt={title}
        />
        <header className=" absolute flex h-full w-full flex-col justify-end gap-2 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)] px-[19px] py-8 text-secondary-white">
          <section className="flex gap-2">
            <Image src="/icon/date.svg" width={13} height={13} alt="date" />
            <p className=" text-text-m">{date}</p>
          </section>
          <h1 className=" text-heading-s font-bold">{title}</h1>
          <p className=" line-clamp-1 text-text-l">{description}</p>
        </header>
      </section>
    </main>
  );
};
export default ArticleCard;
