import Header from "../../components/Header";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#f1fbf5]">
      <Header />
      <section className="relative overflow-hidden bg-[#063d20] py-16 text-white sm:py-20">
        <div className="section-wrap relative z-10 max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#13d74c]">Ssemuyaba Foundation</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">About Us</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            We empower vulnerable orphans, children and widows through education, healthcare,
            skills development, sustainable livelihoods and compassionate community support.
          </p>
        </div>
      </section>
      <section className="section-wrap py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black">
              Our <span className="text-[#087a35]">Mission</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-black/75 sm:text-base">
              Our mission is to reach vulnerable families with practical support, create
              sustainable opportunities, and restore hope through love, service and faith.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5 sm:p-9">
            <h3 className="text-xl font-black text-[#087a35]">Together We Bring Hope</h3>
            <p className="mt-3 text-sm leading-6 text-black/70">
              From education and healthcare to skills training and sustainable livelihoods,
              we work alongside communities to help people build a stronger future.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
