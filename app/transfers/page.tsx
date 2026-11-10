import Header from "@/components/Header";
import UnitedTransfers from "@/components/UnitedTransfers";
import Link from "next/link";

export const metadata = {
  title: "Manchester United Transfers | United Red",
  description: "Manchester United transfer activity and the latest transfer reports.",
};

export default function TransfersPage() {
  return <><Header/><main className="wrap" style={{paddingTop:"28px",paddingBottom:"48px"}}>
    <div className="back-home"><Link href="/">← BACK TO LATEST NEWS</Link></div>
    <UnitedTransfers/>
  </main></>;
}
