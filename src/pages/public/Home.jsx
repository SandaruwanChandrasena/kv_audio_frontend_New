import { THEME } from "../../utils/theme.jsx";
import Button from "../../components/common/Button.jsx";

export default function Home() {
  return (
    <div className={`${THEME.card} p-6`}>
      <h1 className="text-2xl font-semibold">Welcome to KV Audio Rentals</h1>
      <p className="mt-2 text-slate-500">
        Browse rental products and book what you need.
      </p>

      <div className="mt-6 flex gap-2">
        <Button>Browse Products</Button>
        <Button variant="ghost">Learn More</Button>
      </div>
    </div>
  );
}
