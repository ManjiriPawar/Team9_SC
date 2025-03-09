import VoucherCard from "./voucher-card";
import { Coffee } from "lucide-react"; // Example icon

function App() {
  return (
    <div>
      <VoucherCard
        brand="Starbucks"
        description="Enjoy a refreshing coffee"
        discount="10% off on all beverages"
        coinsRequired={50}
        icon={<Coffee size={24} />}
        userCoins={40}
      />
    </div>
  );
}

export default App;