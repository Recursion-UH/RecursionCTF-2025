import ProkerCard from "../molecules/ProkerCard";

export default function ProkerSection() {
  return (
    <main className="flex h-fit w-screen flex-col gap-8 px-7 py-12 lg:px-16">
      <h1 className="text-heading-l font-bold text-secondary-black">
        Program Kerja
      </h1>
      <main className="flex flex-col gap-8">
        <section className="flex">
          <ProkerCard
            largeSize={true}
            src="/image/placeholder.webp"
            title="CODE (Community Dedication)"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam quia culpa exercitationem necessitatibus quibusdam, quaerat labore? Odio a ex sequi, hic maiores minima modi."
          />
        </section>
        <section className="flex flex-col gap-8 lg:flex-row">
          <ProkerCard
            largeSize={false}
            src="/image/placeholder.webp"
            title="INFINITY (Informatics for Humanity)"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum ipsa beatae officia, optio vitae obcaecati"
          />
          <ProkerCard
            largeSize={false}
            src="/image/placeholder.webp"
            title="BASIC TRAINING XCII"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum ipsa beatae officia, optio vitae obcaecati"
          />
        </section>
      </main>
    </main>
  );
}
