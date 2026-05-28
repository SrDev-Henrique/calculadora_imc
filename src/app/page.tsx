import { ImcCalculator } from "@/components/imc/imc-calculator";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-4 pt-14 sm:pt-4 pb-14">
      <ImcCalculator />
    </main>
  );
}
